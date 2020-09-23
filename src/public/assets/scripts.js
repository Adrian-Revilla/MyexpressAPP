

let Form = document.querySelector('#Form_');
let tabla = document.querySelector('#tabla_datos');
let MYRegex = new RegExp(/[e\+\-E]/m);
let edad = document.querySelector("#Edad")



const HandleErr = err => {

  let toast_body = document.querySelector('.toast').lastElementChild;



  if (!err.message.includes("{")) {

    toast_body.textContent = err.message

  } else {

    let parse = JSON.parse(err.message)

    toast_body.textContent = 'El servidor ha respondido con una exepción:  ' + parse.message
  }

  $('.toast').toast('show')

}


// const InputErr = e => {
//   let toast_body = document.querySelector('.toast').lastElementChild;
//   toast_body.textContent =  e
//   $('.toast').toast('show') 

// }

const HandleRes = data => {

  if (!data.Success) {
    let string = JSON.stringify(data)
    throw new Error(string)

  } else {
    window.location.reload(true);
  }

}



Form.addEventListener('submit', async (e) => {

  e.preventDefault();

  try {

    if (MYRegex.test(edad.value)) {
      throw new Error('Ingrese una edad válida')
    }

    const conn = await fetch('/tablas/submit', {
      method: 'POST',
      body: new FormData(Form),
    })
    let converting = await conn.json()
    HandleRes(converting)

  } catch (e) {

    HandleErr(e)
  }


})

// Es decir, si el server renderizo la tabla
if (tabla !== null) {

  tabla.addEventListener('click', async e => {
    
    try {
      let hasdelet_ = e.target.classList.contains('delet_');
      if (hasdelet_) {

        //se toma el ID correspondiente de la base de datos
        let id = { selected_id: e.target.dataset.worker }


        const conn = await fetch('/tablas/del', {
          method: 'POST',
          body: JSON.stringify(id),
          headers: {
            'Content-Type':'application/json'
          }
        })
        let converting = await conn.json()
        HandleRes(converting)

      }

    } catch (e) {
      HandleErr(e)
    }

  })

}
