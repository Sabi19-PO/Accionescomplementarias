"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function MostrarProductos() {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/p");
                setProductos(response.data);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };

        fetchProductos();

        // Manejo de parámetros de búsqueda en la URL
        const productoBuscado = searchParams.get("producto");
        if (productoBuscado) {
            setBusqueda(productoBuscado);
        }
    }, [searchParams]);

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const eliminarProducto = async (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                await axios.delete(`http://localhost:3000/p/borrarProducto/${id}`);
                setProductos(productos.filter((producto) => producto.id !== id));
                alert("Producto eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                alert("Hubo un error al eliminar el producto");
            }
        }
    };

    const handleEditar = (id) => {
        router.push(`/productos/editar/${id}`);
    };

    // Filtrar productos según el término de búsqueda
    const productosFiltrados = productos.filter((producto) =>
        producto.producto.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ color: "#16a085" }}>Lista de Productos</h1>

            {/* Campo de búsqueda */}
            <input
                className="form-control mb-4"
                type="text"
                placeholder="Producto"
                value={busqueda}
                onChange={handleBusqueda}
                style={{ borderColor: "#f2f3f4" }}
            />

            <div className="card shadow-lg p-4 rounded-4" style={{ backgroundColor: "#d5f5e3" }}>
                <div className="card-body">
                    <table className="table table-borderless text-center">
                        <thead className="bg-secondary text-white rounded">
                            <tr>
                                <th>Num</th>
                                <th>ID</th>
                                <th>Empresa</th>
                                <th>Producto</th>
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados.map((producto, index) => (
                                <tr key={producto.id}>
                                    <td>{index + 1}</td>
                                    <td>{producto.id}</td>
                                    <td>{producto.empresa}</td>
                                    <td>{producto.producto}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm rounded-3"
                                            style={{ backgroundColor: "#52be80", color: "#fff" }}
                                            onClick={() => eliminarProducto(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm rounded-3"
                                            style={{ backgroundColor: "#52be80", color: "#fff" }}
                                            onClick={() => handleEditar(producto.id)}
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
