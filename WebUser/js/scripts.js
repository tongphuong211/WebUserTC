function IndexJs() {
    $(".banner-owl").owlCarousel({
        loop: true,
        nav: false,
        animateOut: "fadeOut",
        smartSpeed: 300,
        navText: ["<i class='fal fa-angle-left'></i>", "<i class='fal fa-angle-right'></i>"],
        autoplay: false,
        autoplayTimeout: 7000,
        items: 1
    });
}

function ProductDetailJs() {
    $(".product-gallery").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.thumb-nav'
    });
    $(".thumb-nav").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-gallery',
        dots: false,
        focusOnSelect: true,
        prevArrow: '<div class="slick-prev"><i class="fal fa-angle-left"></i></div>',
        nextArrow: '<div class="slick-next"><i class="fal fa-angle-right"></i></div>'
    });
    $('[data-fancybox="gallery"]').fancybox({
        protect: true,
        loop: true,
        buttons: [
            'zoom',
            'slideShow',
            'close'
        ],
        animationEffect: "zoom-in-out",
        animationDuration: 366,
        transitionEffect: "tube",
        zoomOpacity: "auto"
    });
    $("#orderQuantity").on("change",
        function (e) {
            var quantity = $(this).val();
            var price = $("[name=productPrice]").val();
            var total = quantity * price;
            $("#total").text(total);
        });
    //$('#orderQuick').niceNumber({
    //    onDecrement: function (input, number, object) {
    //        var price = $("[name=productPrice]").val();
    //        var total = number * price;
    //        $("#total").text(total);
    //        return false;
    //    },
    //    onIncrement: function (input, number, object) {
    //        var price = $("[name=productPrice]").val();
    //        var total = number * price;
    //        $("#total").text(total);
    //        return false;
    //    },
    //});
}

$(function () {
    $(".bars-category").on("click",
        function () {
            $("body").toggleClass("show-category");
        });

    $(".btn-add-review").on("click",
        function () {
            $("#reviews").toggleClass("show-form");
        });

    $(".bars-mobile").on("click", function () {
        $(this).find("i").toggleClass("fa-bars").toggleClass("fa-times");
        $("body").toggleClass("show-menu");
    });

    $(".search-first").on("click",
        function () {
            $(".search-cart").toggleClass("show-form");
        });

    $(".item-list").on("click",
        function () {
            var x = document.getElementById("type-show");
            if (x.className === "row change-type-show") {
                x.className += " show-list";
            } else if (x.className === "row change-type-show show-gallery") {
                x.className = "row change-type-show show-list";
            } else {
                x.className = "row change-type-show show-list";
            }
        });

    $(".item-gallery").on("click",
        function () {
            var x = document.getElementById("type-show");
            if (x.className === "row change-type-show") {
                x.className += " show-gallery";
            } else if (x.className === "row change-type-show show-list") {
                x.className = "row change-type-show show-gallery";
            } else {
                x.className = "row change-type-show show-gallery";
            }
        });

    //$('input[type="number"]').niceNumber();

    var $inputItem = $(".js-inputWrapper");
    $inputItem.length &&
        $inputItem.each(function () {
            var $this = $(this),
                $input = $this.find(".formRow--input"),
                placeholderTxt = $input.attr("placeholder"),
                $placeholder;

            $input.after('<span class="placeholder">' + placeholderTxt + "</span>"),
                $input.attr("placeholder", ""),
                $placeholder = $this.find(".placeholder"),
                $input.val().length ? $this.addClass("active") : $this.removeClass("active"),
                $input.on("focusout",
                    function () {
                        $input.val().length ? $this.addClass("active") : $this.removeClass("active");
                    }).on("focus",
                        function () {
                            $this.addClass("active");
                        });
        });

    $("#subscribe").on("submit",
        function (e) {
            e.preventDefault();
            $.post("subscribe",
                $(this).serialize(),
                function (data) {
                    //alert(data.msg);
                    $.toast({
                        heading: 'Sign Up Success',
                        text: 'We will send your information as soon as possible !!',
                        position: 'right-bottom',
                        icon: 'success',
                    })
                    if (data.status === 0) {
                        $("#subscribe").trigger("reset");
                    }
                });
        });

    $("#orderForm").on("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(document.querySelector("#orderForm"));
        $.ajax({
            url: "/quick-order",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.status) {
                    $("#orderForm").trigger("reset");
                } else {
                    $.toast({
                        heading: 'Order Success !!',
                        icon: 'success'
                    });
                    $("#orderForm").trigger("reset");
                }
            }
        });
    });

    $(".removeLink").click(function () {
        const recordToDelete = $(this).attr("data-id");
        if (recordToDelete !== "") {
            $.post("/ShoppingCart/RemoveFromCart",
                { "id": recordToDelete },
                function (data) {
                    //if (data.Status === "1") {
                    //    $(`[data-row=${recordToDelete}`).fadeOut("slow");
                    //    $(".cart-qty").text(data.CartCount);
                    //    $("#update-message").text(data.Message);
                    //} else {
                    //alert("Sản phẩm được xóa thành công");
                    //var oldCount = +$("#count-cart").html();
                    //$("#count-cart").html(oldCount - data.Status);
                    //$(`tr[data-row=${recordToDelete}]`).remove();
                    $.toast({
                        heading: 'Sản phẩm được xóa thành công !!',
                        position: 'bottom-right',
                        icon: 'success',
                    })
                    window.location.reload();
                    //}
                });
        }
    });

    AOS.init();

    $("#contact_form").on("submit",
        function (e) {
            e.preventDefault();
            $.post("/Home/Contact",
                $(this).serialize(),
                function (data) {
                    if (data.status) {
                        $.toast({
                            heading: 'Contact successfully sent',
                            text: 'We will get back to you as soon as possible !!',
                            icon: 'success',
                        })
                        $("#contact_form").trigger("reset");
                    } else {
                        $.toast({
                            heading: 'Failed to send',
                            text: 'Please enter the true format',
                            icon: 'error',
                        })
                    }
                });
        });

    $("#prod-addreview-form").on("submit", function (c) {
        c.preventDefault();
        $.post("/Home/Rating", $(this).serialize(),
            function (data) {
                if (data.status) {
                    $.toast({
                        heading: 'Evaluation of success',
                        text: 'Thank you for leaving a review !!',
                        icon: 'success'
                    });
                    $("#prod-addreview-form").trigger("reset");
                } else {
                    $.toast({
                        heading: 'Failed to send',
                        text: 'Please enter the true format',
                        icon: 'error'
                    });
                }
            });
    });

    $(".quantity-item").niceNumber({
        onDecrement: function (input, number, object) {
            var monney = document.getElementById("Monney").value;
            const element = $(input).parent().parent();
            const price = $(element).prev().find(".price").data("price") || 0;
            const total = price * number;
            $(element).next().find(".total").html(`${total.toFixed(monney)}`);
            $(element).closest(".quantity-count").find(".btn-add-cart[quantity]").attr("quantity", number);
            return false;
        },
        onIncrement: function (input, number, object) {
            var monney = document.getElementById("Monney").value;
            const element = $(input).parent().parent();
            const price = $(element).prev().find(".price").data("price") || 0;
            const total = price * number;
            $(element).next().find(".total").html(`${total.toFixed(monney)}`);
            $(element).closest(".quantity-count").find(".btn-add-cart[quantity]").attr("quantity", number);
            return false;
        }
    });

    $("[data-action=rate]").on("click", function (e) {
        e.preventDefault();
        const proId = $(this).data("product");
        const rate = $(this).data("rate");
        var $rateElm = $(this);
        $.post("/Home/ProductRate", { proId: proId, rate: rate }, function (data) {
            $.toast(data.msg);
            if (data.status === 0) {
                $rateElm.parent().attr("data-rate-vote", rate);
                $(`[data-rate-result=${proId}]`).text(data.count);
            }
        });
    });
});

function CartJs() {
    $('input[type="number"]').niceNumber({
        onDecrement: function (input, number, object) {
            //UpdateToCard()
            UpdateToCard($(input).attr('id-value'), -1);
            return false;
        },
        onIncrement: function (input, number, object) {
            UpdateToCard($(input).attr('id-value'), 1);
            return false;
        }
    });
}

function UpdateToCard(id, changeValue, message = "Successful shopping cart update !!") {
    $.ajax({
        type: "Post",
        url: "/ShoppingCart/UpdateCartV2",
        data: { productId: id, changeValue },
        success: function (res) {
            if (res) {
                $("#count-cart").html(res.totalItem);
                $("[data-cart-item=" + id + "]").text(res.totalMoneyItem.toFixed(2) + "$");
                $('.cart_total_price .total-price').html(res.totalMoneyString);
                $.toast({
                    heading: message,
                    position: 'bottom-right',
                    icon: 'success'
                });
            }
            else {
                $.toast({
                    heading: 'Somthing errors',
                    position: 'bottom-right',
                    icon: 'error'
                });
            }
        }
    });
}

function AddToCart(id, ele) {
    const quantity = $(ele).attr('quantity') || 1;
    $.ajax({
        type: "Post",
        url: "/ShoppingCart/AddToCartAjax",
        data: { productId: id, quantity },
        success: function (res) {
            if (res) {
                //alert("Thêm vào giỏ hàng thành công !!")
                var oldCount = +$("#count-cart").html();
                $("#count-cart").html(oldCount + 1);
                $.toast({
                    heading: ' Add to cart successfully !!',
                    position: 'bottom-right',
                    icon: 'success',
                })
                //window.location.reload();
            }
            else {
                alert("Add to cart failed");
            }
        }
    });
}

function requestFilter() {
    const saleOff = $('#saleOff').is(':checked');
    const freeShip = $('#freeShip').is(':checked');
    const sort = $('#Sort').val();
    const min = $('.price-select-filter[selected-price]').attr('price-min');
    const max = $('.price-select-filter[selected-price]').attr('price-max');
    const url = `${location.protocol + '//' + location.host + location.pathname}?freeship=${freeShip}&saleoff=${saleOff}&sort=${sort}&min=${min}&max=${max}`;
    window.location.href = url;
}

function selectedPrice(ele) {
    $('.price-select-filter').removeAttr('selected-price');
    $(ele).attr('selected-price', true);
    requestFilter();
}

function checkOut(orderCode) {
    var total;
    $.when($.get("/cart/get-order-total", { orderCode: orderCode }, function (returnData) {
        if (returnData === 0) {
            alert("This order is invalid.");
            return false;
        }
        total = returnData;
    })).then(function () {
        paypal.Buttons({
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: total,
                                currency_code: "USD"
                            }
                        }
                    ]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    alert(details.status);
                    if (details.status === "COMPLETED") {
                        return fetch('/cart/paypal-transaction-complete',
                            {
                                method: 'post',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    orderCode: orderCode,
                                    paypalId: data.orderID
                                })
                            }).then(function (result) {
                                window.location.href = '/cart/payment-success?orderId=' + orderCode;
                            });
                    }
                });
            }
        }).render('#paypal-button-container');
    });
}