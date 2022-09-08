import { Requests } from "./api.js";
class Register {
    static newUser(){
        const name     = document.querySelector("#name__registro")
        const email    = document.querySelector("#email__registro")
        const password = document.querySelector("#password__registro")
        const job      = document.querySelector("#job__registro")
        const photo    = document.querySelector("#imagem__registro")
        const button   = document.querySelector("#btnRegister")
        button.addEventListener("click", e => {
           e.preventDefault()
           const data = {
                "username": name.value,    
                "email": email.value,    
                "password": password.value,    
                "work_at": job.value,    
                "image": photo.value  
           }
           Requests.register(data)
        })
    }
}
Register.newUser()