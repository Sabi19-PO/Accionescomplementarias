"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
    const [usuarios, setUsuarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [tipoBusqueda, setTipoBusqueda] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    // Determina el tipo de búsqueda basado en la ruta actual
    useEffect(() => {
        if (pathname.includes("/productos/mostrar")) {
            setTipoBusqueda("productos");
        } else if (pathname.includes("/usuarios/mostrar")) {
            setTipoBusqueda("usuarios");
        } else {
            setTipoBusqueda("");
        }
    }, [pathname]);

    // Carga la lista de usuarios o productos dependiendo del tipo de búsqueda
    useEffect(() => {
        async function fetchData() {
            try {
                if (tipoBusqueda === "usuarios") {
                    const response = await axios.get("http://localhost:3000/u");
                    setUsuarios(response.data);
                } else if (tipoBusqueda === "productos") {
                    const response = await axios.get("http://localhost:3000/p");
                    setProductos(response.data);
                }
            } catch (error) {
                console.error(`Error al cargar ${tipoBusqueda}:`, error);
            }
        }
        if (tipoBusqueda) {
            fetchData();
        }
    }, [tipoBusqueda]);

    // Filtra sugerencias según el término ingresado
    const filtrarSugerencias = async (query) => {
        if (tipoBusqueda === "usuarios") {
            setSugerencias(
                usuarios.filter((usuario) =>
                    usuario.nombre.toLowerCase().includes(query.toLowerCase())
                )
            );
        } else if (tipoBusqueda === "productos") {
            try {
                const response = await axios.get(
                    `http://localhost:3000/p/buscar?producto=${query}`
                );
                setSugerencias(response.data);
            } catch (error) {
                console.error("Error al buscar productos:", error);
                setSugerencias([]);
            }
        }
    };

    // Maneja el cambio de texto en el campo de búsqueda
    const handleBusqueda = (e) => {
        const query = e.target.value;
        setBusqueda(query);
        if (query.trim() !== "") {
            filtrarSugerencias(query);
        } else {
            setSugerencias([]);
        }
    };

    // Selecciona una sugerencia y cierra la lista
    const handleSeleccionar = (item) => {
        setBusqueda(tipoBusqueda === "usuarios" ? item.nombre : item.producto);
        setSugerencias([]);
    };

    // Realiza la búsqueda al enviar el formulario
    const handleBuscarSubmit = (e) => {
        e.preventDefault();
        if (tipoBusqueda === "usuarios") {
            router.push(`/usuarios/mostrar?nombre=${busqueda}`);
        } else if (tipoBusqueda === "productos") {
            router.push(`/productos/mostrar?producto=${busqueda}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e9f7ef" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" href="/" style={{ color: "#16a085", fontWeight: "bold" }}>
                    Mi Aplicación
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" href="/" style={{ color: "#16a085" }}>
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: "#16a085" }}>
                                Usuarios
                            </Link>
                            <ul className="dropdown-menu" style={{ backgroundColor: "#7dcea0" }}>
                                <li>
                                    <Link className="dropdown-item" href="/usuarios/mostrar" style={{ color: "#17202a" }}>
                                        Mostrar
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/usuarios/nuevo" style={{ color: "#17202a" }}>
                                        Crear
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: "#16a085" }}>
                                Productos
                            </Link>
                            <ul className="dropdown-menu" style={{ backgroundColor: "#7dcea0" }}>
                                <li>
                                    <Link className="dropdown-item" href="/productos/mostrar" style={{ color: "#17202a" }}>
                                        Mostrar
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/productos/nuevo" style={{ color: "#17202a" }}>
                                        Crear
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: "#16a085" }}>
                                Ventas
                            </Link>
                            <ul className="dropdown-menu" style={{ backgroundColor: "#7dcea0" }}>
                                <li>
                                    <Link className="dropdown-item" href="/ventas/mostrar" style={{ color: "#17202a" }}>
                                        Mostrar
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/ventas/nuevo" style={{ color: "#17202a" }}>
                                        Crear
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {tipoBusqueda && (
                        <form className="d-flex position-relative" role="search" onSubmit={handleBuscarSubmit}>
                            <input
                                className="form-control me-2 rounded-pill"
                                type="search"
                                placeholder={`Buscar ${tipoBusqueda}`}
                                value={busqueda}
                                onChange={handleBusqueda}
                                style={{
                                    borderColor: "#16a085",
                                    backgroundColor: "#f8f3fa",
                                    padding: "10px 15px",
                                }}
                            />
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                                style={{
                                    backgroundColor: "#16a085",
                                    color: "white",
                                    borderColor: "#16a085",
                                }}
                            >
                                Buscar
                            </button>
                            {busqueda && sugerencias.length > 0 && (
                                <ul
                                    className="list-group mt-2 position-absolute"
                                    style={{
                                        top: "100%",
                                        zIndex: 1050,
                                        backgroundColor: "white",
                                        width: "100%",
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                    }}
                                >
                                    {sugerencias.map((item, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item"
                                            onClick={() => handleSeleccionar(item)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {tipoBusqueda === "usuarios" ? item.nombre : item.producto}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
}
