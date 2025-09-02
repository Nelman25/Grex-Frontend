import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import logo from "@/assets/Vector.svg";
import MainHero from "@/assets/Group 72.svg";
import team from "@/assets/team-add-svgrepo-com.svg";
import getStartedHero from "@/assets/Group 70.svg";
import planAndOrganizeHero from "@/assets/Group 68.svg";
import collaborateHero from "@/assets/Group 69.svg";
import collabIcon from "@/assets/Group.svg";
import planIcon from "@/assets/Group 73.svg";
import { FEATURE_CARDS } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Landing() {
  // TEMPORARY. REMOVE THIS WHEN AUTH IS FINALIZED, CLEAR CACHE WHEN USER LOGGED OUT
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.clear();
  }, [queryClient]);
  return (
    <div className="min-w-screen min-h-screen bg-dark-bg scroll-smooth pb-60">
      <header className="p-4 flex justify-between">
        <div className="flex space-x-4 items-center">
          <img src={logo} alt="grex logo" className="w-[30px] h-[46px]" />
          <span className="uppercase font-k2d text-3xl text-dark-text">
            GREX
          </span>
        </div>

        <div className="flex space-x-4">
          <Link to="/auth/signin">
            <Button className="px-6 py-5 text-lg font-normal text-dark-text bg-dark-surface border border-dark-muted border-t border-t-dark-subtle">
              Log in
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button className="px-6 py-5 text-lg font-normal text-light-text bg-gradient-to-b from-brand-primary to-brand-dark border border-brand-light border-t border-t-brand-soft hover:to-brand-primary">
              Sign up
            </Button>
          </Link>
        </div>
      </header>

      <div className="relative mt-40 mx-auto w-full max-w-[1300px] flex space-x-8">
        <div className="flex-1 flex flex-col space-y-4">
          <h1 className="text-dark-text text-5xl font-semibold">
            All-in-One Collaboration for Modern Teams
          </h1>
          <p className="text-dark-subtle text-lg">
            Plan projects, manage tasks, share files, and communicate in real
            time — all from one web-based platform, with smart assistance from
            @GrexAI.
          </p>
          <div className="flex space-x-4">
            <Button className="px-8 py-7 text-lg font-normal text-light-text bg-gradient-to-b from-brand-primary to-brand-dark border border-brand-light border-t border-t-brand-soft hover:to-brand-primary">
              Get Started for Free
            </Button>
            <Button className="px-8 py-7 text-lg font-normal text-dark-text bg-dark-surface border border-dark-muted border-t border-t-dark-subtle">
              Explore Features
            </Button>
          </div>
        </div>

        <div className="flex-1 flex items-star relative">
          <img
            src={MainHero}
            className="w-full relative z-10"
            alt="Main hero"
          />
        </div>
      </div>

      <div className="relative flex flex-col space-y-4 items-center justify-center max-w-[690px] mx-auto mt-48">
        <div className="absolute -top-30 size-[400px] rounded-full bg-brand-primary opacity-20 blur-[70px] z-0" />
        <h1 className="text-dark-text text-5xl text-center font-semibold">
          Everything Your Team Needs, All in One Place
        </h1>
        <p className="text-dark-subtle text-center text-xl">
          From organizing tasks to tracking progress, Grex keeps your team
          aligned and productive.
        </p>
      </div>

      <div className="flex justify-center space-x-4 mt-40 max-w-[1400px] mx-auto">
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-end pt-52">
            <div className="mb-4">
              <h2 className="text-end font-semibold text-2xl text-dark-text">
                Kickstart Your Next Project with Grex
              </h2>
              <p className="text-end text-lg text-dark-subtle">
                Create a new workspace or import an existing project into Grex —
                and start collaborating instantly.
              </p>
            </div>
            <img src={getStartedHero} className="w-[600px]" alt="" />
          </div>

          <div className="flex flex-col items-end">
            <div className="mb-4">
              <h2 className="text-end font-semibold text-2xl text-dark-text">
                Stay Connected, Work as One
              </h2>
              <p className="text-end text-lg text-dark-subtle">
                Chat, share files, and track progress in real time—stay
                connected and productive with your team, wherever you are.
              </p>
            </div>
            <img src={collaborateHero} className="w-[600px]" alt="" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mx-auto">
          <div className="size-60 bg-blue-800/20 rounded-full flex items-center justify-center mt-1">
            <div className="size-42 bg-blue-800/60 rounded-full flex flex-col space-y-2 items-center py-7">
              <img src={team} alt="team icon" className="size-16" />
              <span className="text-blue-400 font-semibold text-center text-lg">
                Get Started
              </span>
            </div>
          </div>
          <div className="w-0.5 h-40 bg-blue-600 blur-[4px] mt-1" />
          <div className="size-10 rounded-full bg-gray-800 border border-blue-800" />
          <div className="w-0.5 h-40 bg-blue-600 blur-[4px] mt-1" />

          <div className="size-60 bg-green-800/20 rounded-full flex items-center justify-center mt-1">
            <div className="size-42 bg-green-800/60 rounded-full flex flex-col space-y-2 items-center py-7">
              <img src={planIcon} alt="team icon" className="size-16" />
              <span className="text-green-400 font-semibold text-center text-lg">
                Plan & Organize
              </span>
            </div>
          </div>
          <div className="w-0.5 h-40 bg-green-600 blur-[4px] mt-1" />
          <div className="size-10 rounded-full bg-gray-800 border border-green-800" />
          <div className="w-0.5 h-40 bg-green-600 blur-[4px] mt-1" />

          <div className="size-60 bg-yellow-800/20 rounded-full flex items-center justify-center mt-1">
            <div className="size-42 bg-yellow-800/60 rounded-full flex flex-col space-y-2 items-center py-7">
              <img src={collabIcon} alt="team icon" className="size-16" />
              <span className="text-yellow-400 font-semibold text-center text-lg block w-[130px]">
                Collaborate in real-time
              </span>
            </div>
          </div>
          <div className="w-0.5 h-40 bg-yellow-600 blur-[4px] mt-1" />
          <div className="size-10 rounded-full bg-gray-800 border border-yellow-800" />
          <div className="w-0.5 h-40 bg-yellow-600 blur-[4px] mt-1" />
        </div>

        <div className="flex-1 flex flex-col justify-center pt-32">
          <div className="flex flex-col items-end">
            <div className="mb-4">
              <h2 className="font-semibold text-2xl text-dark-text">
                Kickstart Your Next Project with Grex
              </h2>
              <p className="text-lg text-dark-subtle">
                Create a new workspace or import an existing project into Grex —
                and start collaborating instantly.
              </p>
            </div>
            <img src={planAndOrganizeHero} className="w-[600px]" alt="" />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col space-y-4 items-center justify-center max-w-[690px] mx-auto mt-60">
        <div className="absolute -top-30 size-[400px] rounded-full bg-brand-primary opacity-20 blur-[70px] z-0" />
        <h1 className="text-dark-text text-5xl text-center font-semibold">
          Discover What Grex Can Do
        </h1>
        <p className="text-dark-subtle text-center text-xl">
          All the tools you need to plan, collaborate, and keep your team moving
          forward.
        </p>
      </div>

      <div className="max-w-[800px] mx-auto flex flex-col justify-center gap-4 mt-32 font-inter">
        {FEATURE_CARDS.map((feature) => (
          <div
            key={feature.description}
            className="bg-dark-surface/60 rounded border border-dark-muted p-8"
          >
            <div className="size-14 rounded bg-brand-dark p-4 mb-4">
              <feature.icon className="size-6 text-brand-light" />
            </div>
            <h2 className="text-dark-text text-xl font-medium">
              {feature.title}
            </h2>
            <p className="text-dark-subtle">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col space-y-4 items-center justify-center max-w-[690px] mx-auto mt-60">
        <div className="absolute -top-30 size-[400px] rounded-full bg-brand-primary opacity-20 blur-[70px] z-0" />
        <h1 className="text-dark-text text-5xl text-center font-semibold">
          Ready to supercharge your
          <span className="text-brand-primary">team collaboration?</span>
        </h1>
        <p className="text-dark-subtle text-center text-xl">
          Join thousands of teams already using Grex to streamline their
          projects and boost productivity.
        </p>
        <Button className="relative z-10 bg-brand-primary border border-brand-light border-t border-t-brand-soft px-12 py-6 text-light-text text-lg hover:bg-brand-dark mt-4 hover:scale-105 active:scale-100">
          Start Collaborating Now
        </Button>
      </div>
    </div>
  );
}
