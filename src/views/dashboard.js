import { get } from "../api.js";
import { html } from "../lib.js";



let url = '/data/shoes?sortBy=_createdOn%20desc';

const dashboardTemplate = (merchs) => html`<section id="dashboard">
  <h2>Collectibles</h2>
  <ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
    ${merchs.map(singleCollectible)}    
  </ul>`


const emptyDashboard = () => html`<section id="dashboard">
  <h2>Collectibles</h2>
  <!-- Display an h2 if there are no posts -->
  <h2>There are no items added yet.</h2>
</section>
`

let singleCollectible = (merch) => html`<li class="card">
  <img src=${merch.imageUrl} alt="travis" />
  <p>
    <strong>Brand: </strong><span class="brand">${merch.brand}</span>
  </p>
  <p>
    <strong>Model: </strong><span class="model">${merch.model}</span>
  </p>
  <p><strong>Value:</strong><span class="value">${merch.value}</span>$</p>
  <a class="details-btn" href="/dashboard/${merch._id}">Details</a>
</li>`


export async function dashboardview(ctx) {

  let merchs = await get(url);

  console.log(merchs);

  if (merchs.length > 0) {
    ctx.render(dashboardTemplate(merchs)); 
  } else {
    ctx.render(emptyDashboard());
  }
}