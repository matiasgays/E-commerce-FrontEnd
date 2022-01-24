$(document).ready(uploadJSON(),uploadCart());
$(`#products-container`).click(addCart);
$(`#icon-shopping-cart`).hover(
    fadeInCart
    , function() {
        $(document).click(fadeOutCart);
        $(`#grid`).mouseleave(fadeOutCart);
    }
);
$(`#products-vehicle`).change(filterSelected);
$(`#grid`).click(removeItem);