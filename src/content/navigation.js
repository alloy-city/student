let contentNav = document.getElementById("classroom-content-navigation")

function hideNavigation(){
    contentNav.classList = "hidden"
}

function showNavigation(){
    contentNav.classList = ""
}

export { hideNavigation, showNavigation }
