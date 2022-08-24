import { login, register, logout } from './user.js';
import { getUserData } from './utility.js'
import { page, render as litRender } from './lib.js';
import { get, remove } from './api.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { dashboardview } from './views/dashboard.js';
import { addView } from './views/add.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { searchView } from './views/search.js';

let mainElement = document.querySelector('main');
let logoutBtn = document.querySelector('#logoutBtn');
logoutBtn.addEventListener('click', logoutUser);

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/dashboard', dashboardview);
page('/add', addView);
page('/dashboard/:merchId', detailsView);
page('/edit/:merchId', editView);
page('/delete/:merchId', deleteMerch);
page('/search', searchView);

checkUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.checkUserNav = checkUserNav;
    next();
}

function renderMain(templateResult) {
    return litRender(templateResult, mainElement);
}

function checkUserNav() {
    let userData = getUserData();
    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}


function logoutUser() {
    logout();
    page('/');
    checkUserNav();
}


async function deleteMerch(ctx) {
    let confirmDialog = confirm('Are you sure?');

    if (confirmDialog) {

        await remove('/data/shoes/' + ctx.params.merchId);
        ctx.page.redirect('/dashboard');
    }

}