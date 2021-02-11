var cart = {};
cart.total_price = 0.0;
cart.items = [];

var isLoggedin = false

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
        var vegetablesSection = $('#vegetables');
        vegetablesSection.append("<div class='items categories' id=" + item.id + "><div class='images'><img src='" + item.img_src + "' class='item-img'></div><div class='description'><b><span class='item-name'>" + item.name + "</span></b><br> <div class='item-select'>Price : Rs.<span class='item-price'>" + item.price + "</span>/1kg</div><br><button class='buynow-btn' onclick='addToCart(" + item.id + ")'>Add to Cart</button></div></div>")
    })
}


function addToCart(item_id) {
    let get_selected_items = products.filter(function (item) { return item.id == item_id })
    if (get_selected_items.length > 0) {
      let selected_item = get_selected_items[0];
      let alreadyAdded = cart.items.findIndex((item) => {
        return item.id == selected_item.id;
      })
      if (alreadyAdded != -1) {
        cart.items[alreadyAdded].qty += 1
        cart.total_price += parseFloat(cart.items[alreadyAdded].price)
        console.log(cart);
      } else {
        console.log(selected_item);
        let item = {
            "id": selected_item.id,
          "name": selected_item.name,
          "qty": 1,
          "price": selected_item.price,
          "img_src": selected_item.img_src
        }
        cart.items.push(item);
        cart.total_price += parseFloat(selected_item.price);
      }
    }
  }

  function changeqty(mode, id) {
    let alreadyAdded = cart.items.findIndex((item) => {
        return item.id == id;
      })
      if (alreadyAdded != -1) {
        if (mode === 1) {
            cart.items[alreadyAdded].qty += 1
            cart.total_price += parseFloat(cart.items[alreadyAdded].price)
        } else {
            cart.items[alreadyAdded].qty -= 1
            cart.total_price -= parseFloat(cart.items[alreadyAdded].price)
        }
        $('#totalPrice').html(cart.total_price);
    $('#totalItems').html(cart.items.length);
    $('#qty'+ id).html(cart.items[alreadyAdded].qty)
    }
  }

function openCart(e) {
    var cartSection = $('#cartItem');
    console.log(cart)
    cartSection.empty()
    $('#totalPrice').html(cart.total_price);
    $('#totalItems').html(cart.items.length);
    $.each(cart.items, function (index, item) {
        cartSection.append("<div class='items categories' id=" + item.id + "><div class='images'><img src='" + item.img_src + "' class='item-img'></div><div class='description'><b><span class='item-name'>" + item.name + "</span></b><br> <div class='item-select'>Price : Rs.<span class='item-price'>" + item.price + "</span>/1kg</div><br> <div class='item-select'>Qty : <span onclick='changeqty(0, " + item.id + ")'> - </span> <span id='qty"+ item.id +"'>" +item.qty + "</span><span onclick='changeqty(1, " + item.id + ")'> + </span> </div><br></div></div>")
    })
    console.log(cart)   
}

$("#login-form").submit(function(e) {
    e.preventDefault();
});
  
  function login() {
      let username = $("#login-username").val()
      let password = $("#login-password").val()
      if (username === "surbhi" && password === "12345678") {
 isLoggedin =  username 
      } else { 
          alert("Wrong Id/Pass")
      }
      console.log(isLoggedin)
  }

  function checkLogin() {
      if (isLoggedin === false) {
          $('#login-reg').click()
      }
  }