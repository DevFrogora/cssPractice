import {LoadFileToText} from "../modules/Loader.js";

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
    console.log(route);
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();


class Navigation extends HTMLElement {
    constructor() {
        super();
        console.log("constructor")
    }

    OnSlotItemClicked(e) {
        route(e);
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // this.shadowRoot.querySelector('span').innerHTML = this.getAttribute('name');
        this.shadowRoot.querySelector('img').
            addEventListener('click', (e) => this.OnSlotItemClicked(e.target));

        this.shadowRoot.querySelector('slot').
            addEventListener('click', (e) => this.OnSlotItemClicked(e.target));

        console.log("connectedCallback")
    }

    disconnectedCallback() {
        console.log("disconnectedCallback")
    }

}


window.customElements.define('navigation-menu', Navigation);