import { Requests } from "./models/api.js";
class Login {
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
Login.loginPage()