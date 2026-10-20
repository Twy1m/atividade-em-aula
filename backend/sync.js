const { Cliente, Veiculo, Agendamento } = require('./models/rel')
const conn = require('./db/conn')

async function sync() {
    try{
        await conn.sync()
        console.log('iniciando conexão')
    }catch(err){
        console.error('deu erro', err)
    }finally{
        await conn.close()
        console.log('finalizando conexão')
    }
}

sync()