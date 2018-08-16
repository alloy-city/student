export function applyText() {
    // logo
    $("#logo").attr("src", `/images/logo_${Auth.userData.uiLanguage}.png`);

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

    $("#faq-howMuch").text(string.faq.howMuch);
    $("#faq-howMuch_p").text(string.faq.howMuch_p);
    $("#faq-contrat").text(string.faq.contrat);
    $("#faq-contrat_p").text(string.faq.contrat_p);

    // $("#faq-terms").text(string.agreements.question);
    // terms.setTerms();

    $("#faq-time").text(string.faq.time);
    $("#faq-time_p").text(string.faq.time_p);
    $("#faq-hangouts").text(string.faq.hangouts);
    $("#faq-hangouts_p").text(string.faq.hangouts_p);
    $("#faq-material").text(string.faq.material);
    $("#faq-material_p").text(string.faq.material_p);
    $("#faq-missions").text(string.faq.missions);
    $("#faq-missions_p").text(string.faq.missions_p);
    $("#faq-xps").text(string.faq.xps);
    $("#faq-xps_p").text(string.faq.xps_p);
    $("#faq-indexText2").text(string.faq.indexText2);

    // products
    document.getElementById("courses-title").innerText = string.products.buyCall
}
