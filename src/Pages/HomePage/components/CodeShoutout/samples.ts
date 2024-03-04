export const SAMPLE_A = `import { useAnimatedText } from "../../hooks"
import { PropsWithChildren, useMemo } from "react"

// Todo, add interface

const AnimatedText = ({ children, ...otherProps }: AnimatedTextProps) => {
  return null
}

export default AnimatedText
`

export const SAMPLE_B = `import { useAnimatedText } from "../../hooks"
import { PropsWithChildren, useMemo } from "react"

// Todo, add interface

const AnimatedText = ({ children, ...otherProps }: AnimatedTextProps) => {
  return null
}

export default AnimatedText
`
export const SAMPLE_C = `import { useAnimatedText } from "../../hooks"
import { UseAnimatedTextOptions } from "../../hooks/useAnimatedText/useAnimatedText"
import { PropsWithChildren, useMemo } from "react"

export interface AnimatedTextProps
  extends PropsWithChildren,
    UseAnimatedTextOptions {}

const AnimatedText = ({ children, ...otherProps }: AnimatedTextProps) => {
  return null
}

export default AnimatedText
`

export const SAMPLE_D = `import { useAnimatedText } from "../../hooks"
import { UseAnimatedTextOptions } from "../../hooks/useAnimatedText/useAnimatedText"
import { PropsWithChildren, useMemo } from "react"

export interface AnimatedTextProps
  extends PropsWithChildren,
    UseAnimatedTextOptions {}

const AnimatedText = ({ children, ...otherProps }: AnimatedTextProps) => {
  return useAnimatedText(
    useMemo(() => {
      let childText = ""
      switch (true) {
        case typeof children === "string":
          childText = children as "string"
          break
        case Array.isArray(children) &&
          children.every((child) => typeof child === "string"):
          childText = (children as string[]).join("")
          break
        default:
          console.warn(
            "Children of AnimatedText must be string or array of strings. Returning children without modification",
          )
      }
      return childText
    }, [children]),
    otherProps,
  )
}

export default AnimatedText
`
