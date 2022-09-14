const template = document.createElement('template');
template.innerHTML = `
<style>

.navigation-element {
    display :flex;
    flex-direction:row;
    width:100%;
    height:7rem;
    align-items: center;
    background-color: var(--navigation-background);
}

.navigation-element .navigation-logo {
   display:flex;
   flex-direction:row;
   flex-basis:60%;
   padding:0;
   margin :0;
   max-height:100%;
}

.navigation-element ul{
    padding:0;
    margin :0;
    list-style: none;
    display : flex;
    flex-direction:row;
    flex-basis:40%;
    justify-content: space-evenly;
}

.navigation-element .navigation-logo img{ 
    padding:0;
    margin :0;
    max-width:25%; 
    max-height:100%;
}

</style>


<div class="navigation-element">
        <div class="navigation-logo">
            <img src="images/logo.png"  customPath="/" />
        </div>
        <ul>
            <slot name="item">

            </slot>
        </ul>
</div>
`;
{/* <span> <slot name="item"> </span> */ }

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