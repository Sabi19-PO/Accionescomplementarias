"use client";
import Link from "next/link";
import axios from "axios";

export default function BorrarUsuario({ id }) {
    async function borrar(e) {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        console.log("Estás en borrar");

        const url = `http://localhost:3000/u/borrarUsuario/${id}`;

        try {
            const respuesta = await axios.delete(url);
            console.log(respuesta);
            // Redirigir después de eliminar
            window.location.replace("/usuarios/mostrar");
        } catch (error) {
            console.error("Error al borrar el usuario:", error);
        }
    }

    return (
        <Link href="#" onClick={borrar}>Borrar</Link> // Utilizando Link
    );
}
