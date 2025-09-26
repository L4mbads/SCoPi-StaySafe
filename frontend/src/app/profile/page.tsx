import UserSideBar from "@/components/user_sidebar";
import LandingPage from "@/components/landingpage";
import Profile from "@/components/profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <LandingPage />

      <div className="flex pt-26">
        {/* Sidebar */}
        <UserSideBar />
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Profile */}
          <Profile />
        </div>
      </div>
    </div>
  );
}
