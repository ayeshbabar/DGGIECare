// Shoelace UI Components
const dialog = document.querySelector(".dialog-overview");
const openButton = dialog.nextElementSibling;
const closeButton = dialog.querySelector('sl-button[slot="footer"]');

openButton.addEventListener("click", () => dialog.show());
closeButton.addEventListener("click", () => dialog.hide());

// Anime JS
var textWrapper = document.querySelector(".ml6 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml6 .letter",
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i,
  })
  .add({
    targets: ".ml6",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

// adding and removind css class
const sections = nodeListToArray(document.querySelectorAll("section"));
const navLinks = nodeListToArray(document.querySelectorAll("nav ul li a"));

const byId = document.getElementById;

function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList, 0);
}

function getAbsoluteHeight(section) {
  var styles = window.getComputedStyle(section);
  var margin =
    parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

  return Math.ceil(section.offsetHeight + margin);
}

function getYOffsets(section) {
  return {
    yTop: section.offsetTop,
    yBottom: section.offsetTop + getAbsoluteHeight(section),
  };
}

function isSectionVisible(section) {
  const yOffsets = getYOffsets(section);

  return (
    window.pageYOffset >= yOffsets.yTop && window.pageYOffset < yOffsets.yBottom
  );
}

function getVisibleSectionId() {
  const visibleSection = sections.find(isSectionVisible);

  if (visibleSection) {
    return visibleSection.id;
  }
}

function highlightActiveMenu() {
  const visibleSectionId = getVisibleSectionId();

  navLinks.forEach((link) => {
    if (link.getAttribute("data-section") == visibleSectionId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", () => {
  highlightActiveMenu();
});
