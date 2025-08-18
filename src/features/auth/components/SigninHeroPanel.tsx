import logo from "@/assets/Vector.svg";
import { SIGNIN_TEXTS } from "../constants";

export default function SigninHeroPanel() {
  return (
    <div className="flex-1">
      <div className="flex space-x-2 items-center">
        <img src={logo} alt="grex logo" className="w-[30px] h-[46px]" />
        <span className="uppercase font-k2d text-3xl text-dark-text">GREX</span>
      </div>

      <div className="font-inter mt-4">
        <span className="text-3xl block text-dark-text font-bold">
          Welcome Back!
        </span>
        <span className="text-xl block text-dark-subtle">
          Pick up right where you left off.
        </span>
      </div>

      {SIGNIN_TEXTS.map((f) => (
        <div key={f.title} className="my-13">
          <f.icon className="text-brand-primary size-14" />
          <div className="mt-4">
            <h3 className="text-dark-text text-lg font-semibold">{f.title}</h3>
            <p className="text-dark-subtle text-lg">{f.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
