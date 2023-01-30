import { SortButtonType } from "../../types/types";

const SortButton = ({ children, onClick }: SortButtonType) => {
  return <button onClick={onClick}>{children}</button>;
};

export default SortButton;
