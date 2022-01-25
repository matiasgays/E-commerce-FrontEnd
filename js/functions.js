let productsList = [];
let cart = [];

const saveCart = (key, value) => {localStorage.setItem(key, value)};
const uploadCart = () => {
    if (localStorage.getItem("cart") !== null) {
        let cartUploaded = JSON.parse(localStorage.getItem("cart"));
        for (const itemUploaded of cartUploaded) {
            cart.push(itemUploaded);    
        }
        $(`#number-shopping-cart`).html(cart.length).show();
    }
}

const uploadJSON = () => {
    const URLJSON = "products.json";
    $.getJSON(URLJSON, function(response, status) {
        if(status === "success") {
            productsList = response;
            renderProducts($(`#products-vehicle`).val());
        }
        else(`Error: JSON Data not found`);
    })
}

const renderProducts = (x) => {
    let productsFiltered;
    if(x == ''){
        productsFiltered = productsList;
    }
    else{
        productsFiltered = productsList.filter(option => {return option.vehicle == x});
    }
    $(`#products-container`).html("");
    productsFiltered.forEach(product => {
        $(`#products-container`).append( 
            `<div class="products-product">
                <img class="size-small" src="${product.img}">
                <h3>${product.name}</h3>
                <h4>${product.brand}</h4>
                <h4>$${product.price}</h4>
                <div id="btn-container">
                    <button id=${product.sku} class="btn">Comprar</button>
                </div>
            </div>`);
    })
}

const addCart = e => {
    if(e.target.classList.contains('btn')){
        let productChosen = productsList.find(product => product.sku == e.target.id);
        cart.push(productChosen),
        updateLocalStorage();
    }
}

const filterSelected = (e) => {
    e.preventDefault();
    renderProducts($(`#products-vehicle`).val());
}

const fadeInCart = (e) => {
    e.preventDefault();    
    $(`#grid`).html("");
    console.log(cart);
    let newCart = [...new Set(cart)];
    console.log(newCart);
    newCart.forEach((item) => {
        const quantity = cart.reduce((num, itemSKU) => {
            return itemSKU === item ? num += 1 : num;
        }, 0);
        $(`#grid`).append(`
            <div id="grid-container">
                <div class="grid-item item1"><img class="size-thumbnail" src="${item.img}"></div>
                <div class="grid-item item2">${quantity} x ${item.name}</div>
                <div class="grid-item item3">$${item.price}</div>
                <div class="grid-item item4">
                    <button id=${item.sku} class="btn">X</button>
                </div>
            </div>`);
    });
    $("#grid").css("top",(e.pageY+5)+"px")
              .css("left",(e.pageX-250)+"px")					
              .fadeIn("slow");
}

const fadeOutCart = (e) => {
    e.preventDefault();
    $("#grid").fadeOut("fast");
}

const removeItem = (e) => {
    if(e.target.classList.contains('btn')){
       cart = cart.filter((item) => {
            return item.sku != e.target.id});
    }
    updateLocalStorage();
}

const updateLocalStorage = () => {
    localStorage.clear();
    saveCart(`cart`,JSON.stringify(cart));
    $(`#number-shopping-cart`).html(cart.length).show();
}