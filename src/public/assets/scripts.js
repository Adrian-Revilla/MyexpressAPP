let Form = document.querySelector('#Form_');
let tabla = document.querySelector('#tabla_datos');
let MYRegex = new RegExp(/[e\+\-E]/m);

Form.addEventListener('submit', (e) => {
  e.preventDefault();
  //verificar que no haya + caracteres no validos en el type Number
  let edad = document.querySelector("#Edad")
  //si encuentra un patron como el descrito en MYREGEX, lanza una exepcion
  
  try {
    if (MYRegex.test(edad.value)) {
      return InputErr('Ingrese una cantidad válida')
    }  

  } catch (e) {
    console.log(e.message)
  }

  fetch('/tablas/submit', {
    method: 'POST',
    body: new FormData(Form),
  })
    .then(res => res.json())
    .then(HandleRes)
    .catch(HandleErr)
})

if (tabla !== null) {
  
  tabla.addEventListener('click', e => {
    let hasdelet_ = e.target.classList.contains('delet_');
    if (hasdelet_) {

      //se toma el ID correspondiente de la base de datos
      let id = { selected_id: e.target.dataset.worker }

      fetch('/tablas/del', {
        method: 'POST',
        body: JSON.stringify(id),
        headers: {
          'Content-Type': 'application/json'
        }

      })
        .then(res => res.json())
        .then(HandleRes)
        .catch(HandleErr)
    }

  })



}

const HandleRes = data => {

  if (!data.Success) {
    let string = JSON.stringify(data)
    throw new Error(string)

  } else {
    window.location.reload(true);
  }

}

const HandleErr = err => {
  let parse = JSON.parse(err.message);
  return console.error('ERROR!, El servidor ha devuelto una exepción',parse.Error)
}

const InputErr = e => console.error('ERROR!!',e)



