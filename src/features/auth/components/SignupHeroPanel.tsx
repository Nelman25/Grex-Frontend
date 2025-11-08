import logo from "@/assets/Vector.svg";
import { SIGNUP_TEXTS } from "../constants";

export default function SignupHeroPanel() {
  return (
    <div className="flex-1">
      <div className="flex space-x-2 items-center">
        <img src={logo} alt="grex logo" className="w-[24px] h-[32px]" />
        <span className="uppercase font-k2d text-xl text-dark-text">GREX</span>
      </div>

      <div className="font-inter mt-4">
        <span className="text-base lg:text-2xl block text-dark-text font-semibold">Create your Grex account</span>
        <span className="text-sm lg:text-xl block text-dark-subtle">
          Sign up in seconds and start collaborating right away.
        </span>
      </div>

      {SIGNUP_TEXTS.map((f) => (
        <div key={f.description} className="my-13 hidden md:block">
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
