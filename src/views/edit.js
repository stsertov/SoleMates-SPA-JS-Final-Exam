import { get, put } from "../api.js";
import { html } from "../lib.js";

let url = '/data/shoes/'; // +id


const editTemplate = (merch, onSubmit) => html`<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${merch.brand} />
            <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${merch.model} />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${merch.imageUrl} />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${merch.release} />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${merch.designer} />
            <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${merch.value} />

            <button type="submit">post</button>
        </form>
    </div>
</section>`

export async function editView(ctx) {
    let merch = await get(url + ctx.params.merchId);
    ctx.render(editTemplate(merch, onSubmit));

    console.log(merch);

    async function onSubmit(ev) {
        ev.preventDefault();
        let merchId = ctx.params.merchId;

        let formData = new FormData(ev.target);

        let brand = formData.get('brand');
        let model = formData.get('model');
        let imageUrl = formData.get('imageUrl');
        let release = formData.get('release');
        let designer = formData.get('designer');
        let value = formData.get('value');


        if (brand == '' ||
            model == '' ||
            imageUrl == '' ||
            release == '' ||
            designer == '' ||
            value == '') {
            return alert('All fields are required!');
        }


        let merch = {
            brand,
            model,
            imageUrl,
            release,
            designer,
            value
        };

        await put(url + merchId, merch);
        ctx.page.redirect('/dashboard/' + merchId);
    }

}