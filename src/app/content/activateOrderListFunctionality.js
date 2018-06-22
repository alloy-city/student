export function activateOrderListFunctionality(id) {
    let el = document.getElementById(id);
    let sortable = Sortable.create(el, {
        animation: 150
    });
}