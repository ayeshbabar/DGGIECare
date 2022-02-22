// jshint sub:true
// The top most comment has been added to remove an error given by the
// JS validator. Please ignore it.

// JS Code from Shoelace UI Components for the dialog (Shoelace n.d.).
const dialog = document.querySelector(".dialog-overview");
const openButton = dialog.nextElementSibling;
const closeButton = dialog.querySelector('sl-button[slot="footer"]');

openButton.addEventListener("click", () => dialog.show());
closeButton.addEventListener("click", () => dialog.hide());

// JS code from  Moving Letters by (Lin n.d.) adapted from
// anime.js.
var textWrapper = document.querySelector(".ml6 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

let lettersAnimation = anime
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

// Changing css class of navlinks upon scroll.
// These conatants were created using const as thier value will remian
// unchanged, as can be seen from their name, constant.
// Here, querySelectorAll has been used to find all sections inside the
// HTML document and assign them to the constant; 'sections'.
const sections = nodeListToArray(document.querySelectorAll("section"));
// Here, querySelectorAll has been used to find all links inside the
// navbar that are also inside a list point inside and unordered list, and
// assigning them to the constant navLinks.
const navLinks = nodeListToArray(document.querySelectorAll("nav ul li a"));

// This function is taking all the node lists and turning them into an
// array. It was created so that all js functions that can only be used
// on an array can be used on the node lists as well. It was written
// with the help of stackoverflow (Silber 2011).
function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList, 0);
}

// This function returns an element's (div) complete height (border,
// padding, and margin). It was written with the help of stackoverflow
// (thetallweeks 2014). It calculates the offsetHeight and margin of
// each section and returns the sum of the two.
function getAbsoluteHeight(section) {
  const styles = window.getComputedStyle(section);
  const margin =
    parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

  return Math.ceil(section.offsetHeight + margin);
}

// This function returns the offset of each section by returning the
// offsetTop as it is, and the sum of offsetTop and the function
// getAbsoluteHeight() to get the Yoffset.
function getYOffsets(section) {
  return {
    yTop: section.offsetTop,
    yBottom: section.offsetTop + getAbsoluteHeight(section),
  };
}

// This function returns a booloean value. If the pageYOffset is greater than or
// equal to yOffsets.yTop and smaller than yOffsets.yBottom, then it will return
// true. Otherwise, it will return false.
function isSectionVisible(section) {
  const yOffsets = getYOffsets(section);

  return (
    window.pageYOffset >= yOffsets.yTop && window.pageYOffset < yOffsets.yBottom
  );
}

// This function returns the id if a section if the section is visibile.
//  It does this by checking the value of the function isSectionVisible().
// If visibleSection has a value, it will return the id, otherwise
// it will not.
function getVisibleSectionId() {
  const visibleSection = sections.find(isSectionVisible);

  if (visibleSection) {
    return visibleSection.id;
  }
}

// As the name suggests, this function highlights the active navlink by
// giving it the class; 'active'. It gets the id if the visible section
// from getVisibleSectionId() and assigns the class; 'active' if the attribute
// data-section is the same as the id. If it is not the same, then it removes
// the class.
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

// This adds the event listener scroll and calls the function highlightActiveMenu()
// to change the colour of the nav links as the user scrolls.
window.addEventListener("scroll", () => {
  highlightActiveMenu();
});

// Here, svg animation is being added to the svg with id; 'animate-svg' using
// anime.js (anime n.d.).
var path = anime.path("#animate-svg path");
anime({
  targets: "#emoji",
  translateX: path("x"),
  translateY: path("y"),
  rotate: path("angle"),
  easing: "linear",
  duration: 9000,
  loop: true,
});

// REFERENCE LIST
// anime. n.d. ‘Anime.Js’. Accessed 22 February 2022. https://animejs.com.
// Lin, Toshibah. n.d. ‘Moving Letters’. Accessed 16 February 2022. https://tobiasahlin.com/moving-letters/.
// Shoelace. n.d. ‘Shoelace’. Accessed 22 February 2022. https://shoelace.style/.
// Silber, Joseph. 2011. ‘In JavaScript, What Is the Best Way to Convert a NodeList to an Array?’ Stack Overflow. 18 September 2011. https://stackoverflow.com/questions/7459704/in-javascript-what-is-the-best-way-to-convert-a-nodelist-to-an-array.
// thetallweeks. 2014. ‘Javascript - Full Height of a Html Element (Div) Including Border, Padding and Margin?’ Stack Overflow. 20 May 2014. https://stackoverflow.com/questions/10787782/full-height-of-a-html-element-div-including-border-padding-and-margin.
