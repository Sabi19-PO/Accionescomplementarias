const admin = require("firebase-admin");
const keys = require("../keys.json");

admin.initializeApp({
    credential: admin.credential.cert(keys),
});

const bd = admin.firestore();
const usuarios = bd.collection("usuarios");
const productos = bd.collection("productos");
const ventas = bd.collection("ventas");

console.log("Conexión a Firebase establecida"); // Verificar que la conexión se realizó correctamente

module.exports = {
    usuarios,
    productos,
    ventas,
};
    