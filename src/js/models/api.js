import { Toast } from "./toast.js"
export class Requests {
    static url = "http://m2-rede-social.herokuapp.com/api"
    static token = localStorage.getItem("@redeSocial:token")
    static headers = {
        "Content-Type": "application/json"
    }
    static headersAuth = {
        "Content-Type": "application/json",
        "Authorization": `Token ${Requests.token}`
    }
    static async register(data){
        return await fetch(`${Requests.url}/users/`,{
            method: "POST",
            headers: Requests.headers,
            body: JSON.stringify(data)
        })
        .then(response => response.json())        
        .then(data  => {
            Toast.create("Usuário registrado com sucesso!","green")
            setTimeout(() => {
                window.location.replace("../../index.html")
            }, 2000);
            return data
        })
        .catch(err => {
            Toast.create("Email já utilizado!","red")
            console.log(err)
        })
    }
    static async login(data){
        return await fetch(`${Requests.url}/users/login/`,{
            method: "POST",
            headers: Requests.headers,
            body: JSON.stringify(data)
        })
        .then(response => response.json())        
        .then(data  => {
            localStorage.setItem("@redeSocial:token", data.token)
            localStorage.setItem("@redeSocial:user_uuid", data.user_uuid)
            if(data.token){
                Toast.create("Usuário logado com sucesso!","green")
                setTimeout(() => {
                    window.location.replace("./src/html/dashboard.html")
                }, 2000);
            }else{
                Toast.create("Usuário ou senha incorretos!","red")
                setTimeout(() => {
                    window.location.replace("../index.html")
                }, 2000);
            }
            return data
        })
        .catch(err => console.log(err))
    }
    static async getAllUsers(){
        return await fetch(`${Requests.url}/users/`,{
            method: "GET",
            headers: Requests.headersAuth
        })
        .then(response => response.json())
        .catch(err => {
            Toast.create(err, "red")
            console.log(err)
        })
    }
    static async getUser(id){
        return await fetch(`${Requests.url}/users/${id}/`,{
            method: "GET",
            headers: Requests.headersAuth
        })
        .then(response => response.json())
        .catch(err => {
            Toast.create(err, "red")
            console.log(err)
        })
    }
    static async follow(id){
        return await fetch(`${Requests.url}/users/follow/`,{
            method: "POST",
            headers: Requests.headersAuth,
            body: JSON.stringify(id)
        })
        .then(response => {
            Toast.create("Você está seguindo este usuário!","green")
            return response.json()
        })
        .catch(err => {
            Toast.create(err, "red")
            console.log(err)
        })
    }
    static async unfollow(id){
        return await fetch(`${Requests.url}/users/unfollow/${id}`,{
            method: "DELETE",
            headers: Requests.headersAuth
        })
        .then(response => {
            Toast.create("Você não segue mais este usuário!","green")
            return response.json()
        })
        .catch(err => {
            Toast.create(err,"red")
            console.log(err)
        })
    }
    static async createPost(data){
        return await fetch(`${Requests.url}/posts/`,{
            method: "POST",
            headers: Requests.headersAuth,
            body: JSON.stringify(data)
        })
        .then(response => {
            Toast.create("Post criado com sucesso", "green")
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
    }
    static async getPosts(){
        return await fetch(`${Requests.url}/posts/`,{
            method: "GET",
            headers: Requests.headersAuth
        })
        .then(response => response.json())
        .catch(err => console.log(err))
    }
    static async like(id){
        return await fetch(`${Requests.url}/likes/`,{
            method: "POST",
            headers: Requests.headersAuth,
            body: JSON.stringify(id)
        })
        .then(response => response.json())
        .catch(err => {
            Toast.create(err,"red")
            console.log(err)
        })
    }
    static async unlike(id){
        return await fetch(`${Requests.url}/likes/${id}`,{
            method: "DELETE",
            headers: Requests.headersAuth
        })
        .then(response => response.json())
        .catch(err => {
            Toast.create(err,"red")
            console.log(err)
        })
    }
}