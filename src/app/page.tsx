import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            MSME Service Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant assistance for your Micro, Small, and Medium Enterprise needs. 
            Ask questions about registrations, loans, compliance, and more.
          </p>
        </header>
        <ChatInterface />
      </div>
    </div>
  );
}
