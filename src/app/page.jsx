import Link from "next/link";

export default function Inicio() {
    return (
        <div className="container mt-5 text-center" style={{ backgroundColor: "#e8f8f5", borderRadius: "10px", padding: "20px" }}>
            <h1 style={{ color: "#52be80", fontWeight: "bold" }}>¡Bienvenido!</h1>
            <p className="lead mt-3" style={{ color: "#6a1b9a" }}>
                Una aplicación intuitiva y fácil de usar para gestionar usuarios, productos y ventas de forma eficiente.
            </p>
            <div className="mt-4">
                <p>Explora las opciones que tenemos para ti:</p>
                <div className="d-flex justify-content-center gap-3">
                    <Link href="/usuarios/mostrar">
                        <button className="btn btn-lg" style={{ backgroundColor: "#a9dfbf", color: "#fff", borderRadius: "8px" }}>Ver Usuarios</button>
                    </Link>
                    <Link href="/productos/mostrar">
                        <button className="btn btn-lg" style={{ backgroundColor: "#a9dfbf", color: "#fff", borderRadius: "8px" }}>Ver Productos</button>
                    </Link>
                    <Link href="/ventas/mostrar">
                        <button className="btn btn-lg" style={{ backgroundColor: "#a9dfbf", color: "#fff", borderRadius: "8px" }}>Ver Ventas</button>
                    </Link>
                </div>
            </div>
            <div className="mt-5">
                <p style={{ color: "#800080" }}>
                    Comienza a gestionar y explorar todos nuestros recursos de forma eficiente y organizada.
                </p>
            </div>
        </div>
    );
}
