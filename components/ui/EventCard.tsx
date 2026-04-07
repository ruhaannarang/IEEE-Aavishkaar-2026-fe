"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { TechfestEvent } from "../../types/event";

/* ── UI-ONLY VISUAL THEMES (Mapped to your 2 slugs) ────────────────────────── */
const THEMES: Record<string, { emoji: string; glow: string; accent: string; secondary: string }> = {
  ispy: {
    emoji: "🔍",
    glow: "#f59e0b",    // Amber
    accent: "#fbbf24",
    secondary: "#78350f"
  },
  "robo-soccer": {
    emoji: "🤖",
    glow: "#00d2fd",    // Cyber Blue
    accent: "#22d3ee",
    secondary: "#083344"
  },
};

const DEFAULT_THEME = {
  emoji: "👾",
  glow: "#8b5cf6",
  accent: "#a78bfa",
  secondary: "#2e1065"
};

/* ── Sub-Component: Matrix Canvas Banner ────────────────────────────────────── */
function MatrixBanner({ 
  accentColor, 
  glowColor, 
  secondaryGlow, 
  emoji, 
  hovered 
}: { 
  accentColor: string; 
  glowColor: string; 
  secondaryGlow: string; 
  emoji: string; 
  hovered: boolean 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth || 300;
    const H = 178;
    canvas.width = W;
    canvas.height = H;

    const fs = 11;
    const cols = Math.floor(W / fs);
    dropsRef.current = Array.from({ length: cols }, () => Math.floor(Math.random() * H));

    let frame: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fs}px monospace`;
      ctx.fillStyle = accentColor + "bb";
      for (let i = 0; i < dropsRef.current.length; i++) {
        const ch = String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96));
        ctx.fillText(ch, i * fs, dropsRef.current[i]);
        if (dropsRef.current[i] > H && Math.random() > 0.975) dropsRef.current[i] = 0;
        else dropsRef.current[i] += fs;
      }
      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, [accentColor]);

  return (
    <div style={{ position: "relative", height: 178, overflow: "hidden", background: "#07070e" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: hovered ? 0.8 : 0.3, transition: "opacity 0.4s" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
        <div style={{ 
          width: hovered ? 70 : 60, height: hovered ? 70 : 60, borderRadius: "50%", 
          border: `1px solid ${accentColor}`, display: "flex", alignItems: "center", justifyContent: "center", 
          fontSize: hovered ? "30px" : "24px", transition: "all 0.4s",
          boxShadow: hovered ? `0 0 20px ${glowColor}` : "none",
          background: "rgba(0,0,0,0.5)"
        }}>
          {emoji}
        </div>
      </div>
    </div>
  );
}

/* ── Main Component: EventCard ──────────────────────────────────────────────── */
// export function EventCard({ event }: { event: TechfestEvent }) {
//   const [hovered, setHovered] = useState(false);
//   const [btnHovered, setBtnHovered] = useState(false);

//   const theme = THEMES[event.slug] || DEFAULT_THEME;
//   const dateObj = new Date(event.dateTime);
//   const displayDate = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
//   const displayTime = dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

//   return (
//     <Link href={`/events/${event.slug}`} className="block no-underline group">
//       <div
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         style={{
//           position: "relative",
//           width: "100%",
//           borderRadius: 12,
//           background: "#0f0f17",
//           border: `1.5px solid ${hovered ? theme.glow : "rgba(255,255,255,0.08)"}`,
//           boxShadow: hovered ? `0 0 30px ${theme.glow}33` : "none",
//           transform: hovered ? "translateY(-5px)" : "none",
//           transition: "all 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
//           overflow: "hidden",
//         }}
//       >
//         <MatrixBanner
//           accentColor={theme.accent}
//           glowColor={theme.glow}
//           secondaryGlow={theme.secondary}
//           emoji={theme.emoji}
//           hovered={hovered}
//         />

//         {/* Info Strip */}
//         <div className="flex bg-black/40 border-y border-white/5 font-mono text-[10px] text-gray-500 uppercase">
//           <div className="flex-1 p-2 text-center border-r border-white/5">
//             {displayTime}
//           </div>
//           <div className="flex-1 p-2 text-center border-r border-white/5">
//             {displayDate}
//           </div>
//           <div className="flex-1 p-2 text-center">
//             TEAM: {event.minTeamSize}-{event.maxTeamSize}
//           </div>
//         </div>

//         {/* Coordinators */}
//         <div className="px-4 py-3 flex flex-wrap gap-x-5 gap-y-2 bg-black/40 border-b border-white/10 font-mono text-xs">
//           {event.coordinators.map((c, i) => (
//             <div key={i} className="flex gap-2 items-center">
//               <span
//                 style={{ color: theme.accent }}
//                 className="font-bold uppercase tracking-wider"
//               >
//                 {c.name}
//               </span>
//               <span className="text-gray-300 font-medium">
//                 {c.contactNumber}
//               </span>
//               {i < event.coordinators.length - 1 && (
//                 <span className="text-gray-600">|</span>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Body */}
//         <div className="p-5">
//           <h3 className="font-mono font-black text-2xl text-white mb-2 uppercase tracking-tight">
//             {event.title}
//           </h3>
//           <p className="text-sm text-gray-500 line-clamp-2 mb-5 leading-relaxed">
//             {event.tagline || event.description}
//           </p>

//           <button
//             onMouseEnter={() => setBtnHovered(true)}
//             onMouseLeave={() => setBtnHovered(false)}
//             style={{
//               width: "100%",
//               padding: "12px 0",
//               fontFamily: "monospace",
//               fontWeight: 900,
//               fontSize: "12px",
//               letterSpacing: "0.2em",
//               borderRadius: "4px",
//               background: btnHovered ? theme.accent : "transparent",
//               color: btnHovered ? "#000" : theme.accent,
//               border: `1px solid ${theme.accent}`,
//               transition: "all 0.3s",
//               cursor: "pointer",
//             }}
//           >
//             INITIALIZE PROTOCOL →
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// }

/* ── Main Component: EventCard ──────────────────────────────────────────────── */
export function EventCard({ event }: { event: TechfestEvent }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const theme = THEMES[event.slug] || DEFAULT_THEME;
  const dateObj = new Date(event.dateTime);
  const displayDate = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const displayTime = dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <Link href={`/events/${event.slug}`} className="block no-underline group">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          width: "100%",
          borderRadius: 12,
          background: "#0f0f17",
          border: `1.5px solid ${hovered ? theme.glow : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered ? `0 0 30px ${theme.glow}33` : "none",
          transform: hovered ? "translateY(-5px)" : "none",
          transition: "all 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
          overflow: "hidden",
        }}
      >
        <MatrixBanner
          accentColor={theme.accent}
          glowColor={theme.glow}
          secondaryGlow={theme.secondary}
          emoji={theme.emoji}
          hovered={hovered}
        />

        {/* Info Strip */}
        <div className="flex bg-black/40 border-y border-white/5 font-mono text-[10px] text-gray-500 uppercase">
          <div className="flex-1 p-2 text-center border-r border-white/5">{displayTime}</div>
          <div className="flex-1 p-2 text-center border-r border-white/5">{displayDate}</div>
          <div className="flex-1 p-2 text-center">TEAM: {event.minTeamSize}-{event.maxTeamSize}</div>
        </div>

        {/* Prize Pool Section - NEW */}
        <div className="grid grid-cols-3 border-b border-white/5 bg-black/20">
          {event.prizePool.map((p, idx) => (
            <div 
              key={idx} 
              className={`p-3 text-center ${idx < 2 ? 'border-r border-white/5' : ''}`}
            >
              <div className="text-[9px] uppercase tracking-tighter text-gray-500 mb-1">
                {p.position === 1 ? '1ST' : p.position === 2 ? '2ND' : '3RD'} PRIZE
              </div>
              <div 
                className="font-mono font-bold text-sm" 
                style={{ color: hovered ? theme.accent : 'white', transition: 'color 0.4s' }}
              >
                ₹{p.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-mono font-black text-2xl text-white mb-2 uppercase tracking-tight">
            {event.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-5 leading-relaxed">
            {event.tagline || event.description}
          </p>

          {/* Coordinators moved here for cleaner flow */}
          <div className="mb-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px]">
            {event.coordinators.map((c, i) => (
              <span key={i} className="text-gray-400">
                <span style={{ color: theme.accent }}>●</span> {c.name}
              </span>
            ))}
          </div>

          <button
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              width: "100%",
              padding: "12px 0",
              fontFamily: "monospace",
              fontWeight: 900,
              fontSize: "12px",
              letterSpacing: "0.2em",
              borderRadius: "4px",
              background: btnHovered ? theme.accent : "transparent",
              color: btnHovered ? "#000" : theme.accent,
              border: `1px solid ${theme.accent}`,
              transition: "all 0.3s",
              cursor: "pointer",
            }}
          >
            INITIALIZE PROTOCOL →
          </button>
        </div>
      </div>
    </Link>
  );
}