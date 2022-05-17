$(() => {
  // cursor event
  const cursorIn = () => {
    $(".follower-circle").addClass("follower-scaled");
  };

  const cursorOut = () => {
    $(".follower-circle").removeClass("follower-scaled");
  };

  const invertIn = () => {
    $(".follower").css({ "mix-blend-mode": "difference" });
    $(".follower-circle").css({ "background-color": "#ffffff" });
  };

  const invertOut = () => {
    $(".follower").css({ "mix-blend-mode": "normal" });
    $(".follower-circle").css({ "background-color": "" });
  };

  const buttonIn = (e) => {
    const color = $(e.target).css("background-color");
    $(".follower").css({ "mix-blend-mode": "lighten" });
    $(".follower-circle").css({ "background-color": color });
  };

  const buttonOut = (e) => {
    const blend = $(e.target).hasClass("invert") ? "difference" : "normal";
    const color = $(e.target).hasClass("invert") ? "#ffffff" : "";
    $(".follower").css({ "mix-blend-mode": blend });
    $(".follower-circle").css({ "background-color": color });
  };

  $(document).on("mousemove", (e) => {
    $(".cursor, .follower").css({
      transform: "translate3d(" + e.clientX + "px, " + e.clientY + "px, 0px)",
    });
  });

  $(
    ".nav-link, .nav-icon, .catalog-menu-item, .styles-menu-item, .button, .collections-slider-wrapper"
  ).on("mouseenter", cursorIn);

  $(
    ".nav-link, .nav-icon, .catalog-menu-item, .styles-menu-item, .button, .collections-slider-wrapper"
  ).on("mouseleave", cursorOut);

  $(".button").on("mouseenter", buttonIn);

  $(".button").on("mouseleave", buttonOut);

  $(".personal-list-wrapper, .bottom-nav-wrapper").on("mouseenter", invertIn);

  $(".personal-list-wrapper, .bottom-nav-wrapper").on("mouseleave", invertOut);

  // slider + cursor

  let carouselID;
  let carouselStep = 0;

  $(".collections-slider-container").addClass("left");
  $(".collections-slider-item").first().addClass("visible");
  $(".collections-slider-item").first().next().addClass("previsible");

  $(".collections-slider-wrapper").on("mousemove", (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const left = [bounds.x, bounds.x + bounds.width / 4];
    const right = [bounds.x + (bounds.width / 4) * 3, bounds.x + bounds.width];
    if (e.clientX > left[0] && e.clientX < left[1]) {
      carouselStep = -1;
    } else if (e.clientX > right[0] && e.clientX < right[1]) {
      carouselStep = 1;
    } else {
      carouselStep = 0;
    }
  });

  $(".collections-slider-wrapper").on("mouseenter", (e) => {
    $(".cursor-text").text("Тащить");
    carouselID = setInterval(() => {
      const $container = $(".collections-slider-container");
      const $postvisible = $(".collections-slider-item.postvisible");
      const $visible = $(".collections-slider-item.visible");
      const $previsible = $(".collections-slider-item.previsible");
      const $first = $(".collections-slider-item").first();
      const $last = $(".collections-slider-item").last();
      // left
      if (carouselStep === -1) {
        if ($container.hasClass("right")) {
          $visible.removeClass("visible").removeAttr("style").addClass("swapvisible");
          $previsible.removeClass("previsible").removeAttr("style").addClass("swapprevisible");
          setTimeout(() => {
            $container.removeClass("right").addClass("left");
            $postvisible.removeClass("postvisible").removeAttr("style");
            if ($visible.next().length !== 0) {
              $visible.next().removeAttr("style").addClass("previsible")
            } else {
              $first.removeAttr("style").addClass("previsible")
            }
            $visible.removeClass("swapvisible").removeAttr("style").addClass("visible");
            $previsible.removeClass("swapprevisible").removeAttr("style").addClass("postvisible");
          }, 2000);
        } else {
          const $next = $previsible.next().length ? $previsible.next() : $first;
          $postvisible.removeClass("postvisible").removeAttr("style");
          $visible
            .removeClass("visible")
            .removeAttr("style")
            .addClass("postvisible");
          $previsible
            .removeClass("previsible")
            .removeAttr("style")
            .addClass("visible");
          $next.removeAttr("style").addClass("previsible");
        }
      }
      // right
      if (carouselStep === 1) {
        // switch to right
        if ($container.hasClass("left")) {
          $visible.removeClass("visible").removeAttr("style").addClass("swapvisible");
          $previsible.removeClass("previsible").removeAttr("style").addClass("swapprevisible");
          setTimeout(() => {
            $container.removeClass("left").addClass("right");
            $postvisible.removeClass("postvisible").removeAttr("style");
            if ($visible.prev().length !== 0) {
              $visible.prev().removeAttr("style").addClass("previsible")
            } else {
              $last.removeAttr("style").addClass("previsible")
            }
            $visible.removeClass("swapvisible").removeAttr("style").addClass("visible");
            $previsible.removeClass("swapprevisible").removeAttr("style").addClass("postvisible");
          }, 2000);
        } else {
          const $next = $previsible.prev().length ? $previsible.prev() : $last;
          $postvisible.removeClass("postvisible").removeAttr("style");
          $visible
            .removeClass("visible")
            .removeAttr("style")
            .addClass("postvisible");
          $previsible
            .removeClass("previsible")
            .removeAttr("style")
            .addClass("visible");
          $next.removeAttr("style").addClass("previsible");
        }
      }
    }, 2000);
  });

  $(".collections-slider-wrapper").on("mouseleave", (e) => {
    $(".cursor-text").text("");
    clearInterval(carouselID);
  });

  // catalog menu callback
  $(".catalog-menu-item").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const $item = $(e.target);
    const menu = $item.attr("data-menu");
    console.log(`Set menu: "${menu}"`);

    $(".catalog-menu-item.active").removeClass("active");
    $item.addClass("active");

    $(".catalog-image").each((i, img) => {
      $(img).attr("data-menu", menu);
    });

    $(".catalog-image-holder").each((i, holder) => {
      holder.style.animation = "none";
      holder.offsetHeight; /* trigger reflow */
      holder.style.animation = null;
    });
  });

  // styles menu hover
  $(".styles-menu-item").mouseenter((e) => {
    e.preventDefault();
    e.stopPropagation();
    const $item = $(e.target);
    const menu = $item.attr("data-menu");
    console.log(`Over style: "${menu}"`);

    $(".styles-image").each((i, img) => {
      $(img).attr("data-menu", menu);
    });

    $(".styles-image-holder").each((i, holder) => {
      holder.style.animation = "none";
      holder.offsetHeight; /* trigger reflow */
      holder.style.animation = null;
    });
  });

  $(".styles-menu-item").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});
