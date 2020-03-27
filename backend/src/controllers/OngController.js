const crypto = require('crypto'); //funcionalidade criar id
const connection = require('../database/connection'); //importa connection


module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body; //body

    const id = crypto.randomBytes(4).toString('HEX'); //gera aleatoriamente 4 byte de caracteres convertido em string hexdecimal

    await connection('ongs').insert({ //await = espera a funcão ser realizada para dar o return
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    });

    return response.json({id}); //Retorna para o cliente o ID para ela saber qual é seu ID

    }
}