const express = require("express");
const router = express.Router();
const { buscarUsuarios } = require("../bd/usuariosBD");
const { buscarProductos } = require("../bd/productosBD");
const { buscarVentas } = require("../bd/ventasBD");

router.get("/api/search", async (req, res) => {
    const query = req.query.q;
    if (!query || query.trim() === "") {
        return res.status(400).json({ error: "Debes proporcionar una consulta de búsqueda." });
    }

    try {
        // Realiza búsquedas en usuarios, productos y ventas
        const [usuarios, productos, ventas] = await Promise.all([
            buscarUsuarios(query),
            buscarProductos(query),
            buscarVentas(query),
        ]);

        // Combina los resultados en un solo array
        const resultados = [
            ...usuarios.map((usuario) => ({
                name: usuario.nombre,
                link: `/usuarios/mostrar/${usuario.id}`,
            })),
            ...productos.map((producto) => ({
                name: producto.nombre,
                link: `/productos/mostrar/${producto.id}`,
            })),
            ...ventas.map((venta) => ({
                name: `Venta: ${venta.descripcion}`,
                link: `/ventas/mostrar/${venta.id}`,
            })),
        ];

        res.json(resultados);
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        res.status(500).json({ error: "Ocurrió un error en la búsqueda." });
    }
});

module.exports = router;
