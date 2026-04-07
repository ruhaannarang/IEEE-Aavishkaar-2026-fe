import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchEventBySlug } from "@/api/client"
import { EventDetailLiveBg } from "@/components/event-detail/EventDetailLiveBg"
import { EventPdaSidebar } from "@/components/event-detail/EventPdaSidebar"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { RulesWin95Panel } from "@/components/event-detail/RulesWin95Panel"

interface EventDetailPageProps {
  params: { slug: string }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params
  const event = await fetchEventBySlug(slug)
  
  if (!event) {
    notFound()
  }

  // Visual Assets
  const hero = event.posterURL ?? "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80";
  
  // Strict Registration Logic
  const currentCount = event.registrationCount ?? 0;
  const isFull = currentCount >= event.maxCapacity;
  const isOpen = event.registrationStatus === "OPEN";
  const canRegister = isOpen && !isFull;

  return (
    <div className="relative min-h-screen bg-[#05070d] text-on-surface selection:bg-orange/30">
      {/* Animated Background Layer */}
      <EventDetailLiveBg />

      {/* Hero Section */}
      <section className="relative z-10 min-h-[450px] w-full overflow-hidden flex items-end">
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          }}
        >
          <img
            src={hero}
            alt=""
            className="w-full h-full object-cover object-[center_15%] opacity-50 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent z-20" />
          <div className="absolute inset-0 scanline opacity-15 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 pb-12">
          <nav className="flex mb-6 text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase gap-3 items-center">
            <Link href="/" className="hover:text-orange transition-colors">HOME</Link>
            <span className="opacity-30">/</span>
            <Link href="/events" className="hover:text-orange transition-colors">EVENTS</Link>
            <span className="opacity-30">/</span>
            <span className="text-orange/80">{event.title}</span>
          </nav>
          
          <h1 className="font-headline text-5xl md:text-8xl font-black text-white leading-none tracking-tighter drop-shadow-[0_0_20px_rgba(255,176,0,0.2)] uppercase">
            {event.title}
          </h1>
          
          {event.tagline && (
            <p className="mt-4 font-mono text-sm md:text-lg text-orange tracking-[0.2em] uppercase opacity-80">
              {`// ${event.tagline}`}
            </p>
          )}
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-10 gap-16">
        
        {/* Left Column: Details & Rules */}
        <div className="lg:col-span-7 space-y-20">
          
          {/* Description Section */}
          <section>
            <SectionHeader title="Mission_Overview" accent="primary-container" />
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light italic">
              {event.description.split("\n").map((para, i) => (
                <p key={i} className="first-letter:text-3xl first-letter:text-orange first-letter:font-bold">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Rules Section */}
          <section className="bg-white/5 backdrop-blur-md p-8 border-l-4 border-orange/60 relative overflow-hidden rounded-r-lg">
            <h3 className="font-mono text-xl font-black mb-8 tracking-[0.2em] uppercase text-white flex items-center gap-3">
              <span className="w-2 h-2 bg-orange animate-pulse" />
              Execution_Protocol
            </h3>
            <RulesWin95Panel rules={event.rules} eventSlug={event.slug} />
          </section>

          {/* FAQ Section */}
          {event.faqs.length > 0 && (
            <section>
              <SectionHeader title="Query_Buffer" accent="secondary-container" />
              <div className="space-y-3">
                {event.faqs.map((f, i) => (
                  <details key={i} className="group bg-white/5 border border-white/10 rounded-md transition-all hover:border-orange/30">
                    <summary className="flex justify-between items-center p-5 cursor-pointer list-none font-mono text-sm tracking-widest uppercase">
                      <span className="group-open:text-orange transition-colors">{f.question}</span>
                      <span className="text-orange group-open:rotate-180 transition-transform duration-300">▼</span>
                    </summary>
                    <div className="px-5 pb-5 text-gray-400 border-t border-white/5 pt-4 text-sm leading-relaxed">
                      {f.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sticky PDA & Button */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit space-y-8">
          
          {/* Hardware PDA Component */}
          <EventPdaSidebar event={event} canRegister={canRegister} />

        </aside>

      </main>
    </div>
  )
}