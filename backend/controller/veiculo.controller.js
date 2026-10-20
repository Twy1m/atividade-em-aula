const Veiculo = require('../models/Veiculo')
const CryptoJS = require('crypto-js')
const CHAVE = 'senha'

const cadastrar = async (req, res) => {
    let valores = req.body

    if (!valores.modelo || !valores.marca || !valores.placa || !valores.codigoRastreador || !valores.idCliente) {
        return res.status(400).json({ message: 'insira todos os campos necessários' })
    }

    try {
        await Veiculo.create(valores)
        res.status(201).json({ message: 'Veiculo cadastrado com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'erro ao cadastrar' })
        console.error('erro ao cadastrar', err)
    }
}

module.exports = { cadastrar }