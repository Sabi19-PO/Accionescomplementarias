var ruta = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarPorId, modificarProducto,buscarPorProducto } = require("../bd/productosBD");

ruta.get("/", async (req, res) => {
    try {
        const productos = await mostrarProductos();
        res.json(productos);
    } catch (error) {
        console.error("Error al mostrar productos:", error);
        res.status(500).json({ error: "Error al mostrar productos" });
    }
});

ruta.get("/buscarPorId/:id", async (req, res) => {
    try {
        var productoValido = await buscarPorId(req.params.id);
        if (productoValido && !productoValido.error) {
            res.json(productoValido);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al buscar producto por ID:", error);
        res.status(500).json({ error: "Error al buscar producto por ID" });
    }
});

ruta.delete("/borrarProducto/:id", async (req, res) => {
    try {
        var borrado = await borrarProducto(req.params.id);
        if (borrado) {
            res.json({ message: `Producto con ID ${req.params.id} eliminado.` });
        } else {
            res.status(404).json({ error: "Producto no encontrado para eliminar" });
        }
    } catch (error) {
        console.error("Error al borrar producto:", error);
        res.status(500).json({ error: "Error al borrar producto" });
    }
});

ruta.post("/nuevoProducto", async (req, res) => {
    try {
        var productoValido = await nuevoProducto(req.body);
        if (productoValido) {
            res.json({ message: "Producto creado exitosamente." });
        } else {
            res.status(400).json({ error: "Datos del producto no válidos" });
        }
    } catch (error) {
        console.error("Error al crear nuevo producto:", error);
        res.status(500).json({ error: "Error al crear nuevo producto" });
    }
});

// Nueva ruta para modificar un producto existente
ruta.put("/modificarProducto/:id", async (req, res) => {
    try {
        var modificado = await modificarProducto(req.params.id, req.body);
        if (modificado) {
            res.json({ message: `Producto con ID ${req.params.id} modificado exitosamente.` });
        } else {
            res.status(404).json({ error: "Producto no encontrado o datos no válidos" });
        }
    } catch (error) {
        console.error("Error al modificar producto:", error);
        res.status(500).json({ error: "Error al modificar producto" });
    }
});

ruta.get("/buscar", async (req, res) => {
    const { producto } = req.query;
    if (!producto) {
        return res.status(400).send("Falta el nombre del producto para buscar.");
    }

    const productos = await buscarPorProducto(producto);
    res.json(productos);
});


module.exports = ruta;
