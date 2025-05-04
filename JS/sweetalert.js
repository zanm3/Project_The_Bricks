function showInfo() {
    Swal.fire({
      title: 'O strani',
      html: 'Razvijalec: Žan Markuža<br>Razred: 4. RB<br>Mentor: dr. Boštjan Vouk',
      icon: 'info',
      confirmButtonText: 'OK'
    });
}
function showNavodila() {
    Swal.fire({
      title: 'Navodila',
      html: '<p>Igra je klasični brick breaker.</p> <p>Plošček premikaj z levo in desno puščico na tipkovnici,</p><p>igro pa zaženi s pritiskom presledka (space bar).</p><p>Cilj igre je zrušiti vse opeke, čas in točke se beležita.</p>',
      confirmButtonText: 'OK'
    });
}

function gameOver() {
  let seconds = Math.floor(((countTime * 10) / 1000));

  Swal.fire({
    title: 'Game Over!',
    text: 'Žal si izgubil. Želiš poskusiti znova?',
    showCancelButton: true,
    confirmButtonText: 'Igraj znova',
    cancelButtonText: 'Končaj igro'
  }).then((result) => {
    const confirmButton = document.querySelector('.swal2-confirm'); // "Igraj znova"
    const cancelButton = document.querySelector('.swal2-cancel');  // "Končaj igro"
    
    confirmButton.addEventListener('click', () => {
      location.reload();
    });

    cancelButton.addEventListener('click', () => {
      pregledTockinCasa(tocke, seconds);
    });
  });
}

function pregledTockinCasa(tocke, seconds) {
  Swal.fire({
    title: 'Statistika igre',
    html: `<p>Dosegel si <strong>${tocke}</strong> točk</p><p>Čas igranja: <strong>${seconds}</strong> sekund</p>`,
    icon: 'info',
    confirmButtonText: 'V redu'
  }).then(() => {
    isCliked = false;
    rightDown = false;
    leftDown = false;

    $(document).off('keydown');
    $(document).off('keyup');

    document.getElementById("pause").disabled = true;
    document.getElementById("resume").disabled = true;

    const canvasEl = document.getElementById("canvas");
    canvasEl.style.opacity = 0.4;
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  await Swal.fire({
    title: 'Dobrodošel v Fantasy Brick Breaker-ju!',
    html: '<p>Igro začneš s presledkom na tipkovnici (spacebar), s ploščkom se premikaj z uporabo leve in desne puščice (arrow keys).</p>',
    confirmButtonText: 'OK'
  })
});

function zmaga() {
  Swal.fire({
    title: 'Čestitke!',
    html: `<p>Premagal si Fantasy Brick Breaker!</p><p>Skupno število točk: <strong>${tocke}</strong></p>`,
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: 'Igraj znova',
    cancelButtonText: 'Končaj igro'
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    } else {
      isCliked = false;
      rightDown = false;
      leftDown = false;

      $(document).off('keydown');
      $(document).off('keyup');

      document.getElementById("pause").disabled = true;
      document.getElementById("resume").disabled = true;

      const canvasEl = document.getElementById("canvas");
      canvasEl.style.opacity = 0.4;
    }
  }
)}