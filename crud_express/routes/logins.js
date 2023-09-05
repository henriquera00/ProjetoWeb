const loginService = require("../services/login.service")
const loginServiceMongo = require("../services/login.service.mongo")

var express = require('express');
var router = express.Router();

router.get(
    "/listar"
    ,
    (req,res,next)=>{
        loginServiceMongo.list(req,res)
    }
)

router.post(
    "/cadastrar"
    ,
    (req,res,next)=>{
       loginServiceMongo.register(req,res)
    }
)

router.get(
    "/recuperar/:id"
    ,
    (req,res,next)=>{
       loginServiceMongo.retrieve(req,res)
    }
)

router.put(
    "/atualizar/:id"
    ,
    (req,res,next)=>{
        loginServiceMongo.update(req,res)
    }
)

router.delete(
    "/remover/:id"
    ,
    (req,res,next)=>{
        loginServiceMongo.delete(req,res)
    }
)


module.exports = router