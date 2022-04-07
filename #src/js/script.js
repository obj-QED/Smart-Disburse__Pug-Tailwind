// Определяем поддержку Webp
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

$(document).ready(function () {
  // Modal Open
  $(".message").on("click", function () {
    $(".modal-message").show();
  });
  $(".expiration").on("click", function () {
    $(".modal-expiration").show();
  });
  $(".full-details").on("click", function () {
    $(".modal-full-details").show();
  });
  $(".js-open-modal").on("click", function () {
    $(".modal").show();
  });
  // Close modal
  $(".modal .close").on("click", function () {
    $(this).parents(".modal").hide();
  });
  // Accordion Menu
  $(".menu .nav-accordion .nav-accordion__btn").on("click", function () {
    $(this).toggleClass("transform rotate-180");
    $(this).parents(".menu").find(".menu-nav .item span.text-sm").toggleClass("hidden");
    $(this).parents(".menu").find(".copyright span, .copyright a").toggleClass("hidden");
    $(this).parents(".menu").find(".sticky").toggleClass("min-w-220p w-full items-center");
    $(this).parents(".menu").find(".menu-nav").toggleClass("flex flex-col items-center justify-center");
    $(this).parents(".menu").toggleClass("md:w-2/12 w-auto md:w-4/12");
    $(this).parents(".step").find(".content").toggleClass("md:w-8/12 w-full px-36 md:py-10 pt-9 px-4 pb-4 md:p-10 lg:p-14 lg:py-14");

    $(this).parent().toggleClass("justify-end justify-center");
    $(this).parents(".menu").find(".terms-link").toggleClass("flex-wrap order-2");
    $(this).parents(".menu").find(".js-switch-language").toggleClass("order-3");
    $(this).parents(".menu").find(".js-powered").toggleClass("order-1");
    $(this).parents(".menu").find(".js-footer-separator").toggleClass("hidden");
    $(this).parents(".menu").find(".js-footer-transcard").toggleClass("hidden");
    $(this).parents(".menu").find(".js-footer-powered").toggleClass("hidden");
    $(this).parents(".menu").find(".js-foooter-container").toggleClass("flex-col-reverse");
  });

  // Change currancy modal
  let isOpenModal = $("section").hasClass("is-view-currancy-change");

  if (isOpenModal) {
    $(".modal-change-currancy").show();
  } else {
    $(".modal-change-currancy").hide();
  }

  $(".open-change-currancy").on("click", function () {
    $(".modal-change-currancy").css({ display: "block" });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".js-stickyxb-button")) {
      document.body.classList.toggle('overflow-hidden')

      let stickyxbDropdown = e.target.closest(".js-stickyxb").querySelector(".js-stickyxb-dropdown");
      let stickyxbButton = e.target.closest(".js-stickyxb").querySelector(".js-stickyxb-button");
      let stickyxbArrow = e.target.closest(".js-stickyxb").querySelector(".js-stickyxb-arrow");
      let stickyxbOverlay = e.target.closest(".js-stickyxb").querySelector(".js-stickyxb-overlay");

      stickyxbDropdown.classList.toggle("opacity-0");
      stickyxbDropdown.classList.toggle("pointer-events-none");
      stickyxbDropdown.classList.toggle("translate-y-2");

      stickyxbArrow.classList.toggle("rotate-180");

      stickyxbOverlay.classList.toggle("opacity-0");
      stickyxbOverlay.classList.toggle("pointer-events-none");
    }
  });
});

$(".open-change-currancy").on("click", function () {
  $(".money-change").show();
});
