jQuery(function($){
    // $("#header").load("header.html");
    //filter
    $(".group-filter").on("click", ".btn", function(){
        $(".group-filter .btn").removeClass("active");
        $(this).addClass("active");
    });

    $(".order-room").owlCarousel({
      margin: 20,
      autoplay: false,
      //lazyLoad: true,
      responsiveClass: true,
      responsive: {
          0: {
              margin: 10,
              items: 2
          },
          600: {
              margin: 15,
              items: 3
          },
          1000: {
              items: 4
          }
      }
  });
});

function bannerJs() {
    $(".banner-owl").owlCarousel({
        loop: true,
        nav: true,
        // animateOut: "fadeOut",
        smartSpeed: 800,
        navText: ["<i class='fal fa-angle-left'></i>", "<i class='fal fa-angle-right'></i>"],
        autoplay: true,
        autoplayTimeout: 7000,
        items: 1
    });
}

function swiperJs(){
    var swiper = new Swiper('.blog-slider', {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        mousewheel: {
          invert: false,
        },
        // autoHeight: true,
        pagination: {
          el: '.blog-slider__pagination',
          clickable: true,
        },
        autoplay: {
          delay: 5000,
        },
      });
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
