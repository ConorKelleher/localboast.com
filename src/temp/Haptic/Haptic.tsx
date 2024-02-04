import { CSSProperties, PropsWithChildren } from "react";
import useHaptic, { DEFAULT_USE_HAPTIC_OPTIONS, UseHapticOptions } from "temp/useHaptic/useHaptic";

export interface HapticProps extends PropsWithChildren, UseHapticOptions {
  style?: CSSProperties;
}

export const DEFAULT_HAPTIC_PROPS = {
  ...DEFAULT_USE_HAPTIC_OPTIONS,
};

const Haptic = ({ children, style, ...otherProps }: HapticProps) => {
  const mergedOptions = {
    ...DEFAULT_HAPTIC_PROPS,
    ...otherProps,
  };
  const [{ style: hapticStyle, ...otherHapticProps }] = useHaptic(mergedOptions);

  return (
    <div style={{ ...hapticStyle, display: "flex", ...style }} {...otherHapticProps}>
      {children}
    </div>
  );
};

export default Haptic;
