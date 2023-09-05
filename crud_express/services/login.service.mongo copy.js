const LoginModel = require("../models/login.models.mongo")

class LoginService{

    static list(request,response){
        LoginModel.find()
        .then(
            (logins) => {
                response.status(201).json(logins)
            }
        )
    }

    static register(request,response){
        LoginModel.create(request.body)
        .then(
            (login) => {
                response.status(201).json(login)
            }
        )
    }

    static delete(request,response){
        LoginModel.findByIdAndDelete(request.params.id)
        .then(
            (login) => {
                response.status(201).json(login)
            }
        )
    }

    static retrieve(request,response){
        LoginModel.findById(request.params.id)
        .then(
            (login) => {
                response.status(201).json(login)
            }
        )
    }

    static update(request,response){
        LoginModel.findByIdAndUpdate(
                request.params.id,
                request.body,
                {"new":true})
        .then(
            (login) =>{
                response.status(201).json(login)
            }
        )
    }

}

module.exports = LoginService