let ctx;
let canvas;

let x = 500;
let y = 500;
let dx = 1;
let dy = 2;
let xIncrease = 0;
let yIncrease = 0;

let rightDown = false;
let leftDown = false;
let isCliked = false;
let gameStarted = false;
let gamePaused = false;
let gameResumed = false;
let brickHit = 0;
let totalBricks = 0;
let destroyedBricks = [];
let countTime = 0;

let bricks = {};
let nrows = 5;
let ncols = 22;
let brickwidth = 45;
let brickheight = 45;
let padding = 10;

let skrinja = new Image();
skrinja.src = "img/treasure_chest.png";
let pause;
let isPaused = false;
let tocke;

// tezavnost
function nastaviTezavnost(tezavnost){
  switch(tezavnost){
      case 'enostavno':
        xIncrease = 0.2;
        yIncrease = 0.2;
      break;
      case 'srednje':
        xIncrease = 0.3;
        yIncrease = 0.3;
      break;
      case 'tezko':
        xIncrease = 0.4;
        yIncrease = 0.4;
      break;
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  await Swal.fire({
    title: 'Dobrodošel v Fantasy Brick Breaker-ju!',
    html: '<p>Igro začneš s presledkom na tipkovnici (spacebar), s ploščkom se premikaj z uporabo leve in desne puščice (arrow keys).</p>',
    confirmButtonText: 'OK'
  });

  // Po potrditvi prvega Swal-a, se odpre naslednji z izbiro težavnosti
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        'enostavno': 'Enostavno',
        'srednje' : 'Srednje',
        'tezko': 'Težko'
      });
    }, 1000);
  });

  const { value: tezavnost } = await Swal.fire({
    title: 'Izberi težavnost',
    input: 'radio',
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return 'Vnos težavnosti je obvezen!';
      }
    }
  });

  if (tezavnost) {
    nastaviTezavnost(tezavnost);
  }

});

function initbricks() {
  bricks = new Array(nrows);
  for (i = 0; i < nrows; i++) {
    bricks[i] = new Array(nrows);
    for (j = 0; j < ncols; j++) {
      bricks[i][j] = 1;
      totalBricks++;
    }
  }
}
function drawIt() {
  function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    pause = document.getElementById("pause");
    init_paddle();
    initbricks();
    tocke = 0;
    $("#tocke").html(tocke);
    return setInterval(draw, 10);
  }
  function init_paddle() {
    paddlex = canvas.width / 2;
    paddleh = 10;
    paddlew = 95;
  }
  function onKeyDown(evt) {
    if (evt.keyCode == 39) rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
  }

  function onKeyUp(evt) {
    if (evt.keyCode == 39) rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
  }

  function onSpaceDown(evt) {
    if (evt.keyCode == 32)
        isCliked = true;
  }

  function onSpaceUp(evt) {
    if (evt.keyCode == 32)
        isCliked = true;
  }

  document.getElementById("pause").addEventListener("click", function(){
    if (!gamePaused) {
        clearInterval(intervalId);
        gamePaused = true;
        gameResumed = false;
    }
});

document.getElementById("resume").addEventListener("click", function(){
    if (!gameResumed) {
        intervalId = setInterval(draw, 10);
        gamePaused = false;
        gameResumed = true;
    }
});

  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);
  $(document).keydown(onSpaceDown);
  $(document).keyup(onSpaceUp);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    if (rightDown && paddlex + paddlew < canvas.width) paddlex += 6;
    else if (leftDown && paddlex > 0) paddlex -= 6;

    ctx.fillRect(paddlex, canvas.height - paddleh, paddlew, paddleh);

    // izris opek
    for (i = 0; i < nrows; i++) {
      for (j = 0; j < ncols; j++) {
        if (bricks[i][j] == 1) {
          ctx.drawImage(
            skrinja,
            j * (brickwidth + padding) + padding,
            i * (brickheight + padding) + padding,
            brickwidth,
            brickheight
          );
        }
      }
    }

    rowheight = brickheight + padding;
    colwidth = brickwidth + padding;
    row = Math.floor(y / rowheight);
    col = Math.floor(x / colwidth);

    //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    if (
      y < nrows * rowheight &&
      row >= 0 &&
      col >= 0 &&
      bricks[row][col] == 1
    ) {
      dy = -dy;
      bricks[row][col] = 0;
      destroyedBricks.push({ row: row, col: col });
      brickHit += 1;
      tocke += 1;
      $("#tocke").html(tocke);

      if(brickHit % 3 == 0){
        dx += xIncrease;
        dy += yIncrease;

        if (destroyedBricks.length > 0 && brickHit < nrows * ncols) {
          let index = Math.floor(Math.random() * destroyedBricks.length);
          let pos = destroyedBricks.splice(index, 1)[0];
          bricks[pos.row][pos.col] = 1;
          totalBricks++;
      }
      }
    }

    if(brickHit >= totalBricks){
        clearInterval(intervalId);
        zmaga();
    }

    if (
      y + dy > canvas.height - paddleh - 7 &&
      x > paddlex &&
      x < paddlex + paddlew
    ) {
      dy = -dy; // Reverse the y direction
      let paddleCenter = paddlex + paddlew / 2;
      let ballRelativeX = x - paddleCenter;
      dx = 6 * (ballRelativeX / (paddlew / 2)); // Adjust the x direction based on hit position
    }

    // premikanje žogice

    if (isCliked) {
      x += dx;
      y += dy;
      countTime++;
    }

    if (x + dx > canvas.width - 5 || x + dx < 0 + 5) dx = -dx;

    if (y + dy > canvas.height || y + dy < 0) dy = -dy;
    else if (y + dy > canvas.height - 5) {
      if (x > paddlex && x < paddlex + paddlew) {
        dy = -dy;
      } else {
        clearInterval(intervalId);
      }
    }

    if(y + dy < 5) {
      dy = -dy;
  } else if(y + dy > canvas.height-5) {
      gameOver();
  }
  
  if(y + dy < 5) {
      dy = -dy;
  } else if(y + dy > canvas.height-5) {
      if(x > paddlex && x < paddlex + paddlew) {
          dy = -dy;
      }
      else {
          gameOver();
      }
  }
  }
  let intervalId = init();
  let seconds = ((countTime * 10) / 1000);
}