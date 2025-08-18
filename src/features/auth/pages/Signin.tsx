// import SigninForm from "../components/SigninPanel";
import SigninHeroPanel from "../components/SigninHeroPanel";
import SigninPanel from "../components/SigninPanel";

export default function Signin() {
  return (
    <div>
      <div className="relative max-w-screen min-h-screen bg-dark-bg py-20 before:content-[''] before:absolute before:size-[500px] before:blur-[500px] before:-top-10 before:right-[40%] before:rounded-full before:bg-brand-primary/30 before:pointer-events-none">
        <div className="max-w-[1400px] space-x-24 mx-auto w-full flex justify-between">
          <SigninHeroPanel />
          <SigninPanel />
        </div>
      </div>
    </div>
  );
}
