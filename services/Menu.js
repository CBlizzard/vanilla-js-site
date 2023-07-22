import API from "./Api.js";

export async function loadData(){
    kamui.store.menu = await API.fetchMenu();


}