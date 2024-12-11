var ruta = require("express").Router();
var { mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorId, modificarUsuario, buscarUsuariosPorNombre } = require("../bd/usuariosBD");

ruta.get("/", async (req, res) => {
    try {
        const usuarios = await mostrarUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error("Error al mostrar usuarios:", error);
        res.status(500).json({ error: "Error al mostrar usuarios" });
    }
});

ruta.get("/buscarPorId/:id", async (req, res) => {
    try {
        var usuarioValido = await buscarPorId(req.params.id);
        if (usuarioValido) {
            res.json(usuarioValido);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al buscar usuario por ID:", error);
        res.status(500).json({ error: "Error al buscar usuario por ID" });
    }
});

ruta.delete("/borrarUsuario/:id", async (req, res) => {
    try {
        var borrado = await borrarUsuario(req.params.id);
        if (borrado) {
            res.json({ message: `Usuario con ID ${req.params.id} eliminado.` });
        } else {
            res.status(404).json({ error: "Usuario no encontrado para eliminar" });
        }
    } catch (error) {
        console.error("Error al borrar usuario:", error);
        res.status(500).json({ error: "Error al borrar usuario" });
    }
});

ruta.post("/nuevoUsuario", async (req, res) => {
    try {
        var usuarioValido = await nuevoUsuario(req.body);
        if (usuarioValido) {
            res.json(usuarioValido);
        } else {
            res.status(400).json({ error: "Datos del usuario no válidos" });
        }
    } catch (error) {
        console.error("Error al crear nuevo usuario:", error);
        res.status(500).json({ error: "Error al crear nuevo usuario" });
    }
});

// Nueva ruta para modificar un usuario existente
ruta.put("/modificarUsuario/:id", async (req, res) => {
    try {
        var modificado = await modificarUsuario(req.params.id, req.body);
        if (modificado) {
            res.json({ message: `Usuario con ID ${req.params.id} modificado exitosamente.` });
        } else {
            res.status(404).json({ error: "Usuario no encontrado o datos no válidos" });
        }
    } catch (error) {
        console.error("Error al modificar usuario:", error);
        res.status(500).json({ error: "Error al modificar usuario" });
    }
});

// Ruta para buscar usuarios por nombre
ruta.get("/buscar", async (req, res) => {
    const { nombre } = req.query; // Obtenemos el nombre desde los parámetros de la query

    if (!nombre) {
        return res.status(400).json({ error: "Se requiere un nombre para la búsqueda" });
    }

    try {
        const usuarios = await buscarUsuariosPorNombre(nombre); // Llamamos a la función que busca por nombre
        res.json(usuarios); // Devolvemos los usuarios encontrados
    } catch (error) {
        res.status(500).json({ error: "Error al buscar usuarios" });
    }
});



module.exports = ruta;
