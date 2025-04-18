let ctx;
let canvas;

let x = 500;
let y = 500;
let dx = 1;
let dy = 2;
let rightDown = false;
let leftDown = false;
let isCliked = false;
let gameStarted = false;
let brickHit = 0;

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

function initbricks() {
  //inicializacija opek - polnjenje v tabelož
  bricks = new Array(nrows);
  for (i = 0; i < nrows; i++) {
    bricks[i] = new Array(nrows);
    for (j = 0; j < ncols; j++) {
      bricks[i][j] = 1;
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
    return setInterval(draw, 10); //klic funkcije draw vsakih 10 ms; http://www.w3schools.com/jsref/met_win_setinterval.asp
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
      gameStarted = true;
  }

  function onSpaceUp(evt) {
    if (evt.keyCode == 32) isCliked = true;
  }

  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);
  $(document).keydown(onSpaceDown);
  $(document).keyup(onSpaceUp);

  function draw() {
    // risanje
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

    rowheight = brickheight + padding; //Smo zadeli opeko?
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
      brickHit += 1;
      tocke += 1;
      $("#tocke").html(tocke);

      if(brickHit % 3 == 0){
        dx += 0.4;
        dy += 0.4;
      }
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

    if (isCliked && gameStarted) {
      x += dx;
      y += dy;
    }

    if (x + dx > canvas.width - 6 || x + dx < 0 + 6) dx = -dx;

    if (y + dy > canvas.height || y + dy < 0) dy = -dy;
    else if (y + dy > canvas.height - 6) {
      if (x > paddlex && x < paddlex + paddlew) {
        dy = -dy;
      } else {
        clearInterval(intervalId);
      }
    }
  }
  const intervalId = init();
}