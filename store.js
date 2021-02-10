var cart = {};
cart.total_price = 0.0;
cart.items = [];

var products = []

$.ajax({
    url: 'assets/data.json',
    dataType: 'json',
    success: function (data) {
        loadData(data)
    },
    error: function (err) {
        alert(err);
    }
})

function loadData(jsonData) {
    products = jsonData;
    $.each(products, function (index, item) {
        var vegetablesSection=$('#vegetables');
        vegetablesSection.append("<div class='items categories' id="+item.id+"><div class='images'><img src='"+item.img_src+"' class='item-img'></div><div class='description'><b><span class='item-name'>"+item.name+"</span></b><br> <div class='item-select'>Price : Rs.<span class='item-price'>"+item.price+"</span>/1kg</div><br><button class='buynow-btn' onclick='addToCart("+item.id+");this.disabled=true'>Add to Cart</button></div></div>")
    })
} 

function addToCart(item_id) {
    let get_selected_items = products.filter( function(item) {return item.id == item_id })
    if(get_selected_items.length > 0) {
        let selected_item = get_selected_items[0];
        console.log(selected_item);
        let item = {
            "name": selected_item.name,
            "qty": 1,
            "price": selected_item.price,
            "img_src": selected_item.img_src
        }
        cart.items.push(item);
        cart.total_price += parseFloat(get_selected_items[0].price); 
    }
}

function openCart(e) {
    var cartSection = $('#cartItem');
    $('#totalPrice').html(cart.total_price);
    $('#totalItems').html(cart.items.length);
    $.each(cart.items, function(index, item){
        cartSection.append("<p>"+ item.name +"</p>")
        cartSection.append("<p>"+ item.price +"</p>")
        cartSection.append("<p>"+ item.img_src +"</p>")
    })
    console.log(cart)
}