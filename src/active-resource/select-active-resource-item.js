function selectActiveResourceItem(item) {
    /// #if DEBUG
    console.log(item.innerHTML)
    /// #endif

    let items = $(item).parent().children()

    for (let i = 0; i < items.length; i++) {
        $(items[i]).removeClass("active");
    }

    $(item).addClass('active');
}

export { selectActiveResourceItem }