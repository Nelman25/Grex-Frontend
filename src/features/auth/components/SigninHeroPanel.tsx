import logo from "@/assets/Vector.svg";
import { SIGNIN_TEXTS } from "../constants";

export default function SigninHeroPanel() {
  return (
    <div className="flex-1">
      <div className="flex space-x-2 items-center">
        <img src={logo} alt="grex logo" className="w-[24px] h-[32px]" />
        <span className="uppercase font-k2d text-xl text-dark-text">GREX</span>
      </div>

      <div className="font-inter mt-4">
        <span className="text-lg lg:text-2xl block text-dark-text font-semibold">Welcome Back!</span>
        <span className="text-base lg:text-xl block text-dark-subtle">Pick up right where you left off.</span>
      </div>

      {SIGNIN_TEXTS.map((f) => (
        <div key={f.title} className="my-13 hidden md:block">
          <f.icon className="text-brand-primary size-10" />
          <div className="mt-2">
            <h3 className="text-dark-text text-base font-medium lg:text-xl">{f.title}</h3>
            <p className="text-dark-subtle text-sm lg:text-lg">{f.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
