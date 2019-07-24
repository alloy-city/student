export function applyText() {
    // logo
    $("#logo").attr("src", `/images/logo_${Auth.userData.uiLanguage || 'fr'}.png`);

    // payment
    $("#payment_methods").text(string.payment.methods);

    // tabs
    $("#tab-material").text(string.tabs.material);
    $("#tab-whatsapp").text(string.tabs.whatsappTab);
    $("#tab-vids").text(string.tabs.videosTab);
    $("#tab-training").text(string.tabs.gamesTab);
    $("#tab-faq").text(string.tabs.faqTab);
    $("#tab-products").text(string.tabs.products);
    $("#tab-settings").text(string.tabs.settingsTab);

    // footer
    let about = document.getElementById("about-us")
    about.setAttribute("href", string.footer.aboutUsURL)
    about.innerText = string.footer.aboutUsText

    //whatsApp
    $(".enter-button").text(string.buttons.enter);
    $("#wa-groups-description").text(string.whatsAppGroups.intro);
    $("#wa-free-title").text(string.whatsAppGroups.title.free);
    $("#wa-noob-title").text(string.whatsAppGroups.title.noob);
    $("#wa-free-description").text(string.whatsAppGroups.description.free);
    $("#wa-noob-description").text(string.whatsAppGroups.description.noob);

    $("#grenadine-title").attr("alt", string.grenadine.title);
    $("#grenadine-description").text(string.grenadine.description);
    $("#memory-title").text(string.memory.title);
    $("#memory-img-alt").attr("alt", string.memory.title);
    $("#memory-description").text(string.memory.description);
    $("#directions-title").attr("alt", string.directions.title);
    $("#directions-descriptions").text(string.directions.descriptions);
    $("#directions-button").text(string.directions.buttonText);

    // $("#faq-indexText2").text(string.faq.indexText2);

    // products
    document.getElementById("courses-title").innerText = string.products.buyCall

    // current year in footer
    var d = new Date();
    document.getElementById("current-year").innerText = d.getFullYear()
}
