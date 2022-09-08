import { Toast } from "./toast.js";
export class Logout {
    static async logoutPage(){
        document.querySelector("#btn__exit").addEventListener("click", e => {
            e.preventDefault()
            Toast.create("Deslogando","green")
            setTimeout(() => {
                window.location.replace("../../index.html")
            }, 2000);
            localStorage.clear()
        })
    }
}