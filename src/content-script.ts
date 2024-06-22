import { Message } from "./messaging";

// Highlight elements and gather their information
const highlightElements = (reverse: boolean): { tag: string; href?: string }[] => {
  const links = document.querySelectorAll<HTMLAnchorElement>("a");
  const buttons = document.querySelectorAll<HTMLButtonElement>("button");

  const elementsData: { tag: string; href?: string }[] = [];

  links.forEach((link) => {
    link.style.outline = reverse ? "2px solid blue" : "2px solid orange";
    elementsData.push({ tag: "A", href: link.href });
  });

  buttons.forEach((button) => {
    button.style.outline = reverse ? "2px solid orange" : "2px solid blue";
    elementsData.push({ tag: "BUTTON" });
  });

  return elementsData;
};

// Execute highlighting and send data
const main = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const reverse = urlParams.get("reverse") === "true";

  const elementsData = highlightElements(reverse);
  chrome.runtime.sendMessage({
    message: Message.LOADED,
    payload: { elements: elementsData, url: window.location.href },
  });
};

// Execute main function
main();