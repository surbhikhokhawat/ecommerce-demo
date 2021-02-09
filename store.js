    var totalPrice = 0;
    function addToCart(e)
    {
        var itemName=e.parentNode.querySelector(".item-name").innerHTML;
        var itemPrice = e.parentNode.querySelector(".item-price").innerHTML;
        var itemQty = e.parentNode.querySelector(".qty").value;
        console.log(itemQty);
        totalPrice =totalPrice + itemPrice * itemQty;
        console.log(totalPrice);
        $("#cart").append("<div class='product'><img src='"+e.parentNode.parentNode.querySelector(".item-img").src+"'><div class='product-info'><h2 class='product-name'>"+itemName+"</h2><h4 class='product-price'>"+itemPrice+"</h4><h5 class='product-offer'></h5><p class='product-quantity'>Qnty: <input value='"+itemQty+"' name=''></p><p class='product-remove'><i class='fa fa-trash' aria-hidden='true'></i><span class='remove'>Remove</span></p></div></div>"
        )
        document.getElementById("total-price").innerHTML = totalPrice;
    }
