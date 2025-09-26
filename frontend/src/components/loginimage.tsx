import Image from "next/image";

export default function LoginImage() {
  return (
    <div className="w-913/1368 h-screen relative hidden md:block">
      <Image src="/login-bg.png" alt="Login Background" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-blue-900/40" />
    </div>
  );
}
