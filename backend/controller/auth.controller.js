const Cliente = require('../models/Cliente')
const CryptoJS = require('crypto-js')
const CHAVE = 'senha'

const login = async ( req, res ) =>{
    const valores = req.body
    console.log(valores)

    if(!valores.email || !valores.senha ) {
        return res.status(400).json({ message: 'todos os campos precisam ser preenchidos'})
    }

    try{
        let cliente = await Cliente.findOne({where: {email: valores.email}})
        if(!cliente){
            return res.status(404).json({message: 'cliente não encontrado'})
        }

        const bytes = CryptoJS.AES.decrypt(cliente.senha, CHAVE)
        const senhaDesc = bytes.toString(CryptoJS.enc.Utf8)

        if(valores.senha !== senhaDesc){
            return res.status(401).json({ message: 'acesso negado'})
        }

        const TEMP =  2 * 60 * 60 * 1000
        const expiraEM = Date.now() + TEMP

        const payload = {
            codCliente: cliente.codCliente,
            expiraEm: expiraEM,
            nome: cliente.nome
        }
        const token = CryptoJS.AES.encrypt(JSON.stringify(payload), CHAVE).toString()

        return res.status(200).json({
            message: 'login realizado com sucesso',
            token: token,
            nome: cliente.nome
        })

    }catch(err){
        res.status(500).json({ message: 'erro ao realizar o login'})
        console.error('erro', err)
    }
}

module.exports = { login }