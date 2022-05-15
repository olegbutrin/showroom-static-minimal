$(() => {
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
