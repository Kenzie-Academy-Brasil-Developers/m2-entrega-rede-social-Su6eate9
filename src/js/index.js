import { Requests } from "./models/api.js";
class Login {
    // static verifyToken(){
    //     const token = localStorage.getItem(Requests.token)
    //     if(token){
    //         console.log(token)
    //         // window.location.replace("./models/dashboard.js")
    //     }
    // }
    static loginPage(){
        const email    = document.querySelector("#email__user")
        const password = document.querySelector("#password__user")
        const btnLogin = document.querySelector("#login__btn")
        btnLogin.addEventListener("click", e => {
            e.preventDefault()
            const data = {
                "email": email.value,
                "password": password.value
            }
            Requests.login(data)
        })
    }
}
// Login.verifyToken()
Login.loginPage()