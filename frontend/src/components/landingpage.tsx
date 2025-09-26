import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="h-screen w-full bg-gradient-to-r from-indigo-900 via-blue-700 to-blue-500 flex">
      <div className="absolute top-4 left-6 flex items-center space-x-3">
        <Image
          src="/logo-white.png"
          alt="SCoPi Logo"
          width={81}
          height={81}
          priority
        />
        <div>
          <h1 className="text-white font-semibold text-lg top-4 -pt-3">SCoPi</h1>
          <p className="text-white text-sm pb-4">Smart Contract Co-pilot</p>
        </div>
      </div>

    </main>
  );
}
