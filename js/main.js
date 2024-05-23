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
         var found = recurse(sheet, selectorString);
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


let beforeCategoryHikingElement = findCssRule(".hiking-section__category::before");
let categoryHikingElement = document.querySelectorAll(".hiking-section__category");
categoryHikingElement.forEach((element) => {
   element.addEventListener("mouseenter", function (event) {
      categoryHikingElement.forEach((category) => {
         category.classList.remove('active--scaleX');
      });
      element.classList.add("active--scaleX");
      let id = event.target.getAttribute("id");
      let spanHikingElements = document.querySelectorAll(`#${id} span`);
      // we have two group of span elements in single parent
      let spanFirstHalfElements = [], spanSecondHalfElements = [];
      // get first group of span elements
      for (let i = 0; i < spanHikingElements.length / 2; i++) {
         spanFirstHalfElements.push(spanHikingElements[i]);
      }
      // get second group of span elements
      for (let i = spanHikingElements.length / 2; i < spanHikingElements.length; i++) {
         spanSecondHalfElements.push(spanHikingElements[i]);
      }
      // do hidden animation on first half separately from second half
      gsap.to(spanFirstHalfElements, {
         visibility: "hidden",
         stagger: {
            each: 0.05,
         },
      });
      // do visible animation on first half separately from second half
      gsap.to(spanFirstHalfElements, {
         visibility: "visible",
         delay: 0.05 * spanFirstHalfElements.length, // make visible animation to wait finishing hidden animation and play
         stagger: {
            each: 0.05,
         },
      });
      // do hidden animation on second half separately from first half
      gsap.to(spanSecondHalfElements, {
         visibility: "hidden",
         stagger: {
            each: 0.05,
         },
      });
      // do visible animation on second half separately from first half
      gsap.to(spanSecondHalfElements, {
         visibility: "visible",
         delay: 0.05 * spanSecondHalfElements.length, // make visible animation to wait finishing hidden animation and play
         stagger: {
            each: 0.05,
         },
      });
      //Categories photos transition
      let id_num = id[id.length - 1];
      let category_photo = document.querySelectorAll('.hiking-section__image img');
      let category_photo_scale = document.querySelector(`#photo-${id_num}`);
      category_photo.forEach((c) => {
            c.classList.add('active--scaleY');
            c.classList.remove('translate--one');
            if(id_num==1)c.classList.remove('translate--two');
            c.classList.remove('translate--three');
      });
      
      setTimeout(function(){category_photo_scale.classList.remove('active--scaleY')},50);
      if(id_num==2) {
         setTimeout(function(){
            category_photo_scale.classList.add('translate--two')
            category_photo_scale = document.querySelector(`#photo-${3}`);
            category_photo_scale.classList.add('translate--two')
         },50);
      }
      if(id_num==1) setTimeout(function(){category_photo_scale.classList.add('translate--one')},50);
      if(id_num==3) setTimeout(function(){category_photo_scale.classList.add('translate--three')},50);
   });
});