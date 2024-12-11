"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function MostrarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        async function fetchUsuarios() {
            const response = await axios.get("http://localhost:3000/u");
            setUsuarios(response.data);
        }
        fetchUsuarios();

        // Si hay un parámetro de búsqueda en la URL, lo usamos
        const nombre = searchParams.get("nombre");
        if (nombre) {
            setBusqueda(nombre);
        }
    }, [searchParams]);

    const eliminarUsuario = async (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await axios.delete(`http://localhost:3000/u/borrarUsuario/${id}`);
                setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
                alert("Usuario eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Hubo un error al eliminar el usuario");
            }
        }
    };

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    // Filtrar los usuarios según el texto de búsqueda
    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleEditar = (id) => {
        // Redirigir al formulario de edición del usuario
        router.push(`/usuarios/editar/${id}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ color: "#17a589" }}>Lista de Usuarios</h1>

            {/* Campo de búsqueda */}
            <input
                className="form-control mb-4"
                type="text"
                placeholder="Nombre"
                value={busqueda}
                onChange={handleBusqueda}
            />

            <div className="card shadow-lg p-4 rounded-4" style={{ backgroundColor: "#a3e4d7" }}>
                <div className="card-body">
                    <table className="table table-borderless text-center">
                        <thead className="bg-secondary text-white rounded">
                            <tr>
                                <th>Num</th>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.map((usuario, index) => (
                                <tr key={usuario.id}>
                                    <td>{index + 1}</td>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.usuario}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm rounded-3"
                                            style={{ backgroundColor: "#52be80", color: "#fff" }}
                                            onClick={() => eliminarUsuario(usuario.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm rounded-3"
                                            style={{ backgroundColor: "#52be80", color: "#fff" }}
                                            onClick={() => handleEditar(usuario.id)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
