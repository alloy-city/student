function areThereNewProducts(products) {
    if (!localStorage.productDates) return true;

    let lastVisitProductDates = JSON.parse(localStorage.productDates)

    if (lastVisitProductDates.length === 0) return true;

    let thereIsNovelty = false
    for (let i=0; i<products.length; i++) {
        if (lastVisitProductDates.indexOf(products[i].date) === -1) { 
            thereIsNovelty = true;
            break;
        }
    }

    return thereIsNovelty;
}

function storeProductDates(products) {
    let dates = []

    for (let i=0; i<products.length; i++) {
        dates.push(products[i].date)
    }

    localStorage.setItem("productDates", JSON.stringify(dates));
}

export { storeProductDates, areThereNewProducts }
