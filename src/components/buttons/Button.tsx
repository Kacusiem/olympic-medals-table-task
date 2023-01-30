import CustomTooltip from "../../common/CustomTooltip";
import { ButtonType } from "../../types/types";

const Button = ({
  color = "primary",
  children,
  className,
  tooltip,
  onClick,
}: ButtonType) => {
  const buttonStyles = `${
    color === "primary"
      ? `bg-gray-200 hover:bg-gray-300 text-gray-500 active:text-gray-700`
      : color === "secondary"
      ? `bg-amber-400 hover:bg-amber-500 active:text-gray-100 text-white`
      : color === "success"
      ? `bg-emerald-400 hover:bg-emerald-500 active:text-gray-100 text-white`
      : color === "danger"
      ? `bg-red-400 hover:bg-red-500 active:text-gray-100 text-white`
      : ``
  }
    md:text-base px-3 py-2.5 flex items-center justify-center gap-4 text-sm font-semibold text-center rounded-lg outline-none transition-all duration-200 ${className}`;
  return (
    <CustomTooltip value={tooltip}>
      <button type={"submit"} onClick={onClick} className={buttonStyles}>
        {children}
      </button>
    </CustomTooltip>
  );
};

export default Button;
