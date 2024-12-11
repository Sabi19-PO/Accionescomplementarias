const express = require ("express");
require('dotenv').config();
const app = express ();

var saludo=(req,res,next)=>{ //req y res es un objeto, next es una funcion
    console.log("Hola");
    next();
}

app.use((req, res, next)=>{
    console.log("Middeleware para todas las rutas")
    next();
});


app.get("/",saludo, (req, res)=>{
    res.send("Estas en raiz")
});

app.get("/home",saludo, (req, res)=>{
        res.send("Estas en home")
});

app.get("/trabajo",saludo, (req, res)=>{
    res.send("Estas en trabajo")
});

 

var saludar=(nombre)=>{
    console.log();
}

