"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NuevaVenta() {
    const router = useRouter();

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [estatus, setEstatus] = useState("vendido"); // Valor predeterminado
    const [idProducto, setIdProducto] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [productoBusqueda, setProductoBusqueda] = useState("");
    const [usuarioBusqueda, setUsuarioBusqueda] = useState("");

    // Cargar productos y usuarios
    useEffect(() => {
        async function fetchData() {
            try {
                const productosResponse = await axios.get("http://localhost:3000/P"); // Ruta de productos
                setProductos(productosResponse.data);

                const usuariosResponse = await axios.get("http://localhost:3000/u"); // Ruta de usuarios
                setUsuarios(usuariosResponse.data);
            } catch (error) {
                console.error("Error al cargar productos o usuarios:", error);
            }
        }
        fetchData();
    }, []);

    const handleCrearVenta = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/v/nuevaVenta", {
                fecha,
                hora,
                estatus,
                idProducto,
                idUsuario,
            });
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error("Error al crear la venta:", error);
            alert("Error al crear la venta. Intenta nuevamente.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#800080" }}>Crear Nueva Venta</h2>
            <form onSubmit={handleCrearVenta} className="p-4 rounded-4 shadow-lg col-md-6 mx-auto" style={{ backgroundColor: "#f3e5f5" }}>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Fecha</label>
                    <input
                        type="date"
                        className="form-control rounded-3"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        style={{ borderColor: "#9c27b0" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Hora</label>
                    <input
                        type="time"
                        className="form-control rounded-3"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                        style={{ borderColor: "#9c27b0" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Estatus</label>
                    <select
                        className="form-select rounded-3"
                        value={estatus}
                        onChange={(e) => setEstatus(e.target.value)}
                        required
                        style={{ borderColor: "#9c27b0" }}
                    >
                        <option value="vendido">Vendido</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Producto</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Buscar producto"
                        value={productoBusqueda}
                        onChange={(e) => setProductoBusqueda(e.target.value)}
                        style={{ borderColor: "#9c27b0" }}
                    />
                    {productoBusqueda && (
                        <ul className="list-group mt-2">
                            {productos
                                .filter((producto) =>
                                    producto.producto.toLowerCase().includes(productoBusqueda.toLowerCase())
                                )
                                .map((producto) => (
                                    <li
                                        key={producto.id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => {
                                            setIdProducto(producto.id);
                                            setProductoBusqueda(`${producto.producto} - ${producto.empresa}`);
                                        }}
                                    >
                                        {producto.producto} - {producto.empresa}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Usuario</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Buscar usuario"
                        value={usuarioBusqueda}
                        onChange={(e) => setUsuarioBusqueda(e.target.value)}
                        style={{ borderColor: "#9c27b9a" }}
                    />
                    {usuarioBusqueda && (
                        <ul className="list-group mt-2">
                            {usuarios
                                .filter((usuario) =>
                                    usuario.nombre.toLowerCase().includes(usuarioBusqueda.toLowerCase())
                                )
                                .map((usuario) => (
                                    <li
                                        key={usuario.id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => {
                                            setIdUsuario(usuario.id);
                                            setUsuarioBusqueda(usuario.nombre);
                                        }}
                                    >
                                        {usuario.nombre}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
                <button type="submit" className="btn w-100 rounded-3" style={{ backgroundColor: "#9c27b0", color: "#fff" }}>Crear Venta</button>
            </form>
        </div>
    );
}
