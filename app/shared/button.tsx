import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`relative px-3 py-2  bg-[#17995e] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden before:content-[''] before:absolute before:inset-0 before:m-auto before:w-[50px] before:h-[50px] before:bg-white before:rounded-inherit before:scale-0 before:-z-10 before:transition-all before:duration-600 before:ease-[cubic-bezier(0.23,1,0.32,1)] hover:before:scale-[3] hover:text-[#17995e] hover:border-gray-300 hover:scale-100 hover:shadow-[00_0.1rem_0.1rem_gainsboro] active:scale-100 ${
        className || "border border-[#17995e] text-white "
      } `}
      {...props}
      role="button"
    >
      {children}
    </button>
  );
}

export default Button;
