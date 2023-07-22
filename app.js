import { loadData } from "./services/Menu.js";
import Store from "./services/Store.js";

window.kamui = {}
kamui.store = Store

// waiting for things to load before doing anything
document.addEventListener('DOMContentLoaded', async ()=> {
   loadData();
});