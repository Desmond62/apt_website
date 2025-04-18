import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  src?: string;
  alt?: string;
  className?: string;
}

function Input({ label, error, src, alt, className, ...props }: InputProps) {
  return (
    <div>
      <div className={`${className || " w-fit"}`}>
        {src && (
          <img
            src={`/${src}.png`}
            alt={alt}
            className={`w-[30px] h-[30px] object-cover ${className || ""}`}
          />
        )}
      </div>
      <div className="relative">
        <input
          type={props.type}
          className={` mt-[1.2rem] px-[6px] py-[12px] text-[0.75rem] text-[#8d8d8d] caret-[#17995e] rounded-lg border border-[#8d8d8d] tracking-wider w-[15rem] focus:outline-none focus:border-2 focus:border-[#8d8d8d] valid:outline-none valid:border-2 valid:border-[#8d8d8d]  ${
            className || ""
          } ${error ? "ring-2 ring-red-500" : ""}`}
          {...props}
        />
        {label && (
          <label
            htmlFor={label}
            className="absolute left-4 top-1/2 transform -translate-y-[140%] -translate-x-[10px] scale-[0.8] bg-white px-[5px] text-[#8d8d8d] font-bold text-xs tracking-wider rounded-full"
          >
            {label}
          </label>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
