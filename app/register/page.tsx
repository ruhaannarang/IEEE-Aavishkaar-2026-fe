import MatrixBackground from "@/components/MatrixBackground";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Closed | Aavishkaar 2026",
  description: "Registration for Aavishkaar 2026 is now closed.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center py-12 px-4 selection:bg-orange/30 transition-colors duration-300 overflow-x-hidden bg-bg-main pb-[500px]">
      <MatrixBackground />
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8 pt-10">
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h1 
            className="text-5xl md:text-7xl font-space font-bold text-white uppercase tracking-widest"
            style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,0.1))" }}
          >
            Terminal <span className="text-red-500">Locked</span>
          </h1>
          <p className="text-sm md:text-base text-red-500 tracking-[0.2em] max-w-2xl mx-auto px-4 font-tech uppercase">
            {"// Registration channel has been closed //"}
          </p>
        </div>

        <div className="relative z-10 w-full flex justify-center">
          <div className="text-center p-12 border border-red-500/30 bg-red-500/5 max-w-md">
            <p className="text-red-500 font-mono text-sm tracking-widest uppercase mb-6">
              ERROR: REGISTRATION_CLOSED
            </p>
            <p className="text-gray-400 font-mono text-xs mb-8">
              The registration portal has been shut down. No further team submissions will be accepted.
            </p>
            <Link 
              href="/events"
              className="inline-block px-8 py-3 border border-red-500/50 text-red-500 font-mono text-xs tracking-widest uppercase hover:bg-red-500/10 transition-all"
            >
              ← Return to Events
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
