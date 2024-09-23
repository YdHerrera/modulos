// Importación de los hooks de React y estilos necesarios
import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; //Importacion de mis estilos de bootstrap


// Definición del componente principal de la aplicación
function App() {
  const [usuario, setusuario] = useState('')
  const [contraseña, setcontraseña] = useState('')
  const [logueado, setlogueado] = useState(false)


  function cambiarusuario(evento){
    setusuario(evento.target.value)
  }

  function cambiarcontraseña(evento){
    setcontraseña(evento.target.value)
  }

  //Consultas de verificacion de conexion de base de datos
  // Función asíncrona que se ejecuta al hacer clic en el botón "Ingresar"
  
async function ingresar (){
  const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario +'&contraseña=' + contraseña)
  if (peticion.ok){
        alert('usuario conectado')
        setlogueado(true)
      } else{
        alert('usuario no registrado')
      }
}


  return (
    <>
     <h1>Inicio de sesion</h1>
     <input className='form-control' placeholder='Ingrese su usuario' type='text' name='usuario'id='usuario' value={usuario} onChange={cambiarusuario}/>
     <br></br>
     <input className='form-control' placeholder='Ingrese su contraseña' type='password' name='contraseña'id='contraseña' value={contraseña} onChange={cambiarcontraseña}/>
     <br></br>
     <button className='btn btn-outline-primary' onClick={ingresar}>Ingresar</button>
    </>
  )
}

export default App



         //Otra forma de hacer validar la conexion base de datos
//   const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario +'&contrase%C3%B1a=' + contraseña)
//   if (peticion.ok){
//     setlogueado(true)
//     alert('usuario conectado')
//   } else{
//     alert('usuario incorrecto')
//   }
//   console.log('logueado state', logueado);
//   if(logueado){
//     return <principal/>;
//   }
// }
