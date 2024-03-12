import { Anchor, Box, Menu, useMantineColorScheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { ElementType, useState } from "react";
import { LB_COLORS } from "theme";

import styles from "./styles.module.sass";
import useHaptic from "localboast/hooks/useHaptic";
import useDelayedValue from "localboast/hooks/useDelayedValue";

const ICON_SIZE = 40;

export interface HeaderNavDropdownItemProps {
  to: string;
  label: string;
  external?: boolean;
}
export const HeaderNavDropdownItem = (props: HeaderNavDropdownItemProps) => {
  // Have to have these multiple exits since TS gets mad if the
  // eventual props have a mix of Anchor and Anchor-wrapped-Link props
  if (props.external) {
    const anchorProps = {
      ...externalAnchorProps,
      href: props.to,
      children: props.label,
    };
    return <Anchor {...anchorProps} />;
  } else {
    const anchorProps = {
      ...localAnchorProps,
      component: Link,
      to: props.to,
      children: props.label,
    };
    return <Anchor {...anchorProps} />;
  }
};
export interface HeaderNavItemProps {
  title?: string;
  to?: string;
  href?: string;
  icon: ElementType;
  iconColorAttribute?: "color" | "fill";
  childLinks?: HeaderNavDropdownItemProps[];
}
export const DEFAULT_HEADER_NAV_ITEM_PROPS = {
  iconColorAttribute: "color",
  childLinks: [],
};
const MENU_ITEM_HEIGHT = 40;
const DIVIDER_HEIGHT = 20;
const sharedAnchorProps = {
  display: "flex",
  style: {
    alignItems: "center",
    borderRadius: 5,
  },
  h: `${MENU_ITEM_HEIGHT}px`,
  p: "3px 10px",
};
const externalAnchorProps = {
  ...sharedAnchorProps,
  target: "_blank",
  rel: "noopener noreferrer",
};
const localAnchorProps = {
  ...sharedAnchorProps,
  component: Link,
};
const MENU_OPEN_DELAY = 150;
const MENU_ITEM_REVEAL_DELAY = MENU_OPEN_DELAY + 300;

const HeaderNavItem = (props: HeaderNavItemProps) => {
  const mergedProps = {
    ...DEFAULT_HEADER_NAV_ITEM_PROPS,
    ...props,
  };
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [controlledOpen, setControlledOpen] = useState(false);
  const iconColor = isDarkMode ? LB_COLORS.darkHeaderIcons : LB_COLORS.lightHeaderIcons;
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
    target: props.href ? "_blank" : undefined,
    rel: props.href ? "noopener noreferrer" : undefined,
  };
  const [hapticProps] = useHaptic();

  const [showMenu] = useDelayedValue(controlledOpen, { delay: MENU_OPEN_DELAY, immediateIf: (value) => !value });
  const [showMenuItems] = useDelayedValue(controlledOpen, {
    delay: MENU_ITEM_REVEAL_DELAY,
    immediateIf: (value) => !value,
  });
  let content = (
    <Box {...hapticProps}>
      {/* TS build doesn't like polymorphic props */}
      {/* @ts-ignore */}
      <Anchor
        {...anchorProps}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (!controlledOpen) {
              e.preventDefault();
              setControlledOpen(true);
            }
          }
        }}
        onClick={(e) => {
          if ((e.nativeEvent as PointerEvent).pointerType !== "mouse") {
            // If not mouse click, just show dropdown
            if (!controlledOpen) {
              e.preventDefault();
            }
          }
        }}
      >
        <props.icon {...iconProps} />
      </Anchor>
    </Box>
  );
  const hasSubLinks = !!mergedProps.childLinks.length;

  if (hasSubLinks || mergedProps.title) {
    content = (
      <Menu
        withArrow
        menuItemTabIndex={0}
        trapFocus={false}
        loop={false}
        withinPortal={false}
        trigger="click-hover"
        transitionProps={{ transition: "pop", duration: 200 }}
        opened={showMenu} // our controlled value doesn't handle moving mouse outside trigger. If we need menu access, use the uncontrolled value. If we don't, use the controlled one and close on move mouse
        openDelay={0} // we controll the open value delay ourselves
        onChange={setControlledOpen}
        classNames={{
          label: styles.menuLabel,
        }}
      >
        <Menu.Target>{content}</Menu.Target>
        <Menu.Dropdown>
          {!!mergedProps.title && (
            // TS build doesn't like polymorphic props
            // @ts-ignore
            <Anchor
              {...anchorProps}
              tabIndex={hasSubLinks ? -1 : 0}
              onClick={() => {
                setControlledOpen(false);
                hapticProps.onClick();
              }}
            >
              <Menu.Label fz="md" c={isDarkMode ? LB_COLORS.boastfulYellow : LB_COLORS.boastfulPurple}>
                {mergedProps.title}
              </Menu.Label>
            </Anchor>
          )}
          <div
            style={{
              transition: "max-height 0.5s ease",
              maxHeight:
                showMenuItems && hasSubLinks
                  ? (mergedProps.title ? DIVIDER_HEIGHT : 0) + mergedProps.childLinks.length * MENU_ITEM_HEIGHT
                  : 0,
              overflow: "hidden",
              ...(hasSubLinks
                ? {
                    padding: "5px",
                    margin: "-5px",
                  }
                : undefined),
            }}
          >
            {!!mergedProps.title && <Menu.Divider />}
            {mergedProps.childLinks.map((childLinkConfig, index) => (
              <Menu.Item key={`header_nav_${index}`} component={HeaderNavDropdownItem} {...childLinkConfig} />
            ))}
          </div>
        </Menu.Dropdown>
      </Menu>
    );
  }
  return content;
};

export default HeaderNavItem;
