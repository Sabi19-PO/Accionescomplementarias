var ruta = require("express").Router();
var { mostrarVentas, nuevaVenta, buscarPorId, cancelarVenta, modificarVenta } = require("../bd/ventasBD");

// Ruta para mostrar todas las ventas
ruta.get("/", async (req, res) => {
    try {
        const ventas = await mostrarVentas();
        res.json(ventas);
    } catch (error) {
        console.error("Error al mostrar ventas:", error);
        res.status(500).json({ error: "Error al mostrar ventas" });
    }
});

// Ruta para buscar una venta por ID
ruta.get("/buscarPorId/:id", async (req, res) => {
    try {
        const venta = await buscarPorId(req.params.id);
        if (venta && !venta.error) {
            res.json(venta);
        } else {
            res.status(404).json({ error: "Venta no encontrada" });
        }
    } catch (error) {
        console.error("Error al buscar venta por ID:", error);
        res.status(500).json({ error: "Error al buscar venta por ID" });
    }
});

// Ruta para crear una nueva venta
ruta.post("/nuevaVenta", async (req, res) => {
    try {
        const ventaId = await nuevaVenta(req.body);
        res.json({ success: true, message: "Venta creada con éxito", id: ventaId });
    } catch (error) {
        console.error("Error al crear nueva venta:", error);
        res.status(500).json({ error: "Error al crear nueva venta" });
    }
});

// Ruta para cancelar una venta
ruta.put("/cancelarVenta/:id", async (req, res) => {
    try {
        const cancelada = await cancelarVenta(req.params.id);
        if (cancelada.success) {
            res.json(cancelada);
        } else {
            res.status(404).json({ error: cancelada.error || "Error al cancelar venta" });
        }
    } catch (error) {
        console.error("Error al cancelar venta:", error);
        res.status(500).json({ error: "Error al cancelar venta" });
    }
});

// Nueva ruta para modificar una venta existente
ruta.put("/modificarVenta/:id", async (req, res) => {
    try {
        const modificada = await modificarVenta(req.params.id, req.body);
        if (modificada.success) {
            res.json(modificada);
        } else {
            res.status(404).json({ error: "Venta no encontrada o datos no válidos" });
        }
    } catch (error) {
        console.error("Error al modificar venta:", error);
        res.status(500).json({ error: "Error al modificar venta" });
    }
});

module.exports = ruta;
