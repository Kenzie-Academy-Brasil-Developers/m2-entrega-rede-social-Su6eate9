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
        const otherUsers = await Requests.getAllUsers()
        const listUsers  = []
        function listenerUsers(obj){
            const results = obj.results
            for(let i=0; i<3; i++){
                const random = results.sort()
                listUsers.push(random)
                const listenerFull = [...new Set(listUsers)]
                listenerFull.forEach(user => {
                    const ulSlider = document.querySelector(".slider")
                    const liSlider = document.createElement("li")
                    const articleSlider = document.createElement("article")
                    const imgOtherUser  = document.createElement("img")
                    const divSlider     = document.createElement("div")
                    const nameOtherUser = document.createElement("h3")
                    const jobOtherUser  = document.createElement("span")
                    const btnFollow     = document.createElement("button")
        
                    articleSlider.classList.add("slider__article")
                    imgOtherUser.src = user[i].image
                    imgOtherUser.alt = user[i].username
                    nameOtherUser.innerText = user[i].username
                    jobOtherUser.innerText  = user[i].work_at
                    btnFollow.type      = "submit"
                    btnFollow.id        = "btn__follow"
                    btnFollow.innerText = "Seguir" 
        
                    divSlider.append(nameOtherUser,jobOtherUser)
                    articleSlider.append(imgOtherUser,divSlider)
                    liSlider.append(articleSlider,btnFollow)
                    ulSlider.append(liSlider)
                })
            }
        }
        listenerUsers(otherUsers)
        // Dashboard.followOtherUsers()
    }
    //Visualização dos posts
    static async postView(){
        const postsList = await Requests.getPosts()
        const array = postsList.results
        array.forEach((e) => {
            const ulPosts = document.querySelector(".section__posts__ul")
            const liInfo  = document.createElement("li")  
            const photo   = document.createElement("img")
            const divInfo = document.createElement("div")  
            const name    = document.createElement("h2")  
            const job     = document.createElement("p")

            liInfo.classList.add("li__posts__info")
            photo.src = e.author.image
            photo.alt = e.author.username
            name.innerText = e.author.username
            job.innerText  = e.author.work_at
            
            const liText  = document.createElement("li")  
            const title   = document.createElement("h2")
            const text    = document.createElement("p")  
            const divText = document.createElement("div")  
            const btnPost = document.createElement("button")
            const divLike = document.createElement("div")
            const btnLike = document.createElement("button")
            const count   = document.createElement("spans")

            liText.classList.add("li__posts__text")
            title.innerText = e.title
            text.innerText  = e.description
            btnPost.id        = "btn__openPost"
            btnPost.innerText = "Abrir Post"
            divLike.classList.add("count__like")
            btnLike.classList.add("btn__likePost")
            btnLike.id      = "btn__likePost"
            count.innerText = e.likes.length
            
            divInfo.append(name,job)
            liInfo.append(photo,divInfo)
            divLike.append(btnLike,count)
            divText.append(btnPost,divLike)
            liText.append(title,text,divText)
            ulPosts.append(liInfo,liText)
        })
        Dashboard.likePost()
    }
    static async likePost(){
        let active = false
        const btnLike = document.querySelectorAll("#btn__likePost")
        await btnLike.addEventListener("click", async (e) => {
            e.preventDefault()
            if(!active){
                btnLike.classList.toggle(".btn__deslikePost")
                active = true
                const data = {
                    "post_uuid": btnLike.id
                }
                await Requests.like(data)
            } else {
                btnLike.classList.toggle(".btn__likePost")
                active = false
                await Requests.unlike(btnLike.id)
            }
        })
    }
}
Logout.logoutPage()
Dashboard.dashboardUser()
Dashboard.postCreate()
Dashboard.otherUsers()
Dashboard.postView()
Dashboard.likePost()