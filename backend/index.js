const express = require('express')
const cors = require('cors')
const app = express()

const hostname = 'localhost'
const PORT = 3000

const conn = require('./db/conn')
require('./models/rel')

const veiculoController = require('./controller/veiculo.controller')
const clienteController = require('./controller/cliente.controller')
const agendamentoController = require('./controller/agendamento.controller')
const authController = require('./controller/auth.controller')
const authMiddleware = require('./middleware/auth.middleware')

//MIDDLEWARE

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//ROTAS PUBLICAS

app.get('/', (req, res)=>{
    res.status(200).json({message: 'servidor rodando'})
})

app.post('/login', authController.login)
app.post('/cliente', clienteController.cadastrar)

app.use(authMiddleware)

//ROTAS PRIVADAS

app.get('/cliente/:nome', clienteController.buscarNome)
app.patch('/cliente/:id', clienteController.atualizar)
app.delete('/cliente/:id', clienteController.apagar)

app.post('/veiculo', veiculoController.cadastrar)

app.post('/agendamento', agendamentoController.cadastrar)
app.get('/agendamentos', agendamentoController.listar)
app.patch('/agendamento/:id', agendamentoController.atualizarData)

//SERVIDOR

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`servidor rodando em http://${hostname}:${PORT}` )
    })
})
.catch((err)=>{
    console.error(err)
})