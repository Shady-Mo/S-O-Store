function findCssRule(selectorString) {
   // helper function searches through the document stylesheets looking for selectorString
   // will also recurse through sub-rules (such as rules inside media queries)
   function recurse(node, selectorString) {
       if (node.cssRules) {
           for (var i = 0; i < node.cssRules.length; i++) {
               if (node.cssRules[i].selectorText == selectorString) {
                   return node.cssRules[i].style;
               }
               if (node.cssRules[i].cssRules) {
                   var found = recurse(node.cssRules[i], selectorString);
                   if (found) return found;
               }
           }
       }
       return false;
   }
   
   for (var i = 0; i < document.styleSheets.length; i++) {
       var sheet = document.styleSheets[i];
       if (sheet.cssRules) {
           var found = recurse(sheet,selectorString);
           if (found) return found;
       }
   }
   
   return false;
}

gsap.registerPlugin(ScrollTrigger);

let headerTextElements = document.querySelectorAll(".header__text p");

gsap.from(headerTextElements, {
   stagger: {
      amount: 0.4,
   },
   y: 70,
   opacity: 0,
   delay: 0.5,
});

let headerImageBeforeElement = findCssRule(".header__image::before");
let headerElement = document.querySelector("header");
let headerTextElement = document.querySelector(".header__text");
gsap.to(headerImageBeforeElement, {
   opacity: 0.8,
   scrollTrigger: {
      trigger: headerElement,
      start: "30% top",
      end: "bottom top",
      scrub: 0.5,
   },
});
gsap.to(headerTextElement, {
   y: 150,
   scrollTrigger: {
      trigger: headerElement,
      start: "top top",
      end: "bottom top",
      scrub: 4,
   },
});

let menuLinkSpanElements = document.querySelectorAll(".menu__link div");
gsap.to(menuLinkSpanElements, {
   duration: 0.2,
   scaleY: 0,
   scrollTrigger: {
      trigger: headerElement,
      start: "30% top",
      end: "bottom top",
      toggleActions: "play resume resume reverse",
   },
});

let navbarElement = document.querySelector(".header__menu");
navbarElement.addEventListener("mouseenter", function (event) {
   menuLinkSpanElements.forEach((element) => {
      element.classList.add("active--scale");
   });
});
navbarElement.addEventListener("mouseleave", function (event) {
   menuLinkSpanElements.forEach((element) => {
      element.classList.remove("active--scale");
   });
});