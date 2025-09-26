export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-4/5 bg-blue-500 text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Left Section</h1>
      </div>

      <div className="w-1/5 bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-700">Right Section</p>
      </div>
    </div>
  );
}
