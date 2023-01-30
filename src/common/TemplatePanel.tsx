import { TemplatePanelType } from "../types/types";

const TemplatePanel = ({ children }: TemplatePanelType) => {
  return (
    <div className="flex flex-col my-6 mx-auto items-center">{children}</div>
  );
};

export default TemplatePanel;
