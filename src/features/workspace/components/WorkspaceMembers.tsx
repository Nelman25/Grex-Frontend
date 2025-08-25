export default function WorkspaceMembers() {
  // TODO: request to an API endpoint that will return all members of the project
  // shape:
  // { member_id: 423442, profile_pic: "http://sjpodajodaw.com" }
  return (
    <div className="relative flex">
      <img
        src="https://avatar.iran.liara.run/public/boy"
        className="size-7 rounded-full border-2 border-dark-muted -ml-2 first:ml-0"
      />
      <img
        src="https://avatar.iran.liara.run/public/girl"
        className="size-7 rounded-full border-2 border-dark-muted -ml-2"
      />
      <img
        src="https://avatar.iran.liara.run/public"
        className="size-7 rounded-full border-2 border-dark-muted -ml-2"
      />
      <img
        src="https://avatar.iran.liara.run/public/boy?username=Scott"
        className="size-7 rounded-full border-2 border-dark-muted -ml-2"
      />
    </div>
  );
}
