import SigninForm from "./SigninForm";
import SocialButtonsContainer from "./SocialButtonsContainer";

export default function SigninPanel() {
  return (
    <div className="flex-1 bg-gradient-to-br from-[#F2F2F2]/15 to-[#7E7E7E]/15 rounded py-16 px-14">
      <SocialButtonsContainer signin />

      <div className="flex space-x-4 items-center my-8">
        <div className="bg-dark-subtle h-0.5 flex-1" />
        <span className="text-dark-text">Or continue with email</span>
        <div className="bg-dark-subtle h-0.5 flex-1" />
      </div>

      <SigninForm />

      <div className="flex flex-col space-y-6 items-center justify-center">
        <p className="text-dark-subtle text-center">
          By creating an account, you agree to Grex's{" "}
          <span className="text-dark-text font-semibold underline">
            Terms of Service and Privacy
          </span>
        </p>
        <p className="text-center text-dark-text">
          Don't have an account?{" "}
          <span className="text-brand-primary font-semibold">Sign in</span>
        </p>
      </div>
    </div>
  );
}
