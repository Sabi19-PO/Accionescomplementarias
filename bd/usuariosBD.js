const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../clase/usuarioClase");
const { encriptarPassword, validarPassword } = require("../middelwares/funcionesPassword");

function validarDatos(usuario2) {
   var datosCorrectos = false;
   if (usuario2.nombre != undefined && usuario2.usuario != undefined && usuario2.password != undefined) {
      datosCorrectos = true;
   }
   return datosCorrectos;
}

async function mostrarUsuarios() {
   const usuario = await usuariosBD.get();
   var usuariosValidos = [];
   
   usuario.forEach(usuario => {
      const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
      const usuario2 = usuario1.getUsuario;

      if (validarDatos(usuario2)) {
         // Incluir el ID junto con los datos del usuario
         usuariosValidos.push({ id: usuario.id, ...usuario2 });
      }
   });

   //console.log("Usuarios válidos:", usuariosValidos);
   return usuariosValidos; // Retorna los usuarios válidos junto con sus IDs
}

async function buscarPorId(id) {
   const usuario = await usuariosBD.doc(id).get();
   if (!usuario.exists) {
      return null; // Retorna null si el usuario no existe
   }
   const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
   return { id: usuario.id, ...usuario1.getUsuario }; // Retorna el usuario junto con su ID
}

async function nuevoUsuario(data) {
   // Encriptar el password antes de la validación
   const { salt, hash } = encriptarPassword(data.password);
   data.password = hash;
   data.salt = salt;
   data.tipoUsuario = "usuario";
   
   const usuario1 = new Usuario(data);
   
   // Verificar si los datos del usuario son válidos antes de crear el usuario
   if (validarDatos(usuario1.getUsuario)) {
      const id = data.id ? data.id : usuariosBD.doc().id; // Generar ID si no se proporciona
      await usuariosBD.doc(id).set(usuario1.getUsuario); // Guardar con el ID proporcionado o generado
      console.log("Usuario creado exitosamente.");
      
      return { id, ...usuario1.getUsuario }; // Retorna el nuevo usuario con su ID
   } else {
      console.log("Error: Usuario no válido. No se puede crear.");
      return false; // No permite crear si el usuario no es válido
   }
}

async function borrarUsuario(id) {
   const usuario = await buscarPorId(id);  // Obtener usuario sin validarlo
   var borrado = false;

   // Se borra el usuario, independientemente de si es válido o no
   if (usuario) {
      await usuariosBD.doc(id).delete();
      console.log(`Usuario con ID ${id} eliminado.`);
      borrado = true;
   } else {
      console.log("Usuario no encontrado");
   }

   return borrado;
}

async function modificarUsuario(id, nuevosDatos) {
   try {
      // Verificar si el usuario existe en la base de datos
      const usuarioRef = usuariosBD.doc(id);
      const usuarioSnapshot = await usuarioRef.get();
      
      if (!usuarioSnapshot.exists) {
         console.log("Usuario no encontrado.");
         return false;
      }

      // Obtener los datos actuales del usuario
      const usuarioExistente = usuarioSnapshot.data();

      // Actualizar los datos del usuario si se proporcionan nuevos datos
      if (nuevosDatos.nombre) {
         usuarioExistente.nombre = nuevosDatos.nombre;
      }

      if (nuevosDatos.usuario) {
         usuarioExistente.usuario = nuevosDatos.usuario;
      }

      if (nuevosDatos.password) {
         // Encriptar la nueva contraseña
         const { salt, hash } = encriptarPassword(nuevosDatos.password);
         usuarioExistente.password = hash;
         usuarioExistente.salt = salt;
      }

      // Validar los datos actualizados
      if (validarDatos(usuarioExistente)) {
         // Actualizar en la base de datos usando `update` en lugar de `set`
         await usuarioRef.update(usuarioExistente);
         console.log(`Usuario con ID ${id} modificado exitosamente.`);
         return true;
      } else {
         console.log("Error: Datos del usuario no válidos.");
         return false;
      }
   } catch (error) {
      console.error("Error al modificar el usuario:", error);
      return false;
   }
}
async function modificarUsuario(id, nuevosDatos) {
   try {
      // Referencia al documento del usuario en Firebase
      const usuarioRef = usuariosBD.doc(id);
      const usuarioSnapshot = await usuarioRef.get();
      
      // Verifica si el usuario existe
      if (!usuarioSnapshot.exists) {
         console.log("Usuario no encontrado.");
         return false;
      }

      // Obtener los datos actuales del usuario
      const usuarioExistente = usuarioSnapshot.data();

      // Actualizar solo los campos que se han proporcionado en `nuevosDatos`
      if (nuevosDatos.nombre !== undefined) {
         usuarioExistente.nombre = nuevosDatos.nombre;
      }
      if (nuevosDatos.usuario !== undefined) {
         usuarioExistente.usuario = nuevosDatos.usuario;
      }
      if (nuevosDatos.password !== undefined) {
         // Encriptar la nueva contraseña
         const { salt, hash } = encriptarPassword(nuevosDatos.password);
         usuarioExistente.password = hash;
         usuarioExistente.salt = salt;
      }
      if (nuevosDatos.tipoUsuario !== undefined) {
         usuarioExistente.tipoUsuario = nuevosDatos.tipoUsuario;
      }

      // Validar los datos actualizados
      if (validarDatos(usuarioExistente)) {
         // Actualizar en Firebase solo los campos proporcionados
         await usuarioRef.update(usuarioExistente);
         console.log(`Usuario con ID ${id} modificado exitosamente.`);
         return true;
      } else {
         console.log("Error: Datos del usuario no válidos.");
         return false;
      }
   } catch (error) {
      console.error("Error al modificar el usuario:", error);
      return false;
   }
}

// Función para buscar usuarios por nombre
async function buscarUsuariosPorNombre(nombre) {
   try {
       console.log("Buscando usuarios con el nombre:", nombre); // Agregar log para ver el parámetro
       const snapshot = await usuariosBD.get();
       if (snapshot.empty) {
           console.log("No se encontraron usuarios en la base de datos.");
           return [];
       }

       const usuarios = snapshot.docs.map(doc => ({
           id: doc.id,
           ...doc.data(),
       }));

       // Filtrar usuarios por nombre
       const searchTerm = nombre.toLowerCase();
       const usuariosFiltrados = usuarios.filter(usuario =>
           usuario.nombre.toLowerCase().includes(searchTerm)
       );

       console.log("Usuarios encontrados:", usuariosFiltrados); // Agregar log para ver los usuarios encontrados
       return usuariosFiltrados;
   } catch (error) {
       console.error("Error al buscar usuarios:", error);
       throw new Error(`Error al buscar usuarios: ${error.message}`);
   }
}


module.exports = {
   mostrarUsuarios,
   nuevoUsuario,
   borrarUsuario,
   buscarPorId,
   modificarUsuario,
   buscarUsuariosPorNombre // Exportar la nueva     función
};


// Ejemplo de uso para probar las funciones
/*
data = {
   nombre: "Pancho Villa",
   usuario: "pancho",
   password: "abc"
}
nuevoUsuario(data);
*/
