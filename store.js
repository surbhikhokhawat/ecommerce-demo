var cart = {};
cart.total_price = 0.0;
cart.items = [];
var isLoggedin = false
var products = []
localStorage.removeItem("email")


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
        if (alreadyAdded >= 0) {
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
        $('#qty' + id).html(cart.items[alreadyAdded].qty)
    }
}
function openCart(e) {
    var cartSection = $('#cartItem');
    console.log(cart)
    cartSection.empty()
    $('#totalPrice').html(cart.total_price);
    $('#totalItems').html(cart.items.length);
    $.each(cart.items, function (index, item) {
        cartSection.append("<div class='items categories adjust-card' id=" + item.id + "><div class='images'><img src='" + item.img_src + "' class='item-img'></div><div class='description'><b><span class='item-name'>" + item.name + "</span></b><br> <div class='item-select'>Price : Rs.<span class='item-price'>" + item.price + "</span>/1kg</div><br> <div class='item-select'>Qty : <span class='inc-dec' onclick='changeqty(0, " + item.id + ")'>-</span> <span id='qty" + item.id + "'>" + item.qty + "</span><span class='inc-dec' onclick='changeqty(1, " + item.id + ")'>+</span> </div><br></div></div>")
    })
    console.log(cart)
}
$("#login-form").submit(function (e) {
    e.preventDefault();
});

function login() {
    let username = $("#login-username").val()
    let password = $("#login-password").val()
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let x = re.test(password);
    console.log(x)
    if (username.includes("@") && username.includes(".") && x)
     {
        console.log('asd')
        isLoggedin = username
        $("#exampleModalCenter").modal('show');
        $(".bd-example-modal-sm").modal('hide');
        localStorage.setItem("email", username)
        $('#openCartBtn').click()
    } else {
        alert("password must contain atleast/more than 5 characters")
    }

    console.log(isLoggedin)
}

function checkLogin() {
    var email = localStorage.getItem("email")
    console.log(email)
    if (email == null) {
        $('#login-reg').click()
    }
    else {
        Payment()
    }
}
var $total = 100;
var $total2 = 100;
function Discount() {
    let disc_amt = $('#discount-code1').val()
    var disc = cart.total_price * disc_amt / 100
    cart.total_price -= disc
    cart.total_price = cart.total_price.toFixed(2)
    console.log(cart.total_price, disc)
    $('#totalPrice').html(cart.total_price);
}
function Payment() {
    var options = {
        "key": "rzp_test_i7LAD00NwZFOmd",
        "amount": cart.total_price, // Example: 2000 paise = INR 20
        "name": "Surbhi Khokhawat",
        "description": "This is a small demo",
        "image": "./assets/images/payment-logo/razorpay-2.png",// COMPANY LOGO
        "handler": function (response) {
            console.log(response);
            // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
        },
        "prefill": {
            "name": "", // pass customer name
            "email": '',// customer email
            "contact": '' //customer phone no.
        },
        "notes": {
            "address": "" //customer address 
        },
        "theme": {
            "color": "#15b8f3" // screen color
        }
    };
    console.log(options);
    var propay = new Razorpay(options);
    propay.open();
}
var modal = document.getElementById('id01');
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




