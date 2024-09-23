import express from "express"
import mysql from 'mysql2/promise';
import cors from 'cors'; // cors me permite conectarme con dos servidores


//create the connection to databaseconst 
const app = express()
app.use(cors()); // esto me permite conectarme a los servidores

// con este pool voy a crear mi base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'adso',
});

// Definición de una ruta básica para verificar que el servidor funciona
app.get('/', (req,res) => res.send("Hey esto funciona"))

// agregamos una consulta basica
// Ruta para manejar el inicio de sesión
app.get('/login', async (req, res)=> {
    const datos= req.query 
    try {
        const [results, fields] = await pool.query(
          "SELECT * FROM `usuarios` WHERE `correo` = ? AND `contraseña` = ?",
          [datos.usuario, datos.contraseña]
          
        );
        if(results.length > 0){
          res.status(200).send('inicio de sesion correctos')
        } else{
          res.status(401).send('error al ingresar inicio')
        }
      
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      } catch (err) {
        console.log(err);
      }
      console.log(datos)
    
})

// Ruta adicional para validar la sesión
app.get ('/validar',(req,res)=>{
  res.send('sesion valida')
})

// ruta local Inicia el servidor en el puerto 3000 y muestra un mensaje en la consola
app.listen(3000)
console.log("servidor en el puerto", 3000)

app.use(express.static('public'));
















// //consulta basica
// app.get('/', (req,res) => res.sendFile(__dirname+"/views/login.html"))
// app.get('/register', (req,res) => res.sendFile(__dirname+"/views/register.html"))
// app.get('/login', (req,res) => res.sendFile(__dirname+"/views/login.html"))

// //imprimiendo
// console.log("el servidor esta en el puerto", 3000)

// //configuracion para insertar las imagenes y los estilos
// app.use(express.static('public'));


