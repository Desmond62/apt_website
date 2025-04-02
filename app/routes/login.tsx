import Input from "../shared/input";
import AuthSidebar from "../shared/authsidebar";
import { Link } from "react-router";
import Button from "../shared/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import LoadingScreen from "~/shared/loadingscreen";
const errorStyle = "text-red-500 text-[12px]";
const paddingX = "px-8";

export const loader = null;

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const [generalError, setGeneralError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => {
    setGeneralError("");

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if user exists
    const user = existingUsers.find(
      (user: any) =>
        user.email === data.email && user.password === data.password
    );

    if (!user) {
      setGeneralError("Invalid email or password");
      return;
    }

    // Save logged-in user (you can use sessionStorage too)
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful!");
  };

  return (
    <>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(375px,1fr))] h-screen bg-[rgb(243,244,246)]">
        <div className="bg-[#fff] rounded-lg p-4 h-full ml-5 ">
          <AuthSidebar />
        </div>
        {/* prettier-ignore */}
        <div className={`bg-[#fff] rounded-2xl  max-w-[320px] m-auto mt-10 shadow-[var(--box-shadow)] ${errors.email || errors.password ? "h-[490px]" : "h-[460px]"} `}>
          <form action="" onSubmit={handleSubmit(onSubmit)} className={`${paddingX} `}>
            <div className="w-fit pt-6">
              <Link to="/login">
                <img
                  src="atp_logo.png"
                  alt="Logo"
                  className="w-[50px] h-[50px] object-cover"
                />
              </Link>
              <h5 className="text-[13px] text-[#a9a9a9] font-bold mt-1.5">
                Welcome to ATP
              </h5>
              <p className="text-[12px] text-[#a9a9a9]">Login to your account.</p>
            </div>

            {generalError && (<p className={errorStyle}> {generalError}</p> )}

            <Input label="Email" type="email" {...register("email")} />
            {errors.email && (<p className={errorStyle}> {errors.email.message}</p> )}
            <Input label="Password" type="password" {...register("password")} />
            {errors.password && (<p className={errorStyle}> {errors.password.message}</p>)}
                      
            <div className="flex justify-end mt-4">
             <Button type="submit" className="bg-[#17995e] hover:bg-[#17995e] text-white text-semibold text-[13px]">Login</Button>
              </div>
          
          </form>
            <div className={`${paddingX} mt-4 border-t-[1px] border-b-[1px] border-[gainsboro] py-4`}>   
             <span className="text-[12px] text-[#8d8d8d] "> Don't have an account? </span>
             <Button type="button" className="text-[grey] text-[13px] font-semibold bg-[#e3e7ec] hover:bg-[whitesmoke] ml-2" onClick={() => window.location.href = "/register"} >
              Sign Up
            </Button>
             </div>
              <p className={`${paddingX} text-[11px] text-[#b0b0b0] mt-2`}>Have any Query? Feel free to contact us on. <br /> support@atporg.com</p>          
         </div>
      </section>

      {/*============ Loading Screen =========== */}
      <LoadingScreen />
    </>
  );
}

export default LoginForm;
