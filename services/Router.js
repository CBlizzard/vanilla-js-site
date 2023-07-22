const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach((a) => {
            a.addEventListener("click", (e) => {
                e.preventDefault();
                // const url = e.target.href;
                const url = e.target.getAttribute("href");
                Router.go(url);
            });
        });

        // event listener for URL changes
        window.addEventListener("popstate", (e) => {
            Router.go(e.state.route, false); // we added 'route' object at history.pushState() below
        });

        // check initial URL
        Router.go(location.pathname);
    },
    go: (route, addToHistory = true) => {
        console.log(`going to ${route}`);
        if (addToHistory) {
            history.pushState({ route }, "", route);
        }

        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page");
                break;
            case "/order":
                pageElement = document.createElement("order-page");
                pageElement.textContent = "Your Order";
                break;
            default:
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page");
                    pageElement.textContent = "Product Details";

                    const paramId = route.substring(route.lastIndexOf("-") + 1);
                    pageElement.dataset.id = paramId;
                }
        }

        if (pageElement) {
            // document.querySelector("main").children[0].remove();
            let cache = document.querySelector("main");

            cache.innerHTML = "";
            cache.appendChild(pageElement);

            window.scrollX = 0;
            window.scrollY = 0;
        }
    },
};

export default Router;
