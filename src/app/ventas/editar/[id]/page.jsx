"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditarVenta() {
    const router = useRouter();
    const { id } = useParams();

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [estatus, setEstatus] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [productoBusqueda, setProductoBusqueda] = useState("");
    const [usuarioBusqueda, setUsuarioBusqueda] = useState("");

    // Cargar datos de la venta
    useEffect(() => {
        async function fetchVenta() {
            try {
                const response = await axios.get(`http://localhost:3000/v/buscarPorId/${id}`);
                const venta = response.data;

                if (venta) {
                    setFecha(venta.fecha || "");
                    setHora(venta.hora || "");
                    setEstatus(venta.estatus || "");
                    setIdProducto(venta.idProducto || "");
                    setIdUsuario(venta.idUsuario || "");
                    setProductoBusqueda(venta.producto || "Producto no encontrado");
                    setUsuarioBusqueda(venta.usuario || "Usuario no encontrado");
                }
            } catch (error) {
                console.error("Error al cargar la venta:", error);
            }
        }
        fetchVenta();
    }, [id]);

    // Cargar productos y usuarios
    useEffect(() => {
        async function fetchData() {
            try {
                const productosResponse = await axios.get("http://localhost:3000/P");
                setProductos(productosResponse.data);

                const usuariosResponse = await axios.get("http://localhost:3000/u");
                setUsuarios(usuariosResponse.data);
            } catch (error) {
                console.error("Error al cargar productos o usuarios:", error);
            }
        }
        fetchData();
    }, []);

    const handleEditarVenta = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/v/modificarVenta/${id}`, {
                fecha,
                hora,
                estatus,
                idProducto,
                idUsuario,
            });
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error("Error al editar la venta:", error);
            alert("Error al editar la venta. Intenta nuevamente.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#800080" }}>Editar Venta</h2>
            <form onSubmit={handleEditarVenta} className="p-4 rounded-4 shadow-lg col-md-6 mx-auto" style={{ backgroundColor: "#f3e5f5" }}>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Fecha</label>
                    <input
                        type="date"
                        className="form-control rounded-3"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        style={{
                            borderColor: "#9c27b0",
                            opacity: fecha ? 0.7 : 1,
                        }}
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
                        style={{
                            borderColor: "#9c27b0",
                            opacity: hora ? 0.7 : 1,
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Estatus</label>
                    <select
                        className="form-select rounded-3"
                        value={estatus}
                        onChange={(e) => setEstatus(e.target.value)}
                        required
                        style={{
                            borderColor: "#9c27b0",
                            opacity: estatus ? 0.7 : 1,
                        }}
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
                        value={productoBusqueda}
                        onChange={(e) => setProductoBusqueda(e.target.value)}
                        style={{
                            borderColor: "#9c27b0",
                            opacity: productoBusqueda ? 0.7 : 1,
                        }}
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
                                        style={{ cursor: "pointer" }}
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
                        value={usuarioBusqueda}
                        onChange={(e) => setUsuarioBusqueda(e.target.value)}
                        style={{
                            borderColor: "#9c27b0",
                            opacity: usuarioBusqueda ? 0.7 : 1,
                        }}
                    />
                    {usuarioBusqueda && (
                        <ul className="list-group mt-2">
                            {usuarios
                                .filter((usuario) =>
                                    usuario.usuario.toLowerCase().includes(usuarioBusqueda.toLowerCase())
                                )
                                .map((usuario) => (
                                    <li
                                        key={usuario.id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => {
                                            setIdUsuario(usuario.id);
                                            setUsuarioBusqueda(usuario.usuario);
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {usuario.usuario}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100 rounded-3"
                    style={{ backgroundColor: "#9c27b0", borderColor: "#9c27b0" }}
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}
