
let _nextPage = "frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";

async function getProducts(){
    const result = await fetch(`https://${_nextPage}`);
    return result.json();
};

//build product card
function productCard(product){
    let currencyBrOldPrice = product.oldPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let currencyBrPrice = product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let currencyBrPInstallments = product.installments.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    return `
                <div class="product-image">
                    <img class="image" src="http:${product.image}" alt="product">
                </div>
                <h1>${product.name}</h1>
                <p>${product.description}</p>
                <p>De: ${currencyBrOldPrice}</p>
                <span>Por: ${currencyBrPrice}</span>
                <p>ou ${product.installments.count}x de ${currencyBrPInstallments}</p>
                <button class="btn-buy" type="button">Comprar</button>
    `
}

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

// after page loads will show the products 
window.onload = async function onPageLoad(){
    loadMoreProducts();
}

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

function submitUserMainForm(event){
    event.preventDefault();
    userMainForm.name = document.querySelector("#register-first-name").value;
    userMainForm.email = document.querySelector("#register-email").value;
    userMainForm.cpf = document.querySelector("#register-cpf").value;
    if(!validateCpf(userMainForm.cpf)){
        return document.querySelector("#validate-cpf").textContent = "CPF inválido";
        //add code to predict delete invalid text
    };
    userMainForm.gender = document.querySelector('input[name="gender"]:checked').value;    
}
