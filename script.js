
// let nextPage = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
//page = 1 inicia sempre na pagina 1
// async await é melhor do que then para leitura e por ser mais atual
async function getProducts(){
    const result = await fetch("https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1");
    return result.json();
};

//build product card
function productCard(product){
    return `<div class="products-content">
                <div class="product-image">
                    <img src="http:${product.image}" alt="product">
                </div>
            </div>
    `
}

// after page loads will show the products 
window.onload = async function onPageLoad(){
    // console.log(await getProducts())
    const {products} = await getProducts(); //desestruturou products para pegar o array
    products.forEach(element => {
        const child = document.createElement('div')
        child.innerHTML = productCard(element);
        document.querySelector('#products-container').appendChild(child);
    });
   
}


// function loadMoreProducts(){
//     nextPage = `https://${jsonResult.nextPage}`;
// }
