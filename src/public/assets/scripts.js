

let Form = document.querySelector('#Form_');
let tabla = document.querySelector('#tabla_datos');

Form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('Enviando...')

  fetch('/tablas/submit', {
    method: 'POST',
    body: new FormData(Form),
  }).then(res => res.json())
    .then(data => {
      if (!data.success) {
        alert(`${data.error}: ${data.message} ` )
      } else {
        window.location.reload();
      }

    })

})

if (tabla !== null) {

  tabla.addEventListener('click', function (e) {

    if (e.target.classList.contains('delet_')) {
      let obj = { selected_id: e.target.dataset.worker }
  
      fetch('/tablas/del', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
  
      })
        .then(res => res.json())
        .then(() => location.reload()
          
          )
    }
  
  })



}

