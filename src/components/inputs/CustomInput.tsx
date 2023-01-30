import { CustomInputType } from "../../types/types";

const CustomInput = ({
  className,
  name,
  type,
  label,
  register,
  required,
  Icon,
  error,
  placeholder,
}: CustomInputType) => {
  return (
    <div className={`relative w-full ${className} my-4`}>
      <div className="inline-block text-gray-800  mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </div>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon />
          </div>
        )}
        <input
          type={type}
          className={`
   ${
     error
       ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500 focus:border-red-500"
       : "bg-gray-50 border border-gray-300 text-gray-900"
   } sm:text-sm rounded-lg block w-full p-3  ${Icon ? "pl-10" : ""}  `}
          {...(register ? register(name, { required }) : {})}
          placeholder={placeholder || label}
        />
      </div>
      {error && (
        <div className="text-xs absolute top-full left-0 text-red-800">
          {error}
        </div>
      )}
    </div>
  );
};
export default CustomInput;
