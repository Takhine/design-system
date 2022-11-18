import { Spacing } from "@takhinearin/foundation";
import React from "react";

interface MarginProps {
  space?: keyof typeof Spacing;
  side?: "left" | "right" | "top" | "bottom" | "x" | "y" | null;
  left?: keyof typeof Spacing;
  right?: keyof typeof Spacing;
  bottom?: keyof typeof Spacing;
  top?: keyof typeof Spacing;
  children: React.ReactNode;
}

const Margin: React.FC<MarginProps> = ({
  space = "sm",
  side = null,
  left,
  right,
  bottom,
  top,
  children,
}) => {
  const isMultiSide = !left && !right && !top && !bottom;

  let className = isMultiSide? `dse-margin-${side}-${space}` : ``;

  if (!side && isMultiSide) {
    className = `dse-margin-${space}`;
  }

  if (left) {
    className = `${className} dse-margin-left-${left}`;
  }

  if (right) {
    className = `${className} dse-margin-right-${right}`;
  }

  if (top) {
    className = `${className} dse-margin-top-${top}`;
  }

  if (right) {
    className = `${className} dse-margin-left-${left}`;
  }

  return <div className={className}>{children}</div>;
};

Margin.displayName = "Margin";

export default Margin;
