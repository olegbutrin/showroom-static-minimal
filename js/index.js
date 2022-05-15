const _containerID = "#content";
const _pageClass = ".page";

let screen, container, pages, doScroll;

const pageScroller = (e) => {
  const delta = e.originalEvent.deltaY;
  container.css("top", -screen * 100 + "%");
  let activePage = $(pages[screen]);
  if (!!activePage && !doScroll) {
    doScroll = true;
    if (delta > 0 && screen < pages.length - 1) {
      screen++;
    }
    if (delta < 0 && screen > 0) {
      screen--;
    }
		setTimeout(() => {
			doScroll = false;
		}, 2200);
  }
};

$(() => {
  screen = 0;
  doScroll = false;
  container = $(_containerID);
  pages = $(_pageClass);

  // $("body").on("mousewheel", pageScroller);
});
