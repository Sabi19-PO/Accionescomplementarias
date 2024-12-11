class Venta {
    constructor(data) {
        this.id = data.id;
        this.idUsuario = data.idUsuario;
        this.idProducto = data.idProducto;
        this.fecha = data.fecha;
        this.hora = data.hora;
        this.estatus = data.estatus;
    }

    set id(id) {
        this._id = id;
    }

    set idUsuario(idUsuario) {
        this._idUsuario = idUsuario;
    }

    set idProducto(idProducto) {
        this._idProducto = idProducto;
    }

    set fecha(fecha) {
        this._fecha = fecha;
    }

    set hora(hora) {
        this._hora = hora;
    }

    set estatus(estatus) {
        this._estatus = estatus;
    }

    get getVenta() {
        const conid = {
            id: this._id,
            idUsuario: this._idUsuario,
            idProducto: this._idProducto,
            fecha: this._fecha,
            hora: this._hora,
            estatus: this._estatus
        };

        const sinid = {
            idUsuario: this._idUsuario,
            idProducto: this._idProducto,
            fecha: this._fecha,
            hora: this._hora,
            estatus: this._estatus
        };

        return this._id ? conid : sinid;
    }
}

module.exports = Venta;