export function save() {
    Auth.userData.name = $("#settings-name").val()
    Auth.userData.nickname = $("#settings-nickname").val()
    Auth.userData.mailingList = document.getElementById('settings-mailing-list').checked
    Auth.userData.phone = $("#settings-phone").intlTelInput("getNumber")
    Auth.userData.cpf = $("#settings-id-cpf").val()

    let languageOptions = document.getElementsByClassName("ui-language-option")
    for (let i=0; i<languageOptions.length; i++){
        if (languageOptions[i].checked){
            Auth.userData.uiLanguage = languageOptions[i].value
            break
        }
    }

    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
    })

    let init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "name": Auth.userData.name,
            "nickname": Auth.userData.nickname,
            "mailingList": Auth.userData.mailingList,
            "phone": Auth.userData.phone,
            "cpf": Auth.userData.cpf,
            "uiLanguage": Auth.userData.uiLanguage
        }),
        mode: 'cors',
        cache: 'default'
    }

    fetch(`${apiDomain}/api/user/self-modify`, init).then((response) => {
        if (response.status == 200) {
            response.json().then(response => {
                notify(string.settings.selfUpdated, "success", false)

                // TODO
                // replace it with something that doesn't make another request
                Auth.requestLoggedExperience()
            })
        } else {
            response.json().then(err => {
                console.log(err)
                notify(string.alerts.unknownError, "warning", true)
            })
        }
    })
}
