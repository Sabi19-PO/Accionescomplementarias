"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function MostrarVentas() {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        async function fetchVentas() {
            try {
                const response = await axios.get("http://localhost:3000/v");
                setVentas(response.data);
            } catch (error) {
                console.error("Error al cargar las ventas:", error);
                alert("Error al cargar las ventas.");
            }
        }
        fetchVentas();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#45b39d" }}>Lista de Ventas</h2>
            
            <div className="card shadow-lg p-4 rounded-4 border-0" style={{ backgroundColor: "#abebc6" }}>
                <div className="card-body">
                    <table className="table text-center table-borderless">
                        <thead style={{ backgroundColor: "#9c27b0" }} className="text-white">
                            <tr>
                                <th>Num</th>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Estatus</th>
                                <th>Producto</th>
                                <th>Usuario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((venta, index) => (
                                <tr key={venta.id} className="align-middle">
                                    <td>{index + 1}</td>
                                    <td>{venta.id}</td>
                                    <td>{venta.fecha}</td>
                                    <td>{venta.hora}</td>
                                    <td>{venta.estatus}</td>
                                    <td>{venta.producto}</td> {/* Nombre del producto */}
                                    <td>{venta.usuario}</td> {/* Nombre del usuario */}
                                    <td>
                                        <Link href={`/ventas/editar/${venta.id}`}>
                                            <button
                                                className="btn btn-sm text-white me-2"
                                                style={{
                                                    backgroundColor: "#27ae60",
                                                    border: "none",
                                                }}
                                            >
                                                Editar
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-sm text-white"
                                            style={{
                                                backgroundColor: "#27ae60",
                                                border: "none",
                                            }}
                                            onClick={async () => {
                                                try {
                                                    await axios.put(`http://localhost:3000/v/cancelarVenta/${venta.id}`);
                                                    alert("Venta cancelada con éxito");
                                                    setVentas(ventas.map(v => v.id === venta.id ? { ...v, estatus: "cancelado" } : v));
                                                } catch (error) {
                                                    console.error("Error al cancelar la venta:", error);
                                                    alert("No se pudo cancelar la venta. Intenta nuevamente.");
                                                }
                                            }}
                                        >
                                            Cancelar
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
