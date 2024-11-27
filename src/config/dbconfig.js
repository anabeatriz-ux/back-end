import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
    let mongoClient; 

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('conectando ao cluster do banco de dados...');
        await mongoClient.connect();
        console.log('conectando ao monogDB Atlas com sucesso!');

        return mongoClient;
 }  catch(erro) { 
        console.error('falha na conexao com o banco!', erro);
        process.exit();
 }
}