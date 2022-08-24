import { get } from '../api.js';
import { html, render as litRender } from '../lib.js';
import { getUserData } from '../utility.js';

//let url = `/data/shoes?where=brand%20LIKE%20%22${query}%22`

const searchTemplate = (onSubmit) => html`<section id="search">
    <h2>Search by Brand</h2>

    <form class="search-wrapper cf" @submit=${onSubmit}>
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>

    <div id="search-container">

        <!-- Display an h2 if there are no posts -->
    </div>
</section>`




let emptyResult = () => html`<h2>There are no results found.</h2>`;

let merchTemplate = (merch, userIsLogged) => html` <ul class="card-wrapper" >
<!-- Display a li with information about every post (if any)-->
    ${merch.map(m => singleMerch(m, userIsLogged))}
</ul>`;

let singleMerch = (merch, userIsLogged) => html`<li class="card">
<img src="${merch.imageUrl}" alt="travis" />
<p>
    <strong>Brand: </strong><span class="brand">${merch.brand}</span>
</p>
<p>
    <strong>Model: </strong><span class="model">${merch.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${merch.value}</span>$</p>
<a class="details-btn" href="/dashboard/${merch._id}" style="display:${userIsLogged ? 'inline' : 'none'}">Details</a>
</li>`;


export function searchView(ctx) {
    ctx.render(searchTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        let userData = getUserData();
        let userIsLogged = userData != undefined ? true : false;

        let query = (new FormData(ev.target)).get('search');

        if (query != '') {

            let parent = document.getElementById('search-container');
            let merch = await get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);

            if (merch && merch.length > 0) {
                litRender(merchTemplate(merch, userIsLogged), parent);
            } else {
                litRender(emptyResult(), parent);
            }
        }
    }
}