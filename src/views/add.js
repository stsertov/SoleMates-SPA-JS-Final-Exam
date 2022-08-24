
import { post } from "../api.js";
import { html } from "../lib.js";

let url = '/data/shoes';

const addTemplate = (onSubmit) => html`<section id="create">
    <div class="form" @submit=${onSubmit}>
        <h2>Add item</h2>
        <form class="create-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
            <input type="text" name="model" id="shoe-model" placeholder="Model" />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
            <input type="text" name="value" id="shoe-value" placeholder="Value" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`

export function addView(ctx) {
    ctx.render(addTemplate(onSubmit));


    async function onSubmit(ev) {
        ev.preventDefault();


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

        await post(url, merch);
        ctx.page.redirect('/dashboard');
    }

}