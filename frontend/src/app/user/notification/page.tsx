import LandingPage from "@/components/landingpage";
import UserSideBar from "@/components/user_sidebar";
import UserNotificationComponent from "@/components/user_notification";

export default function UserNotification() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <LandingPage />

      <div className="flex pt-26">
        {/* Sidebar */}
        <UserSideBar />
        {/* Main Content */}
        <div className="flex-1 p-6">

          {/* Notification */}
          <UserNotificationComponent/ >
        </div>
      </div>
    </div>
  );
}
