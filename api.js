//1 require
const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');

const mysql_config=require('./inc/mysql_config')
const functions=require('./inc/functions');

//2 criação de duas constantes para definição da disponibilidade da api
//api e da versão api
const API_AVAILABILITY=true;
const API_VERSION='1.0.0';

//3 iniciar o server
const app = express();
app.listen(3000, ()=>{
    console.log("API está executando")
})

//4 checar se API está disponível
app.use((req, res, next)=>{
    if (API_AVAILABILITY){
        next();
    } else {
        res.json(functions.response('atenção', 'API está em manutenção. Sinto muito',0,null))
    }
})

//5 mysql connection
const connection = mysql.createConnection(mysql_config);

//6 cors
app.use(cors());

//7 rotas
//rota inical que vai dizer que a API está disponínel
app.get('/',(req,res)=>{
    res.json(functions.response('sucesso','API está rodando',0,null))
})

//9 rota para pegar todas as tarefas
app.get('/tasks',(req,res)=>{
    connection.query('SELECT * FROM tasks', (err,rows))
    
})

//8 midleware para caso alguma rota não seja encontrada
app.use ((req,res)=>{
    res.json(functions.response('atenção','Rota não encontrada',0,null))
})

