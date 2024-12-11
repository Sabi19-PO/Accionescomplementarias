function saludar(){
    console.log("Hola"+nombre);

}

//saludar("Paco");

var saludo=nombre=>{
    console.log("Hola "+nombre);
} 
saludo ("Pancho","Paco");

var saludo2=(nombre1, nombre2)=>{
    console.log("Hola "+nombre1+" y "+nombre2);
} 
saludo ("Pancho","Paco");

var saludo3=(nombre1, nombre2)=>{
    // var s="Hola "+nombre1+" y "+nombre2; esto es una variable y es un error  de sintaxis.
    return "Hola "+nombre1+" y "+nombre2;
} 
console.log(saludo3("Luis","Hugo"));

var saludo4=(nombre1)=>"Hola "+nombre1; 
console.log(saludo4("Bethoveen"));

var saludo5=function(){
console.log("Hola con funcion anonima");

}

saludo ();

var saludo6=()=>{
    console.log("Estas en saludo 6");
}

var saludo7=(nombre="anonimo", s)=>{
    console.log("Hola "+nombre);
    s();
}