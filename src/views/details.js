import { get, post } from "../api.js";
import { html } from "../lib.js";
import { getUserData } from "../utility.js";

let url = '/data/shoes/'; // + id


const detailsTemplate = (merch, userData) => html`<section id="details">
<div id="details-wrapper">
  <p id="details-title">Shoe Details</p>
  <div id="img-wrapper">
    <img src="${merch.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${merch.brand}</span></p>
    <p>
      Model: <span id="details-model">${merch.model}</span>
    </p>
    <p>Release date: <span id="details-release">${merch.release}</span></p>
    <p>Designer: <span id="details-designer">${merch.designer}</span></p>
    <p>Value: <span id="details-value">${merch.value}</span></p>
  </div>

  <!--Edit and Delete are only for creator-->
  <div id="action-buttons" style="display:${merch._ownerId == userData.userId ? 'block' : 'none'}">
    <a href="/edit/${merch._id}" id="edit-btn">Edit</a>
    <a href="/delete/${merch._id}" id="delete-btn">Delete</a>
  </div>
</div>
</section>`


export async function detailsView(ctx) {
    let userData = getUserData();
    let merchId = ctx.params.merchId;
    let merch = await get(url + merchId);

    ctx.render(detailsTemplate(merch, userData));
}