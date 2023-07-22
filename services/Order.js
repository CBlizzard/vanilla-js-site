import { getProductById } from './Menu.js';

export async function addToCart(id) {
    const product = await getProductById(id);

    const results = kamui.store.cart.filter(prodInCart => prodInCart.id === product.id)

    if (results > 0) {
        kamui.store.cart = kamui.store.cart.map(
            p => p.productId === id ? { ...p, quantity: p.quantity + 1 } : p
        )
    }
    else {
        kamui.store.cart = [...kamui.store.cart, { product, quantity: 1 }];
    }
}

export async function removeFromCart(id) {
    kamui.store.cart = kamui.store.cart.filter(p => p.product.id !== id);
}