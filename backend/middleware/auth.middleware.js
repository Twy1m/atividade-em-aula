const CryptoJS = require('crypto-js')
const CHAVE = 'senha'

function authMiddleware( req, res, next){
    let token = req.headers["authorization"]

    if(!token){
        return res.status(401).json({message: 'Acesso negado!'})
    }

    try{
        const bytes = CryptoJS.AES.decrypt(token, CHAVE)
        const dadosDescr = bytes.toString(CryptoJS.enc.Utf8)

        if(!dadosDescr) {
            return res.status(401).json({message: 'Token Invalido!'})
        }

        const payload = JSON.parse(dadosDescr)

        if (Date.now() > payload.expiraEm){
            return res.status(401).json({message: 'sessão expirada'})
        }

        next()

    }catch(err){
        return res.status(401).json({message: 'falha'})
    }
}

module.exports = authMiddleware