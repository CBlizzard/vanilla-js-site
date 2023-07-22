export class OrderPage extends HTMLElement {
    #user = {
        name: "",
        email: "",
        phone: "",
    }

    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });
        const styles = document.createElement("style");
        this.root.appendChild(styles);
        const section = document.createElement("section");
        this.root.appendChild(section);

        async function loadCSS() {
            const request = await fetch("/components/OrderPage.css");
            styles.textContent = await request.text();
        }
        loadCSS();
    }

    connectedCallback() {
        window.addEventListener("cartchangehua", () => {
            this.render();
        })
        this.render();
    }

    render() {


        let section = this.root.querySelector("section");
        if (kamui.store.cart.length == 0) {
            section.innerHTML = `
            <p class="empty">Your order is empty</p>
        `;
        } else {
            let html = `
            <h2>Your Order</h2>
            <ul>
            </ul>
        `;
            section.innerHTML = html;

            const template = document.getElementById("order-form-template");
            const content = template.content.cloneNode(true);
            section.appendChild(content);

            let total = 0;
            for (let prodInCart of kamui.store.cart) {
                const item = document.createElement("cart-item");
                item.dataset.item = JSON.stringify(prodInCart);
                this.root.querySelector("ul").appendChild(item);

                total += prodInCart.quantity * prodInCart.product.price;
            }
            this.root.querySelector("ul").innerHTML += `
              <li>
                  <p class='total'>Total</p>
                  <p class='price-total'>$${total.toFixed(2)}</p>
              </li>                
          `;
        }
        this.setFormBindings(this.root.querySelector("form"));
        // "this.root" because it is in shadow DOM, not in regular DOM 
    }

    setFormBindings(form) {
        form.addEventListener("submit", e => {
            e.preventDefault()
            alert(`Thanks for your order, ${this.#user.name}!`)

            this.#user.name = "";
            this.#user.email = "";
            this.#user.phone = "";

            // now send data to server
        })

        // setting double data binding 

        // 1. user values are changed, then form values are changed
        this.#user = new Proxy(this.#user, {
            set(target, property, value) {
                target[property] = value;
                form.elements[property].value = value;
                return true; // whenever we use setter, we need to return true
            }
        })

        // 2. form values are changed, then user values are changed
        Array.from(form.elements).forEach(element => {
            element.addEventListener("change", (event) => {
                this.#user[element.name] = element.value;
            })
        })


    }
}

customElements.define("order-page", OrderPage);