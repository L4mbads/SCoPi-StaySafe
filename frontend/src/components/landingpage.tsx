import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="h-screen w-full bg-gradient-to-r from-indigo-900 via-blue-700 to-blue-500">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-3">
          <Image src="/logo-white.png" alt="SCoPi Logo" width={81} height={81} priority />
          <div>
            <h1 className="text-white font-semibold text-lg -pt-3">SCoPi</h1>
            <p className="text-white text-sm pb-3">Smart Contract Co-pilot</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-white">
          <Image src="/profile-picture.png" alt="Profile Picture" width={24} height={24} className="rounded-full" priority />
          <span>Admin User</span>
        </div>
      </div>
    </main>
  );
}
