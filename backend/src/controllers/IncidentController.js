const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('incidents').count(); //conta quantos incidentes tem no total
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', "=", 'incidents.ong_id')// compara os id das ong com do incidente e traz as informações da ong que registrou aquele incidentes
        .limit(5)
        .offset((page - 1) * 5) //limita a visualização dos incidentes 5 por página
        .select([
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf']);//seleciona todos os dados do incidente e mostra os dados selecionados da ong

        response.header('X-total-Count', count['count(*)']) //retorna no header o valor total de incidentes


        return response.json(incidents);
    },
    async create(request, response) {
        const { title, description, value } = request.body; //id não veio, pois o ID está incremental (1, 2, 3... etc)
        const ong_id = request.headers.authorization;       //request.headers; // cabeçalho da requisição (INSOMNIA) guarda informações do contexto da requisição (dados de localização, idioma, id, contexto, autenticação)
        
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        
        return response.json({ id });
    },
    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization; //busca id da ong logada no insomnia
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); //retorna apenas um resultado
        
        if(incident.ong_id != ong_id){ //se o ong_id do incidente do BD for diferente do que esta logado 
            return response.status(401).json({error: 'Operation not permitted.'}); //no HTML quando retorna 200 é sucesso // 401 é não autorizado          
        }
        await connection('incidents').where('id', id).delete(); //se quem estiver logado criou o incidente, deleta o incidente do BD
        return response.status(204).send(); //é uma resposta que deu sucesso, mas sem conteúdo send() envia resposta vazia
    } // no Insomnia: http://localhost:3333/incidents/1 esse /1 é o ID

};