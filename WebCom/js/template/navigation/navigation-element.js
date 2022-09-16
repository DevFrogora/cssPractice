import { LoadFileToText } from "../../modules/Loader.js";


let navTemplate = await LoadFileToText("/js/template/navigation/navigation-template.html");
const template = document.createElement('template');
template.innerHTML = navTemplate;

const route = (event) => {
    event = event || window.event;
    // event.preventDefault();
    window.history.pushState({}, "", event.getAttribute("customPath"));
    handleLocation();
};

const routes = {
    404: "/pages/404.html",
    "/": "/pages/home.html",
    "/project": "/pages/project.html",
    "/experience": "/pages/experience.html",
    "/contact": "/pages/contact.html",
    "/about": "/pages/about.html"
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();

class Navigation extends HTMLElement {
    constructor() {
        super();
    }

    OnSlotItemClicked(e) {
        route(e);
    }

    connectedCallback() {
        let toggleTheme = false;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // this.shadowRoot.querySelector('span').innerHTML = this.getAttribute('name');
        this.shadowRoot.querySelector('img').
            addEventListener('click', (e) => this.OnSlotItemClicked(e.target));
        this.shadowRoot.querySelector('slot').
            addEventListener('click', (e) => this.OnSlotItemClicked(e.target));

        let button = this.shadowRoot.querySelector(".navigation-element .theme-container .btn");
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            if (toggleTheme == false) {
                button.querySelector(".dropdown div").style.display = "none";
                toggleTheme = true;
            } else {
                button.querySelector(".dropdown div").style.display = "flex";
                toggleTheme = false;
            }

        });
        let dropdown = this.shadowRoot.querySelectorAll(".navigation-element .theme-container button .dropdown-container .dropdown .option");
        dropdown.forEach(elem => elem.addEventListener('click', (e) => {
            e.stopPropagation();
            // console.log("child", e.currentTarget.getAttribute("data-name"));
            let themeSelected = e.currentTarget.getAttribute("data-name");
            switch (themeSelected) {
                case "OS":

                    document.querySelector("html").setAttribute("data-theme", "auto");
                    button.querySelector(".dropdown div").style.display = "none";
                    toggleTheme = true;
                    break;
                case "Light":
                    document.querySelector("html").setAttribute("data-theme", "light");
                    button.querySelector(".dropdown div").style.display = "none";
                    toggleTheme = true;
                    break;
                case "Dark":
                    document.querySelector("html").setAttribute("data-theme", "dark");
                    button.querySelector(".dropdown div").style.display = "none";
                    toggleTheme = true;
                    break;

                default:
                    break;
            }
            // e.target.getAttribute("src");

        }));

        document.addEventListener("click", (event) => {
            // this.shadowRoot.querySelector(".navigation-element .theme-container button .dropdown-container .dropdown .option").contains();

                let isClickInside = button.querySelector(".dropdown div").contains(event.target);

                if (!isClickInside) {
                    button.querySelector(".dropdown div").style.display = "none";
                    toggleTheme = true;
                }
          });


    }

    disconnectedCallback() {
    }
}


window.customElements.define('navigation-menu', Navigation);