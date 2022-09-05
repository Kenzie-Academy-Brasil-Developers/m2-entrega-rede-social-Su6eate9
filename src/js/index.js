async function modalRegistro(){
    const btnModalRegistro = document.querySelectorAll("[data-modal-control]")
    for(let i=0; i<btnModalRegistro; i++){
        btnModalRegistro[i].addEventListener("click", e => {
            let valueDataModalControl = btnModalRegistro[i].getAttribute("data-modal-control")
            document.getElementById(valueDataModalControl).classList.toggle("modal__show")
        })
    }
}
modalRegistro()