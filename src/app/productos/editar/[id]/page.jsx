"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "/completo/frontend/src/app/usuarios/nuevo/loading";

export default function EditarProducto({ params }) {
    const router = useRouter();
    const [id, setId] = useState(null);
    const [empresa, setEmpresa] = useState("");
    const [producto, setProducto] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchParams = async () => {
            if (params) {
                const resolvedParams = await params;
                if (resolvedParams?.id) {
                    setId(resolvedParams.id);
                }
            }
        };
        fetchParams();
    }, [params]);

    useEffect(() => {
        if (id) {
            const fetchProducto = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/p/buscarPorId/${id}`);
                    const data = response.data;
                    setEmpresa(data.empresa || "");
                    setProducto(data.producto || "");
                } catch (error) {
                    console.error("Error al cargar el producto:", error);
                }
            };
            fetchProducto();
        }
    }, [id]);

    const handleEditProducto = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:3000/p/modificarProducto/${id}`, { empresa, producto });
            router.push("/productos/mostrar");
        } catch (error) {
            console.error("Error al editar el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#800080" }}>Editar Producto</h2>
            <form onSubmit={handleEditProducto} className="p-4 rounded shadow-lg col-md-6 mx-auto" style={{ backgroundColor: "#f3e5f5" }}>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Empresa</label>
                    <input
                        type="text"
                        className="form-control"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        required
                        style={{ borderColor: "#9c27b0" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#6a1b9a" }}>Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                        required
                        style={{ borderColor: "#9c27b0" }}
                    />
                </div>
                <button type="submit" className="btn w-100" style={{ backgroundColor: "#9c27b0", color: "#fff" }}>Guardar Cambios</button>
            </form>
        </div>
    );
}
