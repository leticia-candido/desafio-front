
let _nextPage = "frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";

let userMainForm = {
    name:"",
    email:"",
    cpf:"",
    gender:"",
}
let userFriendForm = {
    name:"",
    email:"",
}

// after page loads will show the products 
window.onload = async function onPageLoad(){
    loadMoreProducts();
}

/**
 * Get Products
 * Fetch API for products and returns it as JSON
 * @returns JSON product list
 */
async function getProducts(){
    const result = await fetch(`https://${_nextPage}`);
    return result.json();
};

/**
 * Product Card
 * Render product card html based on given product
 * @param {Object} product 
 * @returns html string
 */
function productCard(product){
    let currencyBrOldPrice = product.oldPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let currencyBrPrice = product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let currencyBrPInstallments = product.installments.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    return `
                <div class="product-image">
                    <img class="image" src="http:${product.image}" alt="product">
                </div>
                <div class="product-content">
                <h1>${product.name}</h1>
                <p class="description">${product.description}</p>
                <p class="old-price">De: ${currencyBrOldPrice}</p>
                <span class="price">Por: ${currencyBrPrice}</span>
                <p class="installments">ou ${product.installments.count}x de ${currencyBrPInstallments}</p>
                <button class="btn-buy" type="button">Comprar</button>
                </div>
    `
}

/**
 * Load More Products
 * Fetch the product list on the API and renders it on DOM
 * @returns void
 */
async function loadMoreProducts(){

    if (_nextPage === null) {
        document.querySelector('#loadMore').textContent = "Não há mais produtos";
        return false;
    }

    const {products, nextPage} = await getProducts();
    
    _nextPage = nextPage;

    products.forEach(element => {
        const child = document.createElement('div');
        child.classList.add('products-content');
        child.innerHTML = productCard(element);
        document.querySelector('#products-container').appendChild(child);
    });
}

/**
 * Submit User Main Form 
 * Validates and gets the inputed data from user main form and submit it
 * @param {DOM Event} event 
 * @returns void
 */
function submitUserMainForm(event){
    event.preventDefault();

    userMainForm.name = document.querySelector("#register-first-name").value;
    userMainForm.email = document.querySelector("#register-email").value;
    userMainForm.cpf = document.querySelector("#register-cpf").value;
    
    if(!validateCpf(userMainForm.cpf)){
        document.querySelector("#validate-cpf").textContent = "CPF inválido";
        return;
    }

    document.querySelector("#validate-cpf").textContent = "";

    userMainForm.gender = document.querySelector('input[name="gender"]:checked').value;    

    const submitUserButton = document.querySelector("#user-form-submit");
    submitUserButton.textContent = "Enviado!";
    submitUserButton.disabled = true;

    const userForm = document.querySelector("#user-form");

    const inputs = userForm.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.disabled = true;
    });
}

/**
 * Submit Friend Form 
 * Validates and gets the inputed data from friend form and submit it, only after user main form is filled.
 * @param {DOM Event} event 
 * @returns void
 */
function submitFriendForm(event){
    event.preventDefault();

    if (!userMainForm.name || !userMainForm.gender) {
        document.querySelector('#friend-form-msg').textContent = "Preencha o formulário principal";
        return
    }

    document.querySelector('#friend-form-msg').textContent = "";

    userFriendForm.name = document.querySelector("#register-friend-name").value;
    userFriendForm.email = document.querySelector("#register-friend-email").value;

    const friendSubmitButton = document.querySelector('#friend-form-submit');
    friendSubmitButton.textContent = 'Enviado!'
    friendSubmitButton.disabled = true;

    setTimeout(() => {
        friendSubmitButton.textContent = 'Enviar agora'
        friendSubmitButton.disabled = false;
        
        const friendForm = document.querySelector("#friend-form");
        const inputs = friendForm.querySelectorAll('input');

        inputs[0].focus();
        
        inputs.forEach(input => {
            input.value = "";
        });

    }, 3000);

}



