//const { getApp } = require("firebase-admin/app");
class Usuario{
    constructor(data){
        this.id=data.id;
        this.nombre=data.nombre;
        this.usuario=data.usuario;
        this.password=data.password;
        this.salt=data.salt;
        this.tipoUsuario=data.tipoUsuario;
    }

    set id(id){
        this._id=id;
    }
    
    set nombre(nombre){
        //console.log(nombre);
        
        const nombreRegex=/^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if(nombreRegex.test(nombre)){
            this._nombre=nombre;
        }
    }
    set usuario(usuario=""){
        if(usuario.length>0 && usuario.length<=15){
            this._usuario=usuario;
        }
    }
    set password(password){

        //if(passwordRegex.test(password)){    
            this._password=password;
        //}
    }
    set salt(salt){
        this._salt=salt;
    }
    set tipoUsuario(tipoUsuario){
        this._tipoUsuario=tipoUsuario;
    }
    
    get id(){
        return this._id;
    }

    get nombre(){
        return this._nombre.toUpperCase
        return this._nombre;
    }

    get usuario(){
        usuarios: this._usuario;
    }
    get password(){
        password._password;
    }
    
    get salt(){
        return this._salt;
    }

    get tipoUsuario(){
        return this._tipoUsuario;
    }

    get getUsuario(){
        const conid={
            id:this._id,
            nombre:this._nombre,
            usuario:this._usuario,
            password:this._password,
            salt:this._salt,
            tipoUsuario:this._tipoUsuario
        }
        const sinid={
            nombre:this._nombre,
            usuario:this._usuario,
            password:this._password,
            salt:this._salt,
            tipoUsuario:this._tipoUsuario
        }
            
        
        if(this.id=undefined){
            return conid;
        }

        else{
            return sinid;
        }  
    }

}


module.exports=Usuario;

// esto es para probar la clase
/*var data={
    nombre:"Luwking Van Bethoven",
    usuario:"Bethoven",
    password:"Abc1!"
}
var usuario1=new Usuario(data)
console.log(usuario1.getUsiario);*/