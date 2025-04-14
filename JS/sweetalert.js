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
      html: '<p>Igra je klasični brick breaker.</p> <p>Plošček premikaj z levo in desno puščico na tipkovnici</p><p>Cilj igre je zrušiti vse opeke, čas in točke se beležita.</p>',
      confirmButtonText: 'OK'
    });
}

(async () => {

  /* inputOptions can be an object or Promise */
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        'Enostavno': 'Enostavno',
        'Srednje' : 'Srednje',
        'Težko': 'Težko'
      })
    }, 1000)
  })
  
  const { value: color } = await Swal.fire({
    title: 'Izberi težavnost',
    input: 'radio',
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return 'Vnos težavnosti je obvezen!'
      }
    }
  })
  })()