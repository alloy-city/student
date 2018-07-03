function nOfColumns() {
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    if (w < 768)
        return 1
    else if (w < 992)
        return 2
    else if (w < 1200)
        return 3
    else
        return 4
}

function nOfCardsByColumn (nOfCards) {
    if (!nOfCards){
        return
    }
    
    return Math.round(nOfCards / nOfColumns())
}

function nOfCardsOnLastColumn (nOfCards) {
    if (!nOfCards) {
        return
    }

    let n = nOfCards - nOfCardsByColumn(nOfCards) * (nOfColumns() - 1)

    if (n == 0) return 1

    return n
}

export { nOfColumns, nOfCardsByColumn, nOfCardsOnLastColumn }