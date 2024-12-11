const productosBD = require("./conexion").productos;
const Producto = require("../clase/productoClase");
const { encriptarPassword, validarPassword } = require("../middelwares/funcionesPassword");

function validarDatos(producto2) {
    var datosCorrectos = false;
    if (producto2.empresa != undefined && producto2.producto != undefined) {
        datosCorrectos = true;
    }
    return datosCorrectos;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    var productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        const producto2 = producto1.getproducto;
        if (validarDatos(producto2)) {
            productosValidos.push(producto2);
        }
    });
    return productosValidos;
}

async function buscarPorId(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    var productoValido = { error: true };
    if (validarDatos(producto1.getproducto)) {
        productoValido = producto1.getproducto;
    }
    return productoValido;
}

async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    var productoValido = false;
    if (validarDatos(producto1.getproducto)) {
        await productosBD.doc().set(producto1.getproducto);
        productoValido = true;
    }
    return productoValido;
}

async function borrarProducto(id) {
    const producto = await buscarPorId(id);
    var borrado = false;
    if (producto.error != true) {
        await productosBD.doc(id).delete();
        borrado = true;
    }
    return borrado;
}

// Nueva función para modificar un producto
async function modificarProducto(id, nuevosDatos) {
    try {
        // Referencia al documento del producto en Firebase
        const productoRef = productosBD.doc(id);
        const productoSnapshot = await productoRef.get();
        
        // Verifica si el producto existe
        if (!productoSnapshot.exists) {
            console.log("Producto no encontrado.");
            return false;
        }

        // Obtener los datos actuales del producto
        const productoExistente = productoSnapshot.data();

        // Actualizar solo los campos que se han proporcionado en `nuevosDatos`
        if (nuevosDatos.empresa !== undefined) {
            productoExistente.empresa = nuevosDatos.empresa;
        }
        if (nuevosDatos.producto !== undefined) {
            productoExistente.producto = nuevosDatos.producto;
        }

        // Validar los datos actualizados
        if (validarDatos(productoExistente)) {
            // Actualizar en Firebase solo los campos proporcionados
            await productoRef.update(productoExistente);
            console.log(`Producto con ID ${id} modificado exitosamente.`);
            return true;
        } else {
            console.log("Error: Datos del producto no válidos.");
            return false;
        }
    } catch (error) {
        console.error("Error al modificar el producto:", error);
        return false;
    }
}
async function buscarPorProducto(producto) {
    try {
        // Obtener todos los productos de la base de datos
        const productosSnapshot = await productosBD.get();
        
        // Filtrar productos por el nombre del producto
        const productosEncontrados = productosSnapshot.docs.filter(doc => {
            const productoData = doc.data();
            return productoData.producto && productoData.producto.toLowerCase().includes(producto.toLowerCase());
        });

        // Mapear los resultados a una estructura de productos válida
        const productosValidos = productosEncontrados.map(doc => {
            const producto1 = new Producto({ id: doc.id, ...doc.data() });
            return producto1.getproducto;
        });

        return productosValidos;
    } catch (error) {
        console.error("Error al buscar productos:", error);
        return [];
    }
}


module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorId,
    modificarProducto,
    buscarPorProducto
};

/* Ejemplo de uso para probar las funciones
data = {
    empresa: "Compañía XYZ",
    producto: "Producto A"
}
nuevoProducto(data);
*/
