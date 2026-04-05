import RegistrationForm from "@/components/RegistrationForm";
import MatrixBackground from "@/components/MatrixBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aavishkaar 2026 Registration",
  description: "Register your team for Aavishkaar 2026.",
};

export default function Home() {
  const glowColors = ["var(--color-cyan)", "var(--color-orange)", "#ffffff"];
  return (
    <main className="min-h-screen relative flex flex-col items-center py-12 px-4 selection:bg-orange/30 transition-colors duration-300 overflow-x-hidden bg-bg-main pb-[500px]">
      <MatrixBackground />
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8 pt-10">
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h1
            className="text-5xl md:text-7xl font-space font-bold text-white uppercase tracking-widest flex justify-center flex-wrap md:flex-nowrap gap-x-4 md:gap-x-6"
          >
            <div className="flex">
              {"Aavishkaar".split("").map((char, index) => (
                <span
                  key={`title-${index}`}
                  className="animate-letter-glow inline-block"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    "--glow-color": glowColors[index % glowColors.length]
                  } as React.CSSProperties}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="flex text-orange">
              {"2026".split("").map((char, index) => (
                <span
                  key={`year-${index}`}
                  className="animate-letter-glow inline-block"
                  style={{
                    animationDelay: `${(10 + index) * 0.15}s`,
                    "--glow-color": glowColors[(10 + index) % glowColors.length]
                  } as React.CSSProperties}
                >
                  {char}
                </span>
              ))}
            </div>
          </h1>
          <p className="text-sm md:text-base text-cyan tracking-[0.2em] max-w-2xl mx-auto px-4 font-tech uppercase">
            {"// Secure your spot in the ultimate tech event //"}
          </p>
        </div>

        <div className="relative z-10 w-full flex justify-center">
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}
