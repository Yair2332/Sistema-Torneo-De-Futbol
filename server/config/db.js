import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "torneo_db",
})

db.connect((err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log("Conexion Exitosa Con La Base De Datos");   
    }
})

export default db;