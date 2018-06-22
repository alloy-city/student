function retractResource(id){
    let element = document.getElementsByName(id)[0]
    if (element) element.remove()
    Student.Live.resourcesReceived.splice(Student.Live.resourcesReceived.indexOf(id), 1)
}

export { retractResource }