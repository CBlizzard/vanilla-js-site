import API from "./Api.js";

export async function loadData() {
    kamui.store.menu = await API.fetchMenu();
}

export async function getProductById(id) {
    if (!kamui.store.menu) await loadData();

    for (let category of kamui.store.menu) {
        for (let product of category.products) {
            if (product.id == id) return product;
        }
    }
}