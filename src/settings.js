import * as savePassword from "./save-new-password.js"
import * as updateUserData from "./update-user-data.js"

export function settingsText(){
  // Section titles
  $("#settings-user-data-title").text(string.settings.userDataTitle)
  $("#settings-change-password-title").text(string.settings.changePasswordTitle)

  $('#settings-name').val(Auth.userData.name)
  $('#settings-nickname').val(Auth.userData.nickname)
  $('#settings-email').val(Auth.userData.mainEmail)
  $('#settings-id-cpf').val(Auth.userData.cpf)
  
  $('#label-name').text(string.settings.name)
  $('#label-email').text(string.settings.email)
  $('#label-nickname').text(string.settings.nickname)
  document.getElementById("settings-mailing-list").parentElement.appendChild(document.createTextNode(string.settings.mailingList))

  $('#settings-change-password-button').text(string.settings.changePasswordButton)
  $('#label-new-password').text(string.settings.newPassword)
  $('#label-confirm-new-password').text(string.settings.confirmNewPassword)
  $('#label-current-password').text(string.settings.currentPassword)

  $('#label-phone').text(string.settings.phone)
  $('#label-id').text(string.settings.cpf)
  $('#settings-id-cpf').attr('placeholder', string.settings.cpfReason)
  $('#settings-form-confirm').text(string.settings.updateData)
  $("#ui-language-title").text(string.settings.uiLanguageTitle)
  $(`#ui-language-${language}`).prop("checked", true);

  // phone
  $("#settings-phone").intlTelInput({
    initialCountry: "auto",
    geoIpLookup: function (callback) {
      $.get('https://ipinfo.io', function () { }, "jsonp").always(function (resp) {
        var countryCode = (resp && resp.country) ? resp.country : ""
        callback(countryCode)
      })
    },
    utilsScript: "./scripts/utils.js"
  })
  
  if (Auth.userData.phones[0]){
    $('#settings-phone').intlTelInput("setNumber", Auth.userData.phones[0])
  }

  // mailingList
  if (Auth.userData.mailingList) {
    document.getElementById('settings-mailing-list').checked = true
  } else {
    document.getElementById('settings-mailing-list').checked = false
  }
  
  // language
  if (Auth.userData.uiLanguage) {
    $(`#ui-language-${Auth.userData.uiLanguage}`).prop("checked", true)
    moment.locale(Auth.userData.uiLanguage)
  } else {
    
    let browserLanguage = window.navigator.language.slice(0, 2);
    if (browserLanguage == "fr") {
      $(`#ui-language-fr`).prop("checked", true)
      moment.locale('fr')
    } else if (browserLanguage == "pt") {
      $(`#ui-language-pt-br`).prop("checked", true)
      moment.locale('pt-br')
    } else {
      $(`#ui-language-en`).prop("checked", true)
      moment.locale('en')
    }
  }
}

// password validation
export function validatePassword(){

  $(".alert").remove()

  let informedCurrentPassword = $("#settings-current-password").val()
  let newPassword = $("#settings-new-password").val()
  let newPasswordConfirmation = $("#settings-confirm-new-password").val()

  let passwordStrength = zxcvbn(newPassword)
  
  if (passwordStrength.score > 1){
    if (newPassword == newPasswordConfirmation){
      let SHA256 = new Hashes.SHA256
      let currentClientKey = SHA256.hex(informedCurrentPassword)
      let newClientKey = SHA256.hex(newPassword)

      savePassword.save(currentClientKey, newClientKey)

    } else {
      notify(string.alerts.password.different, "warning", true)
    }
  } else {
    notify(string.alerts.password.weak, "warning", true)
  }
}

export function validateUserData(){
  // phone validation
  if ($("#settings-phone").intlTelInput("isValidNumber")){
    updateUserData.save()
  } else {
    notify(string.alerts.invalidPhoneNumber, "warning", false)
    $("#settings-phone").val("")
    updateUserData.save()
  }
}
