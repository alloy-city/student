function scrollToElement(el) {
    if (el.offset()) {
        $('html, body').animate({
            scrollTop: (el.offset().top - 20)
        }, 400);
    }
}

export { scrollToElement }