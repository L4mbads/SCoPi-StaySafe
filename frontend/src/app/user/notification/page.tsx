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
        <div className="flex-1 pl-[15em] pr-5">

          {/* Notification */}
          <UserNotificationComponent/ >
        </div>
      </div>
    </div>
  );
}
