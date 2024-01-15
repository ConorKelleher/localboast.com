import { useCallback, useEffect, useRef } from "react";
import { cx, generateRandomId, useSize, UseSizeSize, useUpdatingRef } from "localboast";

const getSVGForegroundTransition = (ms: number) => `transition: transform ${ms / 1000}s 0s ease-in-out`;
const getSVGBackgroundTransition = (ms: number) => `transition: opacity ${ms / 2000}s ${ms / 2000}s ease-in-out`;
export enum Shape {
  Circle = "circle",
  Square = "rect",
}
type SVGShape = Shape | string;

const getSVGContainer = () => {
  const container = document.createElement("div");

  container.style.position = "absolute";
  container.style.inset = "0";
  container.style.pointerEvents = "none";
  return container;
};

const getSVGViewBox = (size: UseSizeSize | null) => `0 0 ${size?.width || 100} ${size?.height || 100}`;
const getSVGRectDimensions = (size: UseSizeSize | null) => `${!size ? 100 : Math.min(size.height, size.width)}px`;
const getSVGCircleRadius = (size: UseSizeSize | null) => `${!size ? 50 : Math.min(size.height, size.width) / 2}px`;

const getNewSVG = (size: UseSizeSize | null, options: UseWipeOptions, wipeId: string) => {
  const newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  newSVG.setAttribute("id", `lbWipeMaskSVG_${wipeId}`);
  newSVG.setAttribute("width", "100%");
  newSVG.setAttribute("height", "100%");
  newSVG.setAttribute("version", "1.1");
  newSVG.setAttribute("viewBox", getSVGViewBox(size));
  newSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const shape = options.shape;
  const ms = options.ms || DEFAULT_OPTIONS.ms;
  const isCustomSVGShape = !Object.values(Shape).includes(shape as Shape);
  const shapeTagName = isCustomSVGShape ? "image" : shape;

  newSVG.innerHTML = `<defs>
  <mask id="lbWipeMask_${wipeId}">
    <rect width="100%" height="100%" fill="white" style="${getSVGBackgroundTransition(ms)}" />
    <${shapeTagName}
      fill="black"
      style="${cx(
        "transform: scale(0);",
        {
          "transform-origin: center;": shape !== Shape.Circle,
          "transform-box: fill-box;": shape !== Shape.Circle,
        },
        getSVGForegroundTransition(ms)
      )}"
      ${shape !== Shape.Circle ? `width="${getSVGRectDimensions(size)}"` : ""}
      ${shape !== Shape.Circle ? `height="${getSVGRectDimensions(size)}"` : ""}
      ${shape === Shape.Circle ? `r="${getSVGCircleRadius(size)}"` : ""}
      ${isCustomSVGShape ? `href="${shape}"` : ""}
    />
  </mask>
</defs>`;
  return newSVG;
};

const stringifyStyles = (styles: CSSStyleDeclaration) => {
  return Object.values(styles)
    .map((styleName) => {
      const styleValue = styles[styleName as keyof typeof styles];

      if (styleValue !== undefined) {
        return `${styleName}: ${styleValue}`;
      }
    })
    .filter(Boolean)
    .join("; ");
};

const applyElStyles = (el: HTMLElement) => {
  const styles = window.getComputedStyle(el);
  const styleString = stringifyStyles(styles);
  if (styleString) {
    el.setAttribute("style", styleString);
  }
};

const removeAllDescendentIds = (node: Node) => {
  if ("removeAttribute" in node) {
    const el = node as HTMLElement;
    el.childNodes.forEach((child) => removeAllDescendentIds(child));

    if (["STYLE", "SCRIPT"].includes(el.tagName)) {
      // Don't copy any non-display tag (scripts, stylesheets, etc.)
      node.parentElement?.removeChild(node);
      return;
    }
    el.removeAttribute("id");
    el.removeAttribute("name");
    // el.removeAttribute("class");
    applyElStyles(el);
    if (el.parentElement?.tagName === "BODY") {
      el.style.position = "fixed";
      el.style.inset = "0";
    }
  }
};

interface UseWipeOptions {
  ms?: number;
  shape: SVGShape;
}
const DEFAULT_OPTIONS = {
  ms: 2000,
  shape: Shape.Circle,
};

const useWipe = (options?: UseWipeOptions) => {
  const { size, setRef: setSizeRef } = useSize();
  const svgContainerRef = useRef<HTMLDivElement>(getSVGContainer());
  const sizeRef = useUpdatingRef(size);
  const positionRef = useRef<HTMLElement | null>(null);
  const mergedOptionsRef = useUpdatingRef({
    ...DEFAULT_OPTIONS,
    ...options,
  });

  // Append svg mask container on mount + remove on unmount
  useEffect(() => {
    const svgContainer = svgContainerRef.current;
    setSizeRef(svgContainer);
    document.querySelector("html")!.appendChild(svgContainer);
    return () => {
      document.querySelector("html")!.removeChild(svgContainer);
    };
  }, [setSizeRef]);

  const setupCloneRef = useRef((wipeId: string) => {
    const clone = document.body.cloneNode(true) as HTMLDivElement;
    clone.style.position = "fixed";
    clone.style.zIndex = "1";
    clone.style.inset = "0";
    clone.style.pointerEvents = "none";
    clone.style.mask = `url(#lbWipeMask_${wipeId})`;
    const bodyTags = document.getElementsByTagName("body");
    for (let i = 1; i < bodyTags.length; i++) {
      // Increase each existing body dupe's z-index
      bodyTags[i].style.zIndex = ((parseInt(bodyTags[i].style.zIndex) || 0) + 1).toString();
    }
    document.querySelector("html")!.appendChild(clone);
    removeAllDescendentIds(clone);
    setTimeout(() => {
      document.querySelector("html")!.removeChild(clone);
    }, mergedOptionsRef.current.ms);

    return clone;
  });

  const setupSVGRef = useRef((wipeId: string) => {
    const newSVG = getNewSVG(sizeRef.current, mergedOptionsRef.current, wipeId);

    svgContainerRef.current.appendChild(newSVG);

    setTimeout(() => {
      svgContainerRef.current.removeChild(newSVG);
    }, mergedOptionsRef.current.ms);

    return newSVG;
  });

  const animateRef = useRef((newSVG: SVGSVGElement) => {
    const maskBackgroundEl = newSVG.querySelector("mask")?.children[0] as HTMLElement;
    const maskShapeEl = newSVG.querySelector("mask")?.children[1] as HTMLElement;
    if (!maskShapeEl || !maskBackgroundEl || !sizeRef.current) {
      return;
    }
    const maskShapeTransition = maskShapeEl.style.transition;
    const maskBackgroundTransition = maskBackgroundEl.style.transition;

    maskShapeEl.style.transition = "";
    maskBackgroundEl.style.transition = "";

    let maskInsetAmount = 0;
    const positionAdjustments = {
      x: 0,
      y: 0,
    };
    if (positionRef.current) {
      // todo - figure this out better so no position ref means centered object
      const positionRect = positionRef.current.getBoundingClientRect();
      positionAdjustments.x = positionRect.left + positionRect.width / 2;
      positionAdjustments.y = positionRect.top + positionRect.height / 2;
    }
    const smallestPageDimension = Math.min(sizeRef.current.height, sizeRef.current.width);
    const largestPageDimension = Math.max(sizeRef.current.height, sizeRef.current.width);

    if (mergedOptionsRef.current.shape !== Shape.Circle) {
      // rect is positioned by top-left pixel, have to inset it by half to get its center
      maskInsetAmount = smallestPageDimension / 2;
    }
    const newTranslate = `translate(${positionAdjustments.x - maskInsetAmount}px, ${
      positionAdjustments.y - maskInsetAmount
    }px)`;
    maskShapeEl.style.transform = `${newTranslate} scale(0)`;
    maskBackgroundEl.style.opacity = "1";
    setTimeout(() => {
      maskShapeEl.style.transition = maskShapeTransition;
      maskBackgroundEl.style.transition = maskBackgroundTransition;
      setTimeout(() => {
        // todo - make this 2.5 value optional + get a better understanding of why it's needed
        const fullPageScale = 2.5 * (largestPageDimension / smallestPageDimension);
        const oldTransform = maskShapeEl.style.transform;
        const newTransform = oldTransform.replace(/scale\([^)]+\)/, "") + `scale(${fullPageScale})`;

        maskShapeEl.style.transform = newTransform;
        maskBackgroundEl.style.opacity = "0";
      });
    });
  });

  const wipe = useCallback(() => {
    const wipeId = generateRandomId();
    const newSVG = setupSVGRef.current(wipeId);
    setupCloneRef.current(wipeId);
    animateRef.current(newSVG);
  }, []);

  return {
    wipe,
    positionRef,
  };
};

export default useWipe;
