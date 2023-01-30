import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { TooltipType } from "../types/types";

const CustomTooltip = ({
  value,
  children,
  className = "",
  innerClassName = "",
}: TooltipType) => {
  return (
    <Tippy content={value} duration={250} animateFill className={className}>
      <div className={`flex ${innerClassName}`}>{children}</div>
    </Tippy>
  );
};

export default CustomTooltip;
