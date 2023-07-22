export class MenuPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" }); // shadow dom

        const styles = document.createElement("style");
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("/components/MenuPage.css");
            const css = await request.text();
            styles.textContent = css;
        }
        loadCSS();
    }

    connectedCallback() {
        const template = document.getElementById("menu-page-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        window.addEventListener("menuchangehua", () => {
            this.render();  // this is to update the menu
        })
        this.render(); // this is to render the menu first time
    }

    render() {
        const cache = this.root.querySelector("#menu");
        if (kamui.store.menu) {
            cache.innerHTML = "";
            for (let category of kamui.store.menu) {
                const liCategory = document.createElement("li");
                liCategory.innerHTML = `
                    <h3>${category.name}</h3>
                    <ul class="category">
                    
                    </ul>
                    `;
                cache.appendChild(liCategory);

                category.products.forEach(product => {
                    const item = document.createElement("product-item");
                    item.dataset.product = JSON.stringify(product);
                    liCategory.querySelector("ul").appendChild(item);
                })
            }
        }
        else {
            cache.innerHTML = "Loading...";
        }
    }
}

customElements.define("menu-page", MenuPage);
