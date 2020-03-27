//projeto Node.js

const express = require('express'); //esta variavle importa modulo express para a variavel express
const cors = require('cors');

const routes = require('./routes');


const app = express(); //esta variavel amazenará a aplicação

app.use(cors()); // dentro do parameto colocaria algo como origin: http://meuapp.com para determinar quem vai acessar o backend 
app.use(express.json()); //declara que vai utilizar o json para requisições BODY
app.use(routes); 
/**
Rota / Recurso

'/users' ou '/' ou qualquer outra rota que esteja sendo utilizada
*/

/**
* Métodos HTTP:
* GET: Buscar/listar uma informação no back-end
* POST: Criar uma informação no back-end
* PUT: Alterar uma informação no back-end
* DELETE: Deletar uma informação no back-end
*/

/**
* Utilizando o insomnia
*
* OBS: Browser usa o método get sempre que for atualizado
*/


/**
* Tipos de Parametros:
*
* Query: Parametros nomeados enviados na rota após o simbolo de "?"" e servem para filtros, paginação;
* Route Patametros utilizados para identificar recursos
*    app.post('/users/:id', (request, response)
* Request Body: Utilizado para criar ou alterar recursos
*    tem que declarar app.use(express.json()); antes de tudo.
*/

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft, SQL Server
 * NoSQL: MongoDB, CouchDB, etc.
 */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where(); //melhor...
 */

//app.get('/', (request, response) => {
app.listen(3333); //ouvi a porta 3333. abrir localhost:3333 para acessar a aplicação. Não usa a 8080 para não dar conflito com outras aplicações

