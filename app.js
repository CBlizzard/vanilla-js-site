import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";

window.kamui = {}
kamui.store = Store;
kamui.router = Router;

// waiting for things to load before doing anything
document.addEventListener('DOMContentLoaded', async ()=> {
   loadData();
   kamui.router.init();
});