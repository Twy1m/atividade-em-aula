const Agendamento = require('../models/Agendamento')
const Cliente = require('../models/Cliente')
const Veiculo = require('../models/Veiculo')

const cadastrar = async (req, res) => {
    let valores = req.body
    console.log(valores)

    if (!valores.data || !valores.horario || !valores.servico || !valores.idVeiculo || !valores.idCliente) {
        return res.status(400).json({ message: 'insira todos os campos necessários' })
    }

    try {
        let cliente = await Cliente.findByPk(valores.idCliente)
        if (!cliente) {
            return res.status(404).json({ message: 'cliente não encontrado' })
        }

        let veiculo = await Veiculo.findByPk(valores.idVeiculo)
        if (!veiculo) {
            return res.status(404).json({ message: 'Veiculo não encontrado' })
        }
        console.log(Agendamento.rawAttributes.data)
        await Agendamento.create(valores)
        res.status(201).json({ message: 'Agendamento cadastrado com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'erro ao cadastrar' })
        console.error('erro ao cadastrar', err)
    }
}

const atualizarData = async (req, res)=>{
    const valores = req.body

    let agendamento = await Agendamento.findByPk(req.params.id)
    if(!agendamento){
        return res.status(404).json({message: 'agendamento não encontrado'})
    }

    agendamento.horario = valores.horario

    await agendamento.save()
    return res.status(200).json({message: 'atualização de horario '})

    // if(valores.idCliente){
    //     let cliente = await Cliente.findByPk(valores.idCliente)
    //     if (!cliente) {
    //         return res.status(404).json({ message: 'cliente não encontrado' })
    //     }
    // }else{
    //     return res.status(400).json({ message: 'insira todos os campos necessários' })
    // }

    // if(valores.idVeiculo){
    //     let veiculo = await Veiculo.findByPk(valores.idVeiculo)
    //     if (!veiculo) {
    //         return res.status(404).json({ message: 'Veiculo não encontrado' })
    //     }
    // }else{
    //     return res.status(400).json({ message: 'insira todos os campos necessários' })
    // }

}

const listar = async (req, res)=>{
    try{
        const agendamentos = await Agendamento.findAll({
            order: [['data', 'ASC']],
            include: [{
                model: Cliente,
                as: 'ClienteAgendamento',
                attributes: ['codCliente', 'nome', 'email', 'endereco', 'telefone']
            },
            {
                model: Veiculo,
                as: 'VeiculoAgendamento',
                attributes: ['codVeiculo', 'modelo', 'marca', 'placa']
            }
          ]
        })
        res.status(200).json(agendamentos)
    }catch(err){
        res.status(500).json({ message: 'Erro ao listar' })
        console.error('Erro ao listar', err)
    }
}

module.exports = {cadastrar, listar, atualizarData}