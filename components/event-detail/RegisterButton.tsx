"use client";

import Link from "next/link";

export function RegisterButton({ eventId, canRegister, isFull }: { eventId: string, canRegister: boolean, isFull: boolean }) {
  return (
    <div className="flex flex-col items-center w-full px-2">
      <Link
        href={canRegister ? `/register?eventId=${eventId}` : "#"}
        onClick={(e) => !canRegister && e.preventDefault()}
        className={`
          relative group w-full py-5 px-16 
          font-mono font-black text-[13px] tracking-[0.2em] uppercase text-center
          transition-all duration-500 overflow-hidden whitespace-nowrap
          ${canRegister 
            ? 'text-[#ffb000] border border-[#ffb000]/40 bg-[#ffb000]/5 hover:bg-[#ffb000] hover:text-black hover:shadow-[0_0_50px_rgba(255,176,0,0.5)]' 
            : 'text-gray-700 border border-gray-900 cursor-not-allowed opacity-50'}
        `}
        style={{ 
          /* Shallower 5% slant to protect the long text string */
          clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)' 
        }}
      >
        {/* Shimmer Effect */}
        {canRegister && (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
        )}
        
        <span className="relative z-10 flex items-center justify-center gap-3">
          {canRegister ? (
            <>
              <span className="text-[10px] opacity-70">▶</span>
              INITIALIZE_REGISTRATION
            </>
          ) : isFull ? (
            "CAPACITY_REACHED"
          ) : (
            "PROTOCOL_LOCKED"
          )}
        </span>
      </Link>
      
      {/* Sub-text footer */}
      <div className="mt-4 font-mono text-[9px] tracking-[0.4em] uppercase opacity-40 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${canRegister ? 'bg-amber-500 animate-pulse' : 'bg-red-900'}`} />
        {canRegister ? 'Uplink: Synchronized' : 'Uplink: Access Denied'}
      </div>
    </div>
  )
}