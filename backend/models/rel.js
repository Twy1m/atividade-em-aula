const Cliente = require('./Cliente')
const Veiculo = require('./Veiculo')
const Agendamento = require('./Agendamento')

Cliente.hasMany(Veiculo, {
    foreignKey: 'idCliente',
    as: 'VeiculoCliente',
    onDelete: 'CASCADE'
})

Veiculo.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'ClienteVeiculo',
    onDelete: 'CASCADE'
})

Cliente.hasMany(Agendamento, {
    foreignKey: 'idCliente',
    as: 'AgendamentoCliente',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'ClienteAgendamento',
    onDelete: 'CASCADE'
})

Veiculo.hasMany(Agendamento, {
    foreignKey: 'idVeiculo',
    as: 'AgendamentoVeiculo',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Veiculo, {
    foreignKey: 'idVeiculo',
    as: 'VeiculoAgendamento',
    onDelete: 'CASCADE'
})