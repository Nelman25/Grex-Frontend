import ProfileCard from "@/components/profile/ProfileCard";
import UserRecentActivities from "@/components/profile/UserRecentActivities";
import UserTasksStats from "@/components/profile/UserTasksStats";
import UserWorkspaces from "@/components/profile/UserWorkspaces";

export default function Profile() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <ProfileCard />
          <UserTasksStats />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <UserWorkspaces />
          <UserRecentActivities />
        </div>
      </div>
    </div>
  );
}
