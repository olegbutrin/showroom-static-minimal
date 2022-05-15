$(() => {
  // cursor event
  const cursorIn = () => {
    $(".follower-circle").addClass("follower-scaled");
  };

  const cursorOut = () => {
    $(".follower-circle").removeClass("follower-scaled");
  };

  const invertIn = () => {
    $(".cursor, .follower").css({ "mix-blend-mode": "difference"});
    $(".follower-circle").css({ "background-color": "#ffffff"});
  };

  const invertOut = () => {
    $(".cursor, .follower").css({ "mix-blend-mode": "normal"});
    $(".follower-circle").css({ "background-color": ""});
  };

  $(document).on("mousemove", (e) => {
    $(".cursor, .follower").css({
      transform: "translate3d(" + e.clientX + "px, " + e.clientY + "px, 0px)",
    });
  });

  $(".nav-link, .nav-icon, .catalog-menu-item, .styles-menu-item, .button").on(
    "mouseenter",
    cursorIn
  );

  $(".nav-link, .nav-icon, .catalog-menu-item, .styles-menu-item, .button").on(
    "mouseleave",
    cursorOut
  );

  $(".personal-list-wrapper, .bottom-nav-wrapper").on("mouseenter", invertIn);

  $(".personal-list-wrapper, .bottom-nav-wrapper").on("mouseleave", invertOut);

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
