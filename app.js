import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";

// link web components       
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { ProductItem } from "./components/ProductItem.js";
import { CartItem } from "./components/CartItem.js";

window.kamui = {};
kamui.store = Store;
kamui.router = Router;

// waiting for things to load before doing anything
document.addEventListener("DOMContentLoaded", async () => {
    loadData();
    kamui.router.init();
});

window.addEventListener("cartchangehua", e => {
    const badge = document.getElementById("badge")
    const qnty = kamui.store.cart.reduce((acc, item) => acc + item.quantity, 0);

    badge.textContent = qnty;
    badge.hidden = qnty === 0;
})