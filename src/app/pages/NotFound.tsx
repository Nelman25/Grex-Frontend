import notFoundHero from "@/assets/404 Error-bro.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="bg-dark-bg flex flex-col items-center justify-center h-screen max-w-screen">
      <img src={notFoundHero} alt="not found hero" className="size-[550px]" />
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-4xl font-bold text-dark-text">404 – Page Not Found</h1>
        <p className="text-dark-subtle text-center text-lg/6 max-w-[450px]">
          The content you’re looking for isn’t available. Check the URL or head back to the homepage.
        </p>
        <Link to="/">
          <Button className="self-center text-lg bg-brand-primary hover:bg-brand-dark mt-4 py-6 px-12">
            Go back to home page
          </Button>
        </Link>
      </div>
    </div>
  );
}
