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
    confirmButtonText: 'OK'
  }).then((result) => {
    if(result.isConfirmed){
      pregledTockinCasa(tocke, seconds);
    }
  });
}
function pregledTockinCasa(tocke, seconds){
    Swal.fire({
      title: 'Stevilo Tock',
      html: `<p>Dosegel si ${tocke} tock</p><p>Tvoj čas je ${seconds}s</p>`,
      confirmButtonText: 'OK'
    }).then((result) =>{
      if(result.isConfirmed){
        document.location.reload();
      }
    });
}
document.addEventListener('DOMContentLoaded', async function () {
  await Swal.fire({
    title: 'Dobrodošel v Fantasy Brick Breaker-ju!',
    html: '<p>Igro začneš s presledkom na tipkovnici (spacebar), s ploščkom se premikaj z uporabo leve in desne puščice (arrow keys).</p>',
    confirmButtonText: 'OK'
  })
});