// keep active tab on localStorage for next visit
function activeTab(){
    let tabs = [
        "classroom",
        "material",
        "whatsapp",
        "vids",
        "training",
        "faq",
        "products",
        "settings"
    ]

    if (localStorage.activeTab == tabs[0] || !localStorage.activeTab) localStorage.setItem("activeTab", tabs[1])
    setTab(localStorage.activeTab)
}

function setTab(tab){
    // console.log(tab)
    save(tab)
    let tabElements = document.getElementsByClassName("nav-tabs")[0].children
    let tabPanes = document.getElementsByClassName("tab-pane")
    for (let i = 0; i < tabElements.length; i++){
        tabElements[i].classList = ""
        tabPanes[i].classList = "tab-pane fade"
    }
    document.getElementById(tab).classList = "tab-pane fade in active"
    let p = document.getElementById(`tab-${tab}`).parentElement
    p.classList = "active"
}

function save(t){
    localStorage.setItem("activeTab", t)
}

export { activeTab, setTab, save }