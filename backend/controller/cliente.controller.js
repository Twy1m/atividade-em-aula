const Cliente = require('../models/Cliente')
const CryptoJS = require('crypto-js')
const CHAVE = 'senha'

const cadastrar = async ( req, res) =>{
    let valores = req.body

    if (!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.endereco || !valores.telefone){
        return res.status(400).json({message: 'insira todos os campos necessários'})
    }

    try{
        let senhaCripto = CryptoJS.AES.encrypt(valores.senha, CHAVE).toString()
        let cpfCripto = CryptoJS.AES.encrypt(valores.cpf, CHAVE).toString()

        valores = {
            ...valores,
            senha: senhaCripto,
            cpf: cpfCripto
        }

        await Cliente.create(valores)
        res.status(201).json({ message: 'cliente cadastrado com sucesso'})
    }catch(err){
        res.status(500).json({ message: 'erro ao cadastrar'})
        console.error('erro ao cadastrar', err)
    }
}

const buscarNome = async (req, res) =>{
    const nome = req.params.nome

    try{
        let cliente = await Cliente.findOne({where: {nome: nome}})
        if(!cliente){
            return res.status(404).json({message: 'cliente não encontrado'})
        }
        res.status(200).json(cliente)
    }catch(err){
        res.status(500).json({ message: 'erro ao buscar' })
        console.error('erro ao buscar', err)
    }
}

const atualizar = async (req, res) =>{
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.endereco || !valores.telefone) {
        return res.status(400).json({ message: 'insira todos os campos necessários' })
    }

    try{
        let cliente = await Cliente.findByPk(valores.codCliente)
        if(!cliente){
            return res.status(404).json({ message: 'cliente não encontrado' })
        }
        await cliente.update(valores)

        cliente = await Cliente.findByPk(valores.codCliente)
        res.status(200).json(cliente)
    }catch(err){
        res.status(500).json({ message: 'erro ao atualizar' })
        console.error('erro ao atualizar', err)
    }
}

const apagar = async (req, res) =>{
    const id = req.params.id
    if (!id) {
        return res.status(400).json({ message: 'insira todos os campos necessários' })
    }

    try{
        let cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({ message: 'cliente não encontrado' })
        }
        await cliente.destroy()

        res.status(200).json({ messsage: 'cliente apagado com sucesso'})
    }catch(err){
        res.status(500).json({ message: 'erro ao apagar' })
        console.error('erro ao apagar', err)
    }
}

module.exports = {cadastrar, buscarNome, atualizar, apagar }