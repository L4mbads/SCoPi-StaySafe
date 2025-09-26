import Navbar from "@/components/landingpage";
import UserSideBar from "@/components/user_sidebar";
import UserNotificationComponent from "@/components/user_notification";

export default function UserNotification() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1">
        <UserSideBar />

        <main className="flex-1 p-8 overflow-y-auto">
          <UserNotificationComponent />
        </main>
      </div>
    </div>
  );
}