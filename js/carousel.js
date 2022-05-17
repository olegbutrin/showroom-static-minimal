$(() => {
  let spinnerID;

  const spinnerClass = ".collections-text-item";
  $(spinnerClass).first().addClass("show");

  let carouselID;
  let carouselStep = 0;
  const carouselTimeout = 1800;

  const wrapperClass = ".collections-slider-wrapper";
  const containerClass = ".collections-slider-container";
  const itemClass = ".collections-slider-item";

  $(containerClass).addClass("left");
  $(itemClass).first().addClass("visible");
  $(itemClass).first().next().addClass("previsible");

  const resetClass = (element, beg, end) => {
    $(element).removeClass(beg).removeAttr("style").addClass(end);
  };

  const clearClass = (element, beg) => {
    $(element).removeClass(beg).removeAttr("style");
  };

  const addClass = (element, end) => {
    $(element).removeAttr("style").addClass(end);
  };

  // set scroll catch scroll вшкусешщт
  $(wrapperClass).on("mousemove", (e) => {
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

  $(wrapperClass).on("mouseenter", (e) => {
    $(".cursor-text").text("Тащить");

    if ($(spinnerClass).length > 1) {
      spinnerID = setInterval(() => {
        if (carouselStep !== 0) {
          const $active = $(spinnerClass + ".show");
          const $next = $active.next().length
            ? $active.next()
            : $(spinnerClass).first();
          resetClass($active, "show", "hide");
          addClass($next, "show");
          setTimeout(() => {
            clearClass($active, "hide");
          }, carouselTimeout);
        }
      }, carouselTimeout);
    }

    carouselID = setInterval(() => {
      const $container = $(containerClass);
      const $postvisible = $(itemClass + ".postvisible");
      const $visible = $(itemClass + ".visible");
      const $previsible = $(itemClass + ".previsible");
      const $first = $(itemClass).first();
      const $last = $(itemClass).last();
      // left
      if (carouselStep === -1) {
        if ($container.hasClass("right")) {
          resetClass($visible, "visible", "swapvisible");
          resetClass($previsible, "previsible", "swapprevisible");
          setTimeout(() => {
            resetClass($container, "right", "left");
            clearClass($postvisible, "postvisible");
            if ($visible.next().length !== 0) {
              addClass($visible.next(), "previsible");
            } else {
              addClass($first, "previsible");
            }
            resetClass($visible, "swapvisible", "visible");
            resetClass($previsible, "swapprevisible", "postvisible");
          }, carouselTimeout);
        } else {
          const $next = $previsible.next().length ? $previsible.next() : $first;
          clearClass($postvisible, "postvisible");
          resetClass($visible, "visible", "postvisible");
          resetClass($previsible, "previsible", "visible");
          addClass($next, "previsible");
        }
      }
      // right
      if (carouselStep === 1) {
        // switch to right
        if ($container.hasClass("left")) {
          resetClass($visible, "visible", "swapvisible");
          resetClass($previsible, "previsible", "swapprevisible");
          setTimeout(() => {
            resetClass($container, "left", "right");
            clearClass($postvisible, "postvisible");
            if ($visible.prev().length !== 0) {
              addClass($visible.prev(), "previsible");
            } else {
              addClass($last, "previsible");
            }
            resetClass($visible, "swapvisible", "visible");
            resetClass($previsible, "swapprevisible", "postvisible");
          }, carouselTimeout);
        } else {
          const $next = $previsible.prev().length ? $previsible.prev() : $last;
          clearClass($postvisible, "postvisible");
          resetClass($visible, "visible", "postvisible");
          resetClass($previsible, "previsible", "visible");
          addClass($next, "previsible");
        }
      }
    }, carouselTimeout);
  });

  $(wrapperClass).on("mouseleave", (e) => {
    $(".cursor-text").text("");
    clearInterval(carouselID);
    clearInterval(spinnerID);
  });
});
