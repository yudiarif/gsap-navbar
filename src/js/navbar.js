import { gsap } from "gsap";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const menu = document.querySelector(".menu"),
  menuWrapper = menu.children[0],
  menuFrame = menuWrapper.children[0],
  menuSubFrame = menuWrapper.children[1],
  menuOverlay = menu.children[1];

const wrapperElements = menu.querySelectorAll(".menu-pages-links .ofh a"),
  wrapperPages = menu.querySelectorAll(".menu-pages-title > p"),
  frameElements = menuSubFrame.querySelectorAll(".ofh > div");

const nav = document.querySelector(".nav"),
  navMenu = nav.querySelector(".nav-menu"),
  navMenuText = nav.querySelector(".nav-menu > span");

let isEnabled = false;

const toggle = (action) => {
  !action ? open() : close();
};

const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
const tlButton = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });

const animateMenu = () => {
  gsap.set(menu, { pointerEvents: "none" });

  tl.from(
    [menuFrame, menuSubFrame],
    {
      duration: 0.8,
      y: "-101%",
      stagger: 0.02,
    },
    0
  )
    .from(
      [wrapperElements, wrapperPages, frameElement],
      {
        duration: 1,
        y: "-100%",
        stagger: {
          each: 0.016,
          from: "bottom",
        },
      },
      0.2
    )
    .from(
      menuOverlay,
      {
        duration: 0.8,
        autoAlpha: 0,
        ease: "power4.out",
      },
      0
    );
};

const animateButton = () => {
  tlButton
    .to(navMenuText, {
      duration: 0.8,
      autoAlpha: 0,
    })
    .to(navMenuText, {
      duration: 0.8,
      autoAlpha: 1,
    })
    .to(
      navMenuText,
      {
        duration: 0.5,
        text: {
          value: "Close",
          delimiter: " ",
          speed: 1,
        },
      },
      0.32
    );
};

const open = () => {
  if (tl) tl.play();
  if (tlButton) tlButton.play();
  isEnabled = true;
  menu.style.pointerEvents = "auto";
};

const close = () => {
  if (tl) tl.reverse();
  if (tlButton) tlButton.reverse();
  isEnabled = false;
  menu.style.pointerEvents = "auto";
};

const addEventListeners = () => {
  navMenu.onclick = () => toggle(isEnabled);
  menuOverlay.onclick = () => close();
};

window.onload = () => {
  animateMenu();
  animateButton();
  addEventListeners();
};
