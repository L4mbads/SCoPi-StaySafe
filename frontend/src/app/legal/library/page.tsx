import LandingPage from "@/components/landingpage";
import LegalSideBar from "@/components/legal_sidebar";

export default function ContractLibrary() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Assuming this is a fixed-height bar */}
      <LandingPage />

      {/* Main Layout Container: Use flex to position sidebar and main content */}
      {/* The pt-26 class is likely trying to push content down past the LandingPage component (Navbar). 
        A more common pattern is to make the main content area occupy the remaining vertical space 
        and apply padding to account for a fixed navbar. I'll use a placeholder class for vertical offset. 
        If LandingPage is a fixed navbar, you might need a wrapper div or margin/padding on the main 
        flex container, depending on its height. I'll use a generous padding-top for the main content area.
      */}
      <div className="flex"> 
        
        {/* Sidebar: Give it a fixed width. I'm using w-64 (16rem) as a common sidebar size. */}
        <div className="w-64 flex-shrink-0">
          <LegalSideBar />
        </div>

        {/* Main Content: flex-1 makes it take up all remaining horizontal space. */}
        <main className="flex-1 p-8 pt-20"> 
        {/* I've replaced pl-[16em] with a general p-8 and added pt-20 to push content down 
            below the Navbar/LandingPage component, as pt-26 was previously trying to do. */}
          
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-[#3A3985]">
              Contract & Template Library
            </h1>
            <p className="text-blue-500 italic mt-1">
              Standard templates and contract archives for reference
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-8">
            {/* Template Categories */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-[#3A3985] mb-4">
                Template Categories
              </h2>
              <div className="space-y-3 text-black">
                {[
                  { name: "Supplier Contracts", count: 15 },
                  { name: "Service Contracts", count: 12 },
                  { name: "Consulting Contracts", count: 10 },
                  { name: "Lease Contracts", count: 30 },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="w-full border rounded-md py-3 px-4 text-left hover:bg-gray-100"
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.count} Template
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Supplier Contract Templates */}
            <div className="col-span-2 bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#3A3985]">
                  Supplier Contract Templates
                </h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Add Template
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 text-black">
                {[
                  {
                    title: "Supplier Contracts",
                    desc: "For procurement of goods/materials",
                  },
                  {
                    title: "IT Supplier Templates",
                    desc: "Specifically for IT/technology vendors",
                  },
                  {
                    title: "Supplier Contracts",
                    desc: "For service contracts",
                  },
                  {
                    title: "Supplier Contracts",
                    desc: "For international vendors",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border rounded-lg p-4 shadow-sm"
                  >
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                    <p className="text-xs text-gray-500">
                      Last Updated: January 24, 2025
                    </p>
                    <p className="text-xs text-gray-500 mb-3">Used: 25 times</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-[#DBEAFE] text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                        Export Report
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm">
                        Export Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}