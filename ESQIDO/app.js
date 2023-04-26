$(document).ready(function () {
    $(".shop").click(function () {
        $(".error").html("An Error Occured, Kindly Locate The Accessories Page");
        $(".error").css("color", "red");
    });
    $("#signuponhome").click(function () {
        if ($("#footer-email").val() !== undefined && $("#footer-email").val() !== "") {
            $("#footer-email").css("display", "none");
            $("#signuponhome").css("display", "none");
            $("#error2").css("color", "green");
            $("#error2").html("Thanks for subscribing! 😁");
        } else {
            $("#footer-email").css("display", "none");
            $("#signuponhome").css("display", "none");
            $("#error2").css("color", "red");
            $("#error2").html("Kindly subscribe to recieve promo offers and updates! 🙂");
        }
    });
    $(".rewards-container").css("display", "none");
    $("#rewards").click(function () {
        $(".rewards-container").toggle();
        $("#first-x").click(function () {
            $(".rewards-container").fadeOut(200);
        });
    });
    function moveToSelected(element) {
        var selected, next, prev, prevSecond, nextSecond;

        if (element == "next") {
            selected = $(".selected").next();
        } else if (element == "prev") {
            selected = $(".selected").prev();
        } else {
            selected = element;
        }

        next = $(selected).next();
        prev = $(selected).prev();
        prevSecond = $(prev).prev();
        nextSecond = $(next).next();

        $(selected).removeClass().addClass("selected");

        $(prev).removeClass().addClass("prev");
        $(next).removeClass().addClass("next");

        $(nextSecond).removeClass().addClass("nextRightSecond");
        $(prevSecond).removeClass().addClass("prevLeftSecond");

        $(nextSecond).nextAll().removeClass().addClass("hideRight");
        $(prevSecond).prevAll().removeClass().addClass("hideLeft");
    }

    // Eventos teclado
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
                moveToSelected("prev");
                break;

            case 39: // right
                moveToSelected("next");
                break;

            default:
                return;
        }
        e.preventDefault();
    });

    $("#carousel div").click(function () {
        moveToSelected($(this));
    });

    $("#prev").click(function () {
        moveToSelected("prev");
    });

    $("#next").click(function () {
        moveToSelected("next");
    });

    $("#chatbox").click(function () {
        $(".chat-container").css("display", "block");
        $(".chat").toggle();
    });

    $("#send-button").click(function () {
        // get message input value
        var message = $("#input-message").val();

        // append message to messages container
        $("#messages-container").append("<p>" + message + "</p>");

        // clear message input
        $("#input-message").val("");
    });

    // $.ajax({
    //     url: 'data.json',
    //     method: 'get',
    //     dataType: 'json',
    //     success: function (response) {
    //         $.map(response.products, function (value, index) {
    //             let product = ` <div data-id=${value.id}>
    //         <p>Product Name:${value.name}</p>
    //         <p>price:${value.price}</p>
    //         <input type="number" id="quantity" placeholder="Enter the Quantity">
    // <button data-name=${value.name} data-price=${value.price} class="addTocart">Add to cart</button>

    //       </div>`;

    //             $('#products').append(product);
    //         });
    //     },
    //     error: function (err) {
    //         alert('server error');
    //     },
    // });


    //Shop Page jQuery
    $.ajax({
        type: "GET",
        url: "http://159.65.21.42:9000/products",
        success: function (response) {
            $(response).each(function (i, data) {
                if (data.category === "esquido") {
                    console.log([data].length);
                    let result = `
                        <div class="product">
                    <a href='singleProduct.html?id=${data._id}'}>
                        <img src='http://159.65.21.42:9000${data.image}' alt="Image" />
                        <h3>${data.name}</h3>
                        <p>${data.description}</p>
                        <h4>₦${data.price}</h4>
                    </a>
                    </div>`;
                    $("#productsContainer").append(result);
                }
            });
        },
        error: function (error) {
            console.log(error);
        },
    });

    // Single Page jQuery
    let url = window.location.search;
    let urlParams = new URLSearchParams(url);
    let id = urlParams.get("id");
    $.ajax({
        type: "GET",
        url: `http://159.65.21.42:9000/product/${id}`,
        success: function (data) {
            let result = `
                <div class="details">
                    <img src="http://159.65.21.42:9000${data.image}" alt="product"/>
                    <div>
                        <h2>${data.name}</h2>
                        <p>${data.description}</p>
                        <h3>₦${data.price}</h3>
                    </div>
                </div>
            `;
            $(".singleProduct").append(result);
            // Cart Jquery
            // Add event listener to button
            $("#Add").click(function (e) {
                e.preventDefault();
                let cartItem = { id: id, quantity: $("#Quantity").val() };
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push(cartItem);
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Item added to cart!");

                // Navigate to cart page
                window.location.href = "cart.html";
            });

            // On the cart page
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.forEach(function (cartItem) {
                $.ajax({
                    type: "GET",
                    url: `http://159.65.21.42:9000/product/${cartItem.id}`,
                    success: function (data) {
                        let result = `
                            <div class="Grid-products-container">
                                <div class="productsContainer">
                                    <img src="http://159.65.21.42:9000${data.image}" alt="Image">
                                    <p class="company">${data.name}</p>
                                    <select name="Quantity" class="quantity">
                                        <option value="0"></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3" selected>3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6/option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value=${data.quantity}>${data.quantity}</option>
                                    </select>
                                    <div class="end">
                                        <i class="bi bi-x deleteFromCart" data-id="${data.id}"></i>
                                    </div>
                                </div>
                                <hr>
                            </div> 
                        `;
                        $(".cart-main").append(result);
                    },
                    error: function (error) {
                        console.log(error);
                        if ($(".cart-main").children().length == 0) {
                            $(".cart-main").append('<p id="condition">Your Cart Is Empty</p>');
                        }
                    }
                });
            });
            
            // Add a click event listener to the document that listens to clicks on delete buttons with class "deleteFromCart"
            $(document).on("click", ".deleteFromCart", function () {
                // Get the id of the product to delete
                let productId = $(this).data("id");
            
                // Remove the item from the cart
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let index = cart.findIndex(item => item.id === productId);
                if (index > -1) {
                    cart.splice(index, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
            
                // Remove the product container from the cart page
                $(this).closest(".Grid-products-container").remove();
            
                // Display a message if the cart is empty
                if (cart.length === 0) {
                    $(".cart-main").append('<p id="condition">Your Cart Is Empty</p>');
                }
            });
            


        },

    });



    $(".product-1").click(function () {
        window.location.href = "eyelash.html";
    });

    $(".product-2").click(function () {
        window.location.href = "login.html";
    });

    $(".product-3").click(function () {
        window.location.href = "login.html";
    });

    $(".product-4").click(function () {
        window.location.href = "login.html";
    });

    $(".product-5").click(function () {
        window.location.href = "login.html";
    });

    $("#col-1").click(function () {
        $(this).addClass("borderClass").fadeOut(2000);
    });

    $("#col-2").click(function () {
        $(this).addClass("borderClass").fadeOut(2000);
    });

    $("#col-3").click(function () {
        $(this).addClass("borderClass").fadeOut(2000);
    });

    $("#col-4").click(function () {
        $(this).addClass("borderClass").fadeOut(2000);
    });

    $(".body").css("display", "none");
    $("#down").click(function () {
        $(".body").toggle();
        $(".body").css("transition", "0.2s");
    });

    $(".body-2").css("display", "none");
    $("#down-2").click(function () {
        $(".body-2").toggle();
        $(".body-2").css("transition", "0.2s", "ease-in-out");
    });

    // Add To Cart Button Manipulations 

    // if ($("#cart-main").children().length == 0) {
    //     $("#cart-main").append('<p id="condition">Your Cart Is Empty</p>');
    //     // $("#cart-main").css("paddingTop", "120px");
    // }
    // $("#cartAdder").on("click", function () {
    //     window.location.href = "cart.html";
    //     cartItems();
    // });

});