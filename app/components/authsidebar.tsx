import { Link } from "react-router";

function AuthSidebar() {

  return (
    <>
      <div className="p-[3rem] ">
        <h4 className="pt-[5rem] text-6xl font-medium tracking-[0.5rem] lg:text-5xl md:text-5xl">
          AUTOMATED
        </h4>
        <h6 className="text-[3.5rem] font-[300] lg:text-[3rem] md:text-[3rem]">
          TRADING
        </h6>
        <span className="text-[1.9rem] font-[200] leading-8">PLATFORM.</span>

        <p className="text-sm font-[300] text-gray-500 mt-5 ">
          Next-Gen Automated Crypto Trading – Smarter, <br /> Faster,
          Profitable.
        </p>

        <div className="pt-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-red-600 text-[11px] w-fit font-extrabold transition-all duration-500 hover:scale-[1.48] hover:ml-[2rem]"
          >
            KNOW MORE{" "}
            <img
              src="https://atporg.com/assets/img/right-arrow.svg"
              alt=""
              className="w-[25px] h-[25px]"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default AuthSidebar;
