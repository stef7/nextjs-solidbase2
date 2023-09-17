import { useLayoutEffect } from "react";

type StyleElem = HTMLStyleElement | HTMLLinkElement;

const getTopStyles = () => document.querySelectorAll<StyleElem>('style:not([data-emotion]), link[rel="stylesheet"]');

const weakMap = new WeakMap<StyleElem, StyleElem>();

const syncPreviewStyles = (previewDocument: Document) => {
  for (const elem of getTopStyles()) {
    const existing = weakMap.get(elem);
    if (existing && previewDocument.contains(existing)) return;

    const clone = elem.cloneNode(true) as StyleElem;
    previewDocument.head.append(clone);
    weakMap.set(elem, clone);
  }
};

export const usePreviewStyles = (previewDocument: Document) =>
  useLayoutEffect(() => {
    syncPreviewStyles(previewDocument);
  }, [previewDocument]);
