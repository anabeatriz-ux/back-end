import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModels.js";
import fs from "fs";
export async function listarPosts(req, res)  {
    // Chama a função getTodosPosts() para obter todos os posts do banco de dados.
    const posts = await getTodosPosts();
    res.status(200).json(posts);
    // Envia uma resposta HTTP com status 200 (OK) e o array de posts no formato JSON.
   }
   
export async function postarNovoPost(req, res) {

    const novoPost = req.body;
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    }catch(erro) {
        console.error(erro.message);
        res.status(500).json({"erro":"falha na requisição"})
    }
}

export async function uploadImagem(req, res) {

    const novoPost = {
        descricao:"",
        imgUrl:req.file.originalname,
        alt:""
    };
    try{
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada =`uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);
    }catch(erro) {
        console.error(erro.message);
        res.status(500).json({"erro":"falha na requisição"})
    }
}

export async function atualizarNovoPost(req, res) {

    const id = req.params.id;
    const urlImagem = `http://loacalhost:3000${id}.png`
    const post ={
        imgUrl: urlImagem,
        descricao: req.body.descricao,
        alt: req.body.alt
    }
    try{
        const postCriado = await atualizarPost(id, Post);
        res.status(200).json(postCriado);
    }catch(erro) {
        console.error(erro.message);
        res.status(500).json({"erro":"falha na requisição"})
    }
}
