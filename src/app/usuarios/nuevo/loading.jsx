export default function Cargando() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f3e5f5" }}>
            <div className="text-center">
                <h1 style={{ color: "#800080", fontWeight: "bold" }}>Cargando...</h1>
                <div className="spinner-border mt-3" style={{ width: "3rem", height: "3rem", color: "#9c27b0" }} role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        </div>
    );
}
