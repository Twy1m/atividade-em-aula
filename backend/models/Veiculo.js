const { DataTypes } = require('sequelize')
const conn = require('../db/conn')

const Veiculo = conn.define('veiculo', {
    codVeiculo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codigoRastreador: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    }

}, {
    timestamps: false,
    tableName: "veiculos"
})

module.exports = Veiculo