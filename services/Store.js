const Store = {
    menu: null,
    cart: []
}

const proxiedStore = new Proxy(Store, {
    set(target, property, value) {
        target[property] = value;

        if (property === "menu") window.dispatchEvent(new Event("menuchangehua"))
        if (property === "cart") window.dispatchEvent(new Event("cartchangehua"))

        return true;
    }
})

export default proxiedStore;