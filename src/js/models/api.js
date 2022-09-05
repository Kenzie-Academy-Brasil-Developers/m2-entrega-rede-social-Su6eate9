export class Requests {
    static url = "https://m2-rede-social.herokuapp.com/api/"
    static token
    static headers = {
        "Content-Type": "application/json"
    }
    static headersAuth = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Requests.token}`
    }
    static async login(data){
        return await fetch(`${Requests.url}users/login/`,{
            method: "POST",
            headers: Requests.headers,
            body: JSON.stringify(data)
        })
        .then(response => response.json())        
        .then(data  => {
            localStorage.setItem("@kenzieStore:token", data.token)
            localStorage.setItem("@kenzieStore:user_uuid", data.user_uuid)
            // window.location.assign("./src/html/dashBoard.html")
        })
        .catch(err => console.log(err))
    }
}