import noProjectHero from "@/assets/noProjectHero.svg";

export default function NoProject() {
  return (
    <div className="w-full h-[600px] flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center mt-8">
        <img src={noProjectHero} alt="No project hero" />
        <div className="mt-4 text-center">
          <h3 className="text-dark-text font-semibold text-lg">
            You currently don't belong to any projects
          </h3>
          <p className="text-dark-subtle">
            Start by creating one yourself, or join when a workspace leader
            invites you.
          </p>
        </div>
      </div>
    </div>
  );
}
