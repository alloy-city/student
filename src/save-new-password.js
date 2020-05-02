export function save(currentClientKey, newClientKey){
    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
    })

    let init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ "currentClientKey": currentClientKey, "newClientKey": newClientKey }),
        mode: 'cors',
        cache: 'default'
    }

    fetch(`${apiDomain}/api/auth/change/`, init).then((response) => {
        if (response.status == 200){
            response.json().then(response => {
                notify(string.auth.newPasswordProcessed, "success", false)
            })
        } else {
            response.json().then(err => {
                notify(string.auth.wrongPassword, "warning", true)
            })
        }  
    })
}