import { Anchor, Center, Group, Menu, Tooltip, darken, rgba, useMantineColorScheme } from "@mantine/core";
import DarkSideToggle from "components/DarkSideToggle";
import HomeIcon from "components/HomeIcon";
import { Link } from "react-router-dom";
import { useSize, useUpdatingRef } from "localboast";
import React, {
  CSSProperties,
  Children,
  ElementType,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LB_COLORS } from "theme";
import * as LINKS from "constants/lbLinks";
import GithubLogoSVG from "assets/github_logo.svg?react";
import { IconHammer, IconHeartHandshake, IconVideo, IconVocabulary } from "@tabler/icons-react";
import getCopy from "constants/localisation";

import styles from "./styles.module.sass";
import useDelayedValue from "./temp_useDelayedValue";

interface HeaderProps {
  scrollTop: number;
}

const SCROLL_FADE_RATE = 0.25;

const ICON_SIZE = 40;

type InteractionEvent = React.MouseEvent | React.KeyboardEvent;
interface UseHapticOptions {
  focusMs?: number;
  blurMs?: number;
  clickMs?: number;
  returnMs?: number;
  focusScale?: number;
  clickScale?: number;
  clickDelay?: number;
  returnDelay?: number;
  onClick?: (e?: InteractionEvent) => void;
  events?: {
    focus?: boolean;
    click?: boolean;
  };
}
const DEFAULT_USE_HAPTIC_OPTIONS: UseHapticOptions = {
  focusMs: 0.3,
  blurMs: 0.3,
  clickMs: 0.05,
  returnMs: 0.05,
  focusScale: 1.07,
  clickScale: 0.95,
  clickDelay: 50,
  returnDelay: 0,
  events: {
    focus: true,
    click: true,
  },
};

interface HapticProps extends PropsWithChildren, UseHapticOptions {
  style?: CSSProperties;
}

const useHaptic = (options?: UseHapticOptions) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [returning, setReturning] = useState(false);
  const unclickTimeoutRef = useRef<NodeJS.Timeout>();
  const mergedOptions = {
    ...DEFAULT_USE_HAPTIC_OPTIONS,
    ...options,
  };
  const mergedOptionsRef = useUpdatingRef(mergedOptions);
  let scale = 1;
  let transitionMs = mergedOptions.focusMs!;
  const isFocused = focused || hovered;

  if (clicked) {
    scale = mergedOptions.clickScale!;
    transitionMs = mergedOptions.clickMs!;
  } else if (returning) {
    transitionMs = mergedOptions.returnMs!;
  } else if (isFocused) {
    scale = mergedOptions.focusScale!;
    transitionMs = mergedOptions.focusMs!;
  }
  console.log(scale);
  transitionMs;

  const hapticOnClick = useCallback(
    (e: InteractionEvent) => {
      if (!mergedOptionsRef.current.events?.click) {
        (document.activeElement as HTMLElement)?.blur();
        return;
      }
      const onClick = mergedOptionsRef.current.onClick;

      setClicked(true);
      setReturning(false);
      if (unclickTimeoutRef.current) {
        clearTimeout(unclickTimeoutRef.current);
      }

      unclickTimeoutRef.current = setTimeout(() => {
        if (onClick) {
          onClick(e);
        }
        if (e.type === "click") {
          (document.activeElement as HTMLElement)?.blur();
        }
        setClicked(false);
        setReturning(true);
        unclickTimeoutRef.current = setTimeout(() => {
          setReturning(false);
          unclickTimeoutRef.current = undefined;
        }, mergedOptionsRef.current.returnDelay);
      }, mergedOptionsRef.current.clickDelay);
    },
    [mergedOptionsRef]
  );

  return [
    {
      style: useMemo(
        () => ({
          transform: `scale(${scale})`,
          transition: `all ${transitionMs}s ease`,
        }),
        [scale, transitionMs]
      ),
      onClick: hapticOnClick,
      onKeyDown: useCallback(
        (e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            hapticOnClick(e);
          }
        },
        [hapticOnClick]
      ),
      onMouseEnter: useCallback(() => mergedOptionsRef.current.events?.focus && setHovered(true), [mergedOptionsRef]),
      onMouseLeave: useCallback(() => mergedOptionsRef.current.events?.focus && setHovered(false), [mergedOptionsRef]),
      onFocus: useCallback(() => mergedOptionsRef.current.events?.focus && setFocused(true), [mergedOptionsRef]),
      onBlur: useCallback(() => mergedOptionsRef.current.events?.focus && setFocused(false), [mergedOptionsRef]),
    },
    {
      focused,
      hovered,
      clicked,
      returning,
    },
  ] as const;
};

const Haptic = ({ children, style, ...options }: HapticProps) => {
  const [{ style: hapticStyle, ...otherHapticProps }] = useHaptic(options);

  return (
    <div style={{ ...hapticStyle, display: "flex", ...style }} {...otherHapticProps}>
      {children}
    </div>
  );
};

interface HeaderNavItemProps extends PropsWithChildren {
  title?: string;
  to?: string;
  href?: string;
  icon: ElementType;
  iconColorAttribute?: "color" | "fill";
}
const DEFAULT_HEADER_NAV_ITEM_PROPS = {
  iconColorAttribute: "color",
};
const HeaderNavItem = (props: HeaderNavItemProps) => {
  const mergedProps = {
    ...DEFAULT_HEADER_NAV_ITEM_PROPS,
    ...props,
  };
  const { colorScheme } = useMantineColorScheme();
  const iconColor = colorScheme === "dark" ? LB_COLORS.darkIcons : LB_COLORS.lightIcons;
  const iconProps = {
    height: ICON_SIZE,
    width: "100%",
    className: styles.headerIcon,
    [mergedProps.iconColorAttribute]: iconColor,
  };
  const anchorProps = {
    display: "flex",
    style: { borderRadius: 5 },
    component: props.to ? Link : undefined,
    to: props.to || "",
    href: props.href,
  };
  const [hapticStyles, { focused, hovered }] = useHaptic();

  const [showMenu] = useDelayedValue(focused || hovered, { delay: 200, immediateIf: (value) => !value });
  const [showMenuItems] = useDelayedValue(showMenu, { delay: 800, immediateIf: (value) => !value });
  let content = (
    <div {...hapticStyles}>
      <Anchor
        {...anchorProps}
        onClick={(e) => {
          if ((e.nativeEvent as PointerEvent).pointerType === "touch") {
            // If not mouse click, just show dropdown
            e.preventDefault();
            if (showMenu) {
              e.currentTarget.blur();
            }
          }
        }}
      >
        <props.icon {...iconProps} />
      </Anchor>
    </div>
  );
  const hasSubLinks = Children.count(mergedProps.children);

  if (hasSubLinks || mergedProps.title) {
    content = (
      <Menu withArrow trigger="click-hover" transitionProps={{ transition: "pop", duration: 200 }} opened={showMenu}>
        <Menu.Target>{content}</Menu.Target>
        <Menu.Dropdown className={styles.mantineMenuDropdown}>
          {!!mergedProps.title && (
            <>
              <Menu.Label fw="bolder" fz="md">
                {mergedProps.title}
              </Menu.Label>
            </>
          )}
          <div
            style={{
              transition: "max-height 0.5s ease",
              maxHeight: showMenuItems ? Children.count(mergedProps.children) * 40 : 0,
              overflow: "hidden",
            }}
          >
            {!!mergedProps.title && <Menu.Divider />}
            {Children.map(mergedProps.children, (child) => (
              <Menu.Item>{child}</Menu.Item>
            ))}
          </div>
        </Menu.Dropdown>
      </Menu>
    );
  }
  // } else if (mergedProps.title) {
  // content = (
  //   <Tooltip
  //     withArrow
  //     multiline
  //     label={mergedProps.title}
  //     openDelay={100}
  //     fw="bolder"
  //     fz="md"
  //     transitionProps={{ transition: "pop", duration: 150 }}
  //   >
  //     {content}
  //   </Tooltip>
  // );
  // }
  return content;
};

const Header = (props: HeaderProps) => {
  const { size, setRef } = useSize();
  const { colorScheme } = useMantineColorScheme();

  // Need to know header height so body can adjust to fit it
  useEffect(() => {
    if (size?.height) {
      document.documentElement.style.setProperty("--header-height", `${size.height}px`);
    }
  }, [size?.height]);

  const updateHeaderColorRef = useUpdatingRef(() => {
    const baseColor = colorScheme === "dark" ? darken(LB_COLORS.boastfulPurple, 0.5) : LB_COLORS.boastfulYellow;
    let alpha = 1;

    const headerHeight = size?.height;
    const offset = props.scrollTop;

    if (!(headerHeight && offset)) {
      alpha = 1;
    } else {
      alpha = Math.max(0.5, (headerHeight - offset * SCROLL_FADE_RATE) / headerHeight);
    }

    document.documentElement.style.setProperty("--header-bg-color", rgba(baseColor, alpha));
    document.documentElement.style.setProperty("--header-shadow-opacity", alpha.toString());
  });

  // Update header color on colorScheme or scrollTop change
  useEffect(() => {
    updateHeaderColorRef.current();
  }, [props.scrollTop, colorScheme, updateHeaderColorRef]);

  return (
    <Group
      justify="space-between"
      wrap="nowrap"
      id="page-header"
      ref={(ref) => ref && setRef(ref)}
      className={styles.header}
    >
      <Group wrap="nowrap">
        <HomeIcon />
        <Haptic focusScale={1.05} events={{ focus: true }}>
          <DarkSideToggle />
        </Haptic>
      </Group>
      <Group gap={20} wrap="nowrap">
        <HeaderNavItem icon={IconHeartHandshake} to={LINKS.SE_TIP} title={getCopy("seeGive")}>
          <Anchor component={Link} to={LINKS.KO_FI}>
            {getCopy("buyKoFi")}
          </Anchor>
          <Anchor component={Link} to={LINKS.PATREON}>
            {getCopy("becomeAPatron")}
          </Anchor>
          <Anchor component={Link} to={LINKS.SE_TIP}>
            {getCopy("tipOnSE")}
          </Anchor>
        </HeaderNavItem>
        <HeaderNavItem icon={IconVocabulary} to="/docs" title={getCopy("seeDocs")} />
        <HeaderNavItem icon={IconHammer} to="/wip" title={getCopy("seeWip")} />
        <HeaderNavItem
          icon={GithubLogoSVG}
          iconColorAttribute="fill"
          href={LINKS.LIB_REPO}
          title={getCopy("seeGithub")}
        >
          <Anchor component={Link} to={LINKS.LIB_REPO}>
            {getCopy("seeLibCode")}
          </Anchor>
          <Anchor component={Link} to={LINKS.SITE_REPO}>
            {getCopy("seeSiteCode")}
          </Anchor>
        </HeaderNavItem>
        <HeaderNavItem icon={IconVideo} to="/live" title={getCopy("seeLive")}>
          <Anchor component={Link} to="/live/Twitch">
            {getCopy("twitch")}
          </Anchor>
          <Anchor component={Link} to="/live/YouTube">
            {getCopy("youtube")}
          </Anchor>
          <Anchor component={Link} to="/live/Utils">
            Util
          </Anchor>
        </HeaderNavItem>
      </Group>
    </Group>
  );
};

export default Header;
