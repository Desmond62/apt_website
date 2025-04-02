import { z } from "zod";
import Input from "../shared/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../shared/button";
import { Link } from "react-router";
import AuthSidebar from "../shared/authsidebar";
import LoadingScreen from "~/shared/loadingscreen";

export const loader = null;
// const registerBG = "#FFF";
const errorStyle = "text-red-500 text-[12px]";
const paddingX = "px-8";

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterFormData) => {
    // Remove confirmPassword before saving
    const { confirmPassword, ...userData } = data;

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    const userExists = existingUsers.some(
      (user: any) => user.email === userData.email
    );
    if (userExists) {
      setError("email", {
        type: "manual",
        message: "Email already exists",
      });
      return;
    }

    // Save new user
    existingUsers.push(userData);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registration successful! You can now log in.");
  };

  return (
    <>
      {/* prettier-ignore */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(375px,1fr))] bg-[rgb(243,244,246)] bg-fixed bg-cover bg-center bg-no-repeat h-[100%]">
      <div className="bg-[#fff] rounded-lg p-4 h-full ml-5  lg:max-w-[992px] hidden lg:block">
          <AuthSidebar />
      </div>

        <div className={`bg-[#fff] rounded-2xl  max-w-[320px] m-auto my-6 shadow-[var(--box-shadow)] ${errors.email || errors.password || errors.confirmPassword ? "h-[620px]" : "h-[570px]"} ` }>
         <form action="" onSubmit={handleSubmit(onSubmit)} className={`${paddingX}`}>
        <div className="w-fit pt-6">
          <Link to="/register">
            <img src="atp_logo.png" alt="Logo" className="w-[50px] h-[50px] object-cover"/>
        </Link>
            <h5 className="text-[13px] text-[#a9a9a9] font-bold mt-1.5">Welcome to ATP</h5>              
            <p className="text-[12px] text-[#a9a9a9]">Create your account.</p>
        </div>
        <Input label="Email" type="email" {...register("email")} />
        {errors.email && (<p className={errorStyle}> {errors.email.message}</p> )}
        <Input label="Password" type="password" {...register("password")} />
        {errors.password && (<p className={errorStyle}> {errors.password.message}</p> )}
        <Input label="Confirm Password" type="password" {...register("confirmPassword")} />
         {errors.confirmPassword && (<p className={errorStyle}> {errors.confirmPassword.message}</p>)}
        <Input label="Referral Code" type="text" {...register("referralCode")} />
         {errors.referralCode && (<p className={errorStyle}> {errors.referralCode.message}</p>)}
                     
        <div className="flex justify-end mt-4">                  
        <Button type="submit" className="bg-[#17995e] hover:bg-[#17995e] text-white text-semibold text-[13px]">Sign Up</Button>
         </div>

      </form>
          <div className={`${paddingX} mt-4 border-t-[1px] border-b-[1px] border-[gainsboro] py-4`}>
            <span className="text-[12px] text-[#8d8d8d] "> Have an account? </span>
          <Button type="button" className="text-[grey] text-[13px] font-semibold bg-[#e3e7ec] hover:bg-[whitesmoke] ml-2" onClick={() => window.location.href = "/login"} >
            Login
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
