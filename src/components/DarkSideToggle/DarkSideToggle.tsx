import { Switch, useMantineColorScheme, useMantineTheme, rem } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect } from "react";
import styles from "./styles.module.sass";
import DarkModeAnimation from "./components/DarkModeAnimation";

const useColorSchemeTransition = () => {
  useEffect(() => {
    const newClass = styles.transitionTheme;
    setTimeout(() => {
      document.body.classList.add(newClass);
    });
    return () => {
      document.body.classList.remove(newClass);
    };
  }, []);
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

const DarkSideToggle = () => {
  const theme = useMantineTheme();
  useColorSchemeTransition();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />;

  const moonIcon = (
    <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.blue[6]} />
  );

  return (
    <div style={{ position: "relative" }}>
      <Switch
        size="lg"
        checked={colorScheme === "dark"}
        onChange={() => {
          const clone = document.body.cloneNode(true) as HTMLDivElement;
          clone.style.position = "fixed";
          clone.style.inset = "0";
          clone.style.pointerEvents = "none";
          clone.style.clipPath = "url(#lbDarkModeClipPath)";
          document.querySelector("html")!.appendChild(clone);
          removeAllDescendentIds(clone);
          // debugger;
          setColorScheme(colorScheme === "light" ? "dark" : "light");
          setTimeout(() => {
            document.querySelector("html")!.removeChild(clone);
          }, 2000);
        }}
        onLabel={moonIcon}
        offLabel={sunIcon}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          margin: "auto",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <DarkModeAnimation />
      </div>
    </div>
  );
};

export default DarkSideToggle;
