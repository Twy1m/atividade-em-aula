const { DataTypes } = require('sequelize')
const conn = require('../db/conn')

const Agendamento = conn.define('agendamento', {
    codAgendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horario: {
        type: DataTypes.TIME,
        allowNull: false
    },
    servico: {
        type: DataTypes.ENUM("revisão", "manutenção", "instalação"),
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    },
    idVeiculo: {
        type: DataTypes.INTEGER,
        references: {
            model: 'veiculos',
            key: 'codVeiculo'
        }
    },

}, {
    timestamps: false,
    tableName: "agendamentos"
})

module.exports = Agendamento