
import { Timeline } from "@/components/TimeLine";
import React from "react";
import { Clock, Calendar } from "lucide-react";

export default function SchedulePage() {
  const imageClassName = "block w-full h-auto rounded-lg shadow-xl border border-neutral-800 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-neutral-600 hover:shadow-2xl cursor-pointer object-contain";

  const scheduleData = [
    {
      title: "11th April 2026",
      content: (
        <div key="i-spy" className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex flex-col gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] text-xs font-semibold w-fit uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                9:00 AM — 1:00 PM
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                I-SPY
              </h3>
            </div>
            <p className="mb-8 text-neutral-400 text-sm md:text-lg leading-relaxed">
              Level up your detective skills! Dive into a world of espionage where you'll solve
              complex riddles, crack encryption, and navigate physical challenges to uncover the truth.
            </p>
          </div>
          <div className="flex-1 w-full lg:max-w-xl">
            <img
              src="https://user6853.na.imgto.link/public/20260407/e968b806-2790-497c-96fc-3d9cfbeab002.avif"
              alt="I-Spy Context"
              className={imageClassName}
            />
          </div>
        </div>
      ),
    },
    {
      title: "11th April 2026",
      content: (
        <div key="robosoccer" className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex flex-col gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20 text-[#00D1FF] text-xs font-semibold w-fit uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                1:00 PM — 5:00 PM
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                ROBOSOCCER
              </h3>
            </div>
            <p className="mb-8 text-neutral-400 text-sm md:text-lg leading-relaxed">
              The ultimate mechanical showdown. Watch custom-built robots battle it out on the
              pitch in a high-octane engineering feat where precision meets power.
            </p>
          </div>
          <div className="flex-1 w-full lg:max-w-xl">
            <img
              src="https://user6853.na.imgto.link/public/20260407/7865bfc2-2737-4349-91bf-9a1cc74c6854.avif"
              alt="Robosoccer Field"
              className={imageClassName}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <Timeline
        data={scheduleData}
        title="Event Schedule"
        description="A comprehensive timeline of TechFest 2026. Join us for an unforgettable experience."
      />
    </div>
  );
}


