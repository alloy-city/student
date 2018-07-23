function pointer(instruction){
    
    if (instruction.type == "pointer-enter"){
        let slide = document.querySelector(`.resource[name="${instruction.slide}"]`)
        let pointer = document.createElement("div")

        if (pointer && slide){
            pointer.classList.add("teacher-pointer")
            slide.appendChild(pointer)
        }
    }

    if (instruction.type == "pointer-coordinates"){
        let pointer = document.getElementsByClassName("teacher-pointer")[0]

        let imageContainer = document.querySelector(`div.resource[name="${instruction.slide}"]`)
        let image
        if (imageContainer){
            image = imageContainer.firstChild
        }

        if (pointer && image){
            pointer.style.top = (image.offsetTop + image.height * instruction.coordinates[1]) + "px"
            pointer.style.left = (image.offsetLeft + image.width * instruction.coordinates[0]) + "px"
        }
    }

    if (instruction.type == "pointer-exit"){
        let pointer = document.getElementsByClassName("teacher-pointer")[0]
        if (pointer){
            pointer.remove()
        }
    }
}

export { pointer }