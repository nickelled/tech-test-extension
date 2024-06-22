import { Message } from "./messaging";

// Handle messages from content scripts
const handleMessage = ({ message, payload }: { message: Message; payload: any }) => {
  if (message === Message.LOADED) {
    console.log("Content script loaded", payload);
    storeElementsData(payload.url, payload.elements);
  }
};

// Store elements data in local storage
const storeElementsData = (url: string, elements: { tag: string; href?: string }[]) => {
  chrome.storage.local.get("elementsData", (data) => {
    const elementsData = data.elementsData || {};
    elementsData[url] = elements;
    chrome.storage.local.set({ elementsData }, () => {
      console.log("Updated local storage:", elementsData);
    });
  });
};

// Add listener for messages from content scripts
chrome.runtime.onMessage.addListener(handleMessage);