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

  $(".nav-link, .nav-icon, .catalog-menu-item, .styles-menu-item, .button, .collections-slider-wrapper").on(
    "mouseenter",
    cursorIn
  );

  $(".nav-link, .nav-icon, .catalog-menu-item, .styles-menu-item, .button, .collections-slider-wrapper").on(
    "mouseleave",
    cursorOut
  );

  $(".button").on("mouseenter", buttonIn);

  $(".button").on("mouseleave", buttonOut);

  $(".personal-list-wrapper, .bottom-nav-wrapper").on("mouseenter", invertIn);

  $(".personal-list-wrapper, .bottom-nav-wrapper").on("mouseleave", invertOut);

  // slider cursor

  $(".collections-slider-wrapper").on("mouseenter", () => {
    $(".cursor-text").text("Тащить");
  });

  $(".collections-slider-wrapper").on("mouseleave", () => {
    $(".cursor-text").text("");
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
