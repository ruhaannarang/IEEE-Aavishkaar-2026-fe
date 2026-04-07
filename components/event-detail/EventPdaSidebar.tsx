"use client";

import { useEffect, useMemo, useState } from "react";
import type { TechfestEvent } from "../../types/event";
import { RegisterButton } from "./RegisterButton";
import "../../styles/event-detail-pda.css";
import "../../styles/event-detail-pda.css";

type PdaTab = "status" | "map" | "info" | "sys";

export function EventPdaSidebar({
  event,
  canRegister,
}: {
  event: TechfestEvent;
  canRegister: boolean;
}) {
  const [tab, setTab] = useState<PdaTab>("status");
  const [backlight, setBacklight] = useState(true);
  const [boot, setBoot] = useState(true);
  const [clock, setClock] = useState(() => new Date());

  const reg = event.registrationCount ?? 0;
  const cap = event.maxCapacity;
  const pct = cap > 0 ? Math.min(100, Math.round((reg / cap) * 100)) : 0;
  const isFull = reg >= cap;

  // Boot sequence simulation
  useEffect(() => {
    const t = window.setTimeout(() => setBoot(false), 2800);
    return () => window.clearTimeout(t);
  }, [event.slug]);

  // Real-time clock
  useEffect(() => {
    const id = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const orderId = useMemo(
    () => `${event.slug.toUpperCase().replace(/[^A-Z0-9]/g, "")}-2026`,
    [event.slug]
  );

  const dateStr = useMemo(() => {
    const date = new Date(event.dateTime);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }, [event.dateTime]);

  const timeStr = useMemo(() => {
    const date = new Date(event.dateTime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }, [event.dateTime]);

  const clockStr = clock.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const transitLabel =
    pct >= 100
      ? "AT CAPACITY"
      : pct >= 80
        ? "NEAR CAP"
        : `${reg}/${cap} ENROLLED`;

  return (
    <div className="lg:sticky lg:top-24 space-y-8 relative z-10 flex flex-col items-center">
      {/* --- PHYSICAL HARDWARE DEVICE --- */}
      <div
        className="event-pda"
        data-tab={tab}
        data-backlight={backlight ? "on" : "off"}
      >
        <div className="event-pda__bezel">
          <div className="event-pda__screws" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <svg key={i} className="event-pda__screw" viewBox="0 0 16 16">
                <circle cx={8} cy={8} r={7} fill="#26292f" />
                <path d="M3 8h10" stroke="#70757d" strokeWidth={2} />
              </svg>
            ))}
          </div>

          <button
            type="button"
            className="event-pda__knob"
            onClick={() => setBacklight((b) => !b)}
            aria-label="Toggle backlight"
            aria-pressed={backlight}
          >
            <span className="event-pda__knob-cap" />
          </button>

          <div className="event-pda__led" aria-hidden />

          <div className="event-pda__screen">
            <div className="event-pda__statusbar">
              <div className="event-pda__logo">
                IEEE-RITB<span className="event-pda__blink" aria-hidden />
              </div>
              <div className="event-pda__ind">
                <div className="event-pda__sig" aria-hidden>
                  <span className="event-pda__sb event-pda__sb--1" />
                  <span className="event-pda__sb event-pda__sb--2" />
                  <span className="event-pda__sb event-pda__sb--3" />
                </div>
                <div className="event-pda__bat" aria-hidden>
                  <div className="event-pda__bb">
                    <div className="event-pda__bf" />
                  </div>
                  <div className="event-pda__bt" />
                </div>
                <div className="event-pda__clk">{clockStr}</div>
              </div>
            </div>

            <div
              className={`event-pda__boot ${boot ? "" : "event-pda__boot--hide"}`}
              aria-hidden={!boot}
            >
              <div className="event-pda__bline event-pda__bline--1">
                IEEE-PDA v2.026 (C) TECHFEST
              </div>
              <div className="event-pda__bline event-pda__bline--2">Linking node… OK</div>
              <div className="event-pda__bline event-pda__bline--3">Mounting FS… OK</div>
              <div className="event-pda__bline event-pda__bline--err">
                WARN 021 — HIGH SIGNAL
              </div>
              <div className="event-pda__bprog">
                <div className="event-pda__bfill" />
              </div>
            </div>

            <div className="event-pda__viewport">
              <div className="event-pda__apps">
                {/* --- STATUS TAB --- */}
                <div className="event-pda__app">
                  <div className="event-pda__title">Event status</div>
                  <div className="event-pda__box">
                    <div className="event-pda__kv">
                      <div className="event-pda__k">EVT</div>
                      <div className="event-pda__v">{orderId}</div>
                    </div>
                    <div className="event-pda__kv">
                      <div className="event-pda__k">DATE</div>
                      <div className="event-pda__v">{dateStr}</div>
                    </div>
                    <div className="event-pda__kv">
                      <div className="event-pda__k">STATE</div>
                      <div className="event-pda__v uppercase">{event.registrationStatus}</div>
                    </div>
                  </div>
                  <div className="event-pda__prog">
                    <div className="event-pda__trk" />
                    <div
                      className="event-pda__fill"
                      style={{ width: `calc(${pct}% - 6px)` }}
                    />
                    <div className="event-pda__ticks" aria-hidden />
                    <div className="event-pda__plabel">{transitLabel}</div>
                  </div>
                  <div className="event-pda__timeline">
                    <div className="event-pda__row event-pda__row--done">
                      <span className="event-pda__dot" />
                      <span className="event-pda__rt">BRIEF · PUBLISHED</span>
                    </div>
                    <div className="event-pda__row event-pda__row--done">
                      <span className="event-pda__dot" />
                      <span className="event-pda__rt">REG · {event.registrationStatus}</span>
                    </div>
                  </div>
                </div>

                {/* --- MAP TAB --- */}
                <div className="event-pda__app">
                  <div className="event-pda__title">Venue trace</div>
                  <div className="event-pda__box event-pda__box--map">
                    <svg className="event-pda__map" viewBox="0 0 160 80" aria-hidden>
                      {[15, 35, 55, 75, 95, 115].map((x, i) => (
                        <rect key={i} x={x} y={30} width={8} height={6} className="event-pda__px" />
                      ))}
                      <circle cx={50} cy={32} r={10} className="event-pda__ping" />
                    </svg>
                  </div>
                </div>

                {/* --- INFO TAB --- */}
                <div className="event-pda__app">
                  <div className="event-pda__title">Details</div>
                  <div className="event-pda__box event-pda__scroll">
                    <div className="event-pda__kv">
                      <div className="event-pda__k">TEAM</div>
                      <div className="event-pda__v">{event.minTeamSize}–{event.maxTeamSize}</div>
                    </div>
                    <div className="event-pda__kv">
                      <div className="event-pda__k">CAP</div>
                      <div className="event-pda__v">{cap}</div>
                    </div>
                  </div>
                </div>

                {/* --- SYSTEM TAB --- */}
                <div className="event-pda__app">
                  <div className="event-pda__title">System</div>
                  <div className="event-pda__box">
                    <div className="event-pda__meter">
                      <div className="event-pda__ml">CPU</div>
                      <div className="event-pda__mb"><div className="event-pda__mf event-pda__mf--cpu" /></div>
                      <div className="event-pda__mv">42%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DOCK NAVIGATION */}
            <div className="event-pda__dock" role="tablist">
              {(['status', 'map', 'info', 'sys'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  className={`event-pda__db ${tab === key ? "event-pda__db--active" : ""}`}
                  onClick={() => setTab(key)}
                >
                  <div className="event-pda__ico-placeholder" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- CYBER REGISTRATION BUTTON --- */}
      <div className="w-full px-2">
        <RegisterButton
          eventId={event._id || ''}
          canRegister={canRegister}
          isFull={isFull}
        />
      </div>
    </div>
  );
}