"use client";

export function RegisterButton({ eventId, canRegister, isFull }: { eventId: string, canRegister: boolean, isFull: boolean }) {
  return (
    <div className="flex flex-col items-center w-full px-2">
      <div
        className={`
          relative group w-full py-5 px-16 
          font-mono font-black text-[13px] tracking-[0.2em] uppercase text-center
          transition-all duration-500 overflow-hidden whitespace-nowrap
          text-red-500 border border-red-900 cursor-not-allowed opacity-50
        `}
        style={{ 
          clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)' 
        }}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          <span className="text-[10px] opacity-70">✕</span>
          REGISTRATION_CLOSED
        </span>
      </div>
      
      <div className="mt-4 font-mono text-[9px] tracking-[0.4em] uppercase opacity-40 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-900" />
        Uplink: Severed
      </div>
    </div>
  )
}