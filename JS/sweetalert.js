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