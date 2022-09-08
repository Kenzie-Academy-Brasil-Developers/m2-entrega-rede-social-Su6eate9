import { Logout } from "./logout.js";
import { Requests } from "./api.js";
class Dashboard {
    //Info do usuário
    static async dashboardUser(){
        const sectionUser = document.querySelector(".section__user")
        const photo    = document.createElement("img")
        const div      = document.createElement("div")
        const name     = document.createElement("h2")
        const job      = document.createElement("p")
        const follows  = document.createElement("span")
        const id       = localStorage.getItem("@redeSocial:user_uuid")
        const user     = await Requests.getUser(id)
        const { username,work_at,image,followers } = user   
        
        photo.id = "userPhoto"
        name.id = "username"
        job.id = "userJob"
        follows.id = "userFollows"
        photo.src = image
        photo.alt = username
        name.innerText    = username
        job.innerText     = work_at
        follows.innerHTML = `${followers.length} seguidores`
        div.append(name,job)
        sectionUser.append(photo,div,follows)
    }
    //Criando postagem
    static async postCreate(){
        const sectionCreate = document.querySelector(".section__create")
        const titlePost   = document.createElement("input")
        const contentPost = document.createElement("textarea")
        const divPost     = document.createElement("div")
        const btnPostNone = document.createElement("button")
        const btnPost     = document.createElement("button")
        
        titlePost.type = "text"
        titlePost.name = "title"
        titlePost.id   = "title__post"
        titlePost.placeholder = "Digitar título do post"
        contentPost.name = "text"
        contentPost.id   = "content__post"
        contentPost.cols = "30"
        contentPost.rows = "10"
        contentPost.innerText = "Digitar descrição do post"
        btnPostNone.id = "none"
        btnPostNone.innerText = "Postar"
        btnPost.type = "submit"
        btnPost.id = "btn__createPost"
        btnPost.innerText = "Postar"

        divPost.append(btnPostNone,btnPost)
        sectionCreate.append(titlePost,contentPost,divPost)

        btnPost.addEventListener("click", async e => {
            e.preventDefault()
            const data = {
                "title": titlePost.value,
                "description": contentPost.value
            }
            await Requests.createPost(data)
            Requests.postView()
        })
    }
    //Usuários apresentados
    static async otherUsers(){
        const ulSlider = document.querySelector(".slider")
        const articleSlider = document.createElement("article")
        const imgOtherUser  = document.createElement("img")
        const divSlider     = document.createElement("div")
        const nameOtherUser = document.createElement("h3")
        const jobOtherUser  = document.createElement("span")
        const btnFollow     = document.createElement("button")
    }
    //Visualização dos posts
    static async postView(){
        const ulPosts  = document.querySelector(".section__posts__ul")
    }
}
/* 
<li>
    <article class="slider__article">
        <img src="../assets/carlosLima.png" alt="photo Carlos Lima">
        <div>
            <h3>Carlos Lima</h3>
            <span>UX e UI Desginer</span>
        </div>
    </article>
    <button onclick="preventDefault()" type="submit" id="btn__follow">Seguir</button>
</li>
*/
Logout.logoutPage()
Dashboard.dashboardUser()
Dashboard.postCreate()