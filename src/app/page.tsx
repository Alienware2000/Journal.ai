import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="relative w-72 h-72">
        <Image
          src="/voice-journal-logo.png"
          alt="Voice Journal Logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <h1 className="text-3xl font-bold mt-6">Welcome to Voice Journal</h1>
      <p className="mt-4 text-center max-w-md">
        Capture your thoughts and ideas effortlessly with Voice Journal. Start by creating a new entry and let your voice be heard.
      </p>
    </main>
  );
}
