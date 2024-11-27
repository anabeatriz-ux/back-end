import express from "express"
import multer from "multer";
import { listarPosts, postarNovoPost,uploadImagem,atualizarNovoPost } from "../cotrollers/postsControllers.js";

const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const ulpload = multer({dest:"./uploads", storage})
//linux ou no mac
//const ulpload = multer({dest:"./uploads"})

const routes = (app) => {
    app.use(express.json());
// Habilita o middleware para analisar o corpo das requisições que contêm dados no formato JSON.

    //rota para buscar todos os posts
    app.get("/posts",listarPosts);  
    app.post("/posts", postarNovoPost)
     //rota para criar um post
     app.post("/upload",ulpload.single("imagem"), uploadImagem)

     app.put("/upload/:id", atualizarNovoPost)
}

export default routes;