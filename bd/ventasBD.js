const productosBD = require("./conexion").productos;
const usuariosBD = require("./conexion").usuarios;
const ventasBD = require("./conexion").ventas;

// Función para mostrar todas las ventas con detalles de producto y usuario
async function mostrarVentas() {
    const ventasSnapshot = await ventasBD.get();
    const ventas = [];

    for (const doc of ventasSnapshot.docs) {
        const ventaData = doc.data();

        // Ignorar ventas con estatus "cancelado"
        if (ventaData.estatus && ventaData.estatus.toLowerCase() === "cancelado") {
            continue;
        }

        let productoNombre = "Producto no encontrado";
        let usuarioNombre = "Usuario no encontrado";

        try {
            if (ventaData.idProducto) {
                const productoDoc = await productosBD.doc(ventaData.idProducto).get();
                if (productoDoc.exists) {
                    productoNombre = productoDoc.data().producto || "Nombre no disponible";
                }
            }

            if (ventaData.idUsuario) {
                const usuarioDoc = await usuariosBD.doc(ventaData.idUsuario).get();
                if (usuarioDoc.exists) {
                    usuarioNombre = usuarioDoc.data().nombre || "Nombre no disponible";
                }
            }
        } catch (error) {
            console.error("Error al obtener producto o usuario:", error);
        }

        ventas.push({
            id: doc.id,
            fecha: ventaData.fecha,
            hora: ventaData.hora,
            estatus: ventaData.estatus,
            producto: productoNombre,
            usuario: usuarioNombre,
        });
    }

    return ventas;
}


// Función para buscar una venta por ID
async function buscarPorId(id) {
    const ventaDoc = await ventasBD.doc(id).get();
    if (!ventaDoc.exists) {
        return { error: "La venta no existe" };
    }
    const ventaData = ventaDoc.data();

    let productoNombre = "Producto no encontrado";
    let usuarioNombre = "Usuario no encontrado";

    try {
        if (ventaData.idProducto) {
            const productoDoc = await productosBD.doc(ventaData.idProducto).get();
            if (productoDoc.exists) {
                productoNombre = productoDoc.data().producto || "Nombre no disponible";
            }
        }

        if (ventaData.idUsuario) {
            const usuarioDoc = await usuariosBD.doc(ventaData.idUsuario).get();
            if (usuarioDoc.exists) {
                usuarioNombre = usuarioDoc.data().nombre || "Nombre no disponible";
            }
        }
    } catch (error) {
        console.error("Error al obtener producto o usuario:", error);
    }

    return {
        id: ventaDoc.id,
        fecha: ventaData.fecha,
        hora: ventaData.hora,
        estatus: ventaData.estatus,
        idProducto: ventaData.idProducto,
        producto: productoNombre, // Nombre del producto
        idUsuario: ventaData.idUsuario,
        usuario: usuarioNombre,   // Nombre del usuario
    };
    
}

// Función para crear una nueva venta
async function nuevaVenta(data) {
    const fecha = new Date().toISOString();
    const venta = {
        ...data,
        fecha: fecha.split('T')[0], // Formato de fecha: YYYY-MM-DD
        hora: fecha.split('T')[1].split('.')[0], // Formato de hora: HH:MM:SS
        estatus: "vendido" // Estado inicial de la venta
    };
    const nuevaVentaRef = await ventasBD.add(venta);
    return nuevaVentaRef.id;
}

// Función para cancelar una venta (actualiza el estatus a "cancelado")
async function cancelarVenta(id) {
    const venta = await buscarPorId(id);
    if (venta.error) {
        return { error: venta.error };
    }
    await ventasBD.doc(id).update({ estatus: "cancelado" });
    return { success: true, message: "Venta cancelada con éxito" };
}

// Función para modificar una venta existente
async function modificarVenta(id, nuevosDatos) {
    const venta = await buscarPorId(id);
    if (venta.error) {
        return { error: venta.error };
    }

    const actualizacion = {};
    if (nuevosDatos.fecha !== undefined) actualizacion.fecha = nuevosDatos.fecha;
    if (nuevosDatos.hora !== undefined) actualizacion.hora = nuevosDatos.hora;
    if (nuevosDatos.estatus !== undefined) actualizacion.estatus = nuevosDatos.estatus;
    if (nuevosDatos.idProducto !== undefined) actualizacion.idProducto = nuevosDatos.idProducto;
    if (nuevosDatos.idUsuario !== undefined) actualizacion.idUsuario = nuevosDatos.idUsuario;

    await ventasBD.doc(id).update(actualizacion);
    return { success: true, message: "Venta modificada con éxito" };
}

// Exportar las funciones para ser utilizadas en otros módulos
module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarPorId,
    cancelarVenta,
    modificarVenta
};
