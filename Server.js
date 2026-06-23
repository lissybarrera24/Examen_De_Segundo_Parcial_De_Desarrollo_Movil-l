const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"examen_movil"
});

conexion.connect((error)=>{

    if(error){
        console.log(error);
    }else{
        console.log("Base de datos conectada");
    }

});


//==========================
// Listar productos
//==========================

app.get("/productos",(req,res)=>{

    const sql="SELECT * FROM productos";

    conexion.query(sql,(error,resultados)=>{

        if(error){
            res.status(500).json(error);
        }else{
            res.json(resultados);
        }

    });

});


//==========================
// Guardar producto
//==========================

app.post("/productos",(req,res)=>{

    const{
        nombre,
        descripcion,
        precio,
        estado,
        categoria,
        fotografia
    }=req.body;

    const sql=`
    INSERT INTO productos
    (nombre,descripcion,precio,estado,categoria,fotografia)
    VALUES(?,?,?,?,?,?)
    `;

    conexion.query(sql,
    [
        nombre,
        descripcion,
        precio,
        estado,
        categoria,
        fotografia
    ],
    (error)=>{

        if(error){
            res.status(500).json(error);
        }else{

            res.json({
                mensaje:"Producto agregado correctamente"
            });

        }

    });

});


//==========================
// Eliminar producto
//==========================

app.delete("/items/:id",(req,res)=>{

    const id=req.params.id;

    conexion.query(
        "DELETE FROM productos WHERE id=?",
        [id],
        (error)=>{

            if(error){
                res.status(500).json(error);
            }else{

                res.json({
                    mensaje:"Producto eliminado"
                });

            }

        });

});


//==========================
// Obtener producto por ID
//==========================

app.get("/productos/:id",(req,res)=>{

    const id=req.params.id;

    conexion.query(
        "SELECT * FROM productos WHERE id=?",
        [id],
        (error,resultado)=>{

            if(error){
                res.status(500).json(error);
            }else{

                res.json(resultado[0]);

            }

        });

});


//==========================

app.listen(3000,()=>{

    console.log("Servidor ejecutándose en el puerto 3000");

});
