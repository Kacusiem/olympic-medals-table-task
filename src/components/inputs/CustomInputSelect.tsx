import { CustomInputSelectType } from "../../types/types";

const CustomInputSelect = ({
  className,
  label,
  required,
  children,
  error,
}: CustomInputSelectType) => {
  return (
    <div className={`relative w-full ${className} my-4`}>
      <div className="inline-block text-gray-800 mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </div>
      <div className="relative">{children}</div>
      {error && (
        <div className="text-xs absolute top-full left-0 text-red-800">
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomInputSelect;
