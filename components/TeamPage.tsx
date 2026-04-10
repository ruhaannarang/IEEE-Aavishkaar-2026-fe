
"use client";

import React, { useState } from "react";

type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
  linkedin: string;
};

const teamMembers: Member[] = [
  { id: 1, name: "Nabhanyu Bhatmurge", role: "Chair", image: "https://media.licdn.com/dms/image/v2/D4E03AQE_ika6Ehdudg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726256258961?e=1776902400&v=beta&t=sSnz0AH82fzkViI2A4f-2F4wpep8-Pd4U3in0gH_n8w", linkedin: "https://www.linkedin.com/in/nabhanyu-bhatmurge/" },
  { id: 2, name: "Dhriti Kanthote", role: "Vice Chair", image: "https://user6858.na.imgto.link/public/20260407/image-2.avif", linkedin: "https://www.linkedin.com/in/dhriti-kanthote-4ba844354/" },
  { id: 3, name: "Navya Ullas Rai", role: "Secretary", image: "https://media.licdn.com/dms/image/v2/D5603AQEOKF6RdQ3iLw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727040844000?e=1776902400&v=beta&t=4sdhmt44DL9nz-aNvYE_XygA17U40bYAm9Qqvzwkgdw", linkedin: "https://www.linkedin.com/in/navya-ullas-rai-05884b2b2/" },
  { id: 4, name: "Ridhi Wadhwani", role: "Vice Secretory", image: "https://user6853.na.imgto.link/public/20260407/36bd0b1d-8abc-4b0e-8713-e8eb540981f8.avif", linkedin: "https://www.linkedin.com/in/ridhi-wadhwani/" },
  { id: 5, name: "Aditi Ramanan", role: "Convener", image: "https://user6853.na.imgto.link/public/20260407/whatsapp-image-2026-04-07-at-4-29-59-pm.avif", linkedin: "https://www.linkedin.com/in/aditi-ramanan-6a5bb3376/" },
  { id: 6, name: "Charith A Kottary", role: "Vice-Convener", image: "https://user6858.na.imgto.link/public/20260407/image.avif", linkedin: "https://www.linkedin.com/in/charith-a-kottary-259118332/" },
  { id: 7, name: "Mayra Bhatnagar", role: "Vice Treasurer", image: "https://user6858.na.imgto.link/public/20260407/image-1.avif", linkedin: "https://www.linkedin.com/in/mayra-bhatnagar-284b9923b/" },
  { id: 8, name: "Shivesh Tiwari", role: "Tech Head", image: "https://media.licdn.com/dms/image/v2/D5603AQG19KjflJoyPA/profile-displayphoto-shrink_200_200/B56ZZ4c2uGHUAY-/0/1745777553105?e=1776902400&v=beta&t=AHaN2LfjIPDIG9gGs26PZHRlvKOVXq4DWuKGxFRXjAc", linkedin: "https://www.linkedin.com/in/shivesh-tiwari-88b451242/" },
  { id: 9, name: "Ahad Ulla Baig", role: "Vice Tech Head", image: "https://user6858.na.imgto.link/public/20260407/image-3.avif", linkedin: "https://www.linkedin.com/in/ahadullabaig/" },
  { id: 10, name: "Karan SJ", role: "Web Resources Chair", image: "https://media.licdn.com/dms/image/v2/D5603AQHF3T8cHwSusg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1705587748017?e=1776902400&v=beta&t=t1V8OsYScPH1yVzQjCWCz46wxKnB8mGLGHR71FFEtfg", linkedin: "https://www.linkedin.com/in/karan-sj-820460296/" },
  { id: 11, name: "Manjeet Roy", role: "Co Head", image: "https://media.licdn.com/dms/image/v2/D5603AQGGhtb4IvXLmw/profile-displayphoto-scale_200_200/B56Zxs7nk6G4AY-/0/1771354095054?e=1776902400&v=beta&t=MZCxc9In6Ak0vf6TJFqx4j6Pg3j4rtZMWqNCF-9eBPY", linkedin: "https://www.linkedin.com/in/manjeet70/" },
  { id: 12, name: "Ruhaan Narang", role: "Execom", image: "https://user6853.na.imgto.link/public/20260407/img-20260314-181548720-hdr-portrait.avif", linkedin: "https://www.linkedin.com/in/ruhaannarang/" },
  { id: 13, name: "Sanskar Tiwari", role: "Execom", image: "https://avatars.githubusercontent.com/u/256406371?s=400&u=18145e323a182ce44a9cb192aa0015e28ca0af1e&v=4", linkedin: "https://www.linkedin.com/in/sanskar-tiwari-24b826394?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { id: 14, name: "Sai Ranjith R", role: "Execom", image: "https://user6858.na.imgto.link/public/20260407/photo-2026-04-07-17-34-08.avif", linkedin: "https://www.linkedin.com/in/sai-ranjith-r-8a5609384?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { id: 15, name: "Archee Khandelwal", role: "Execom", image: "https://user6853.na.imgto.link/public/20260407/b380a9f9-705a-482a-b946-700e91c0dcf1.avif", linkedin: "https://www.linkedin.com/in/archee-khandelwal-4a84932b5/" },
  { id: 16, name: "Pragati Singh", role: "Execom", image: "https://media.licdn.com/dms/image/v2/D5603AQFJcSfmL7s50w/profile-displayphoto-scale_200_200/B56Z1oacD6KgAY-/0/1775573263147?e=1776902400&v=beta&t=M5kLuPq6RkcxPWP_cv7eetGHiorEQLi4b4_gESviVjE", linkedin: "https://www.linkedin.com/in/pragati-singh-859319387/" }

];

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="card-wrapper"
      style={{ animationDelay: `${index * 0.07}s` }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <div className="card-face card-front">
          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />
          <div className="img-frame glitch glitchOrange">
            <img src={member.image} alt={member.name} />
            <div className="img-overlay" />
          </div>
          <div className="front-content">
            <p className="member-name">{member.name}</p>
            <p className="hover-hint">{member.role}</p>
          </div>
        </div>

        <div className="card-face card-back">
          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />
          <div className="grid-lines" />
          <div className="back-content">
            <div className="id-tag">ID_{String(member.id).padStart(3, "0")}</div>
            <p className="back-name">{member.name}</p>
            <div className="divider" />
            <p className="back-role">{member.role}</p>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              VIEW PROFILE
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-wrapper {
          perspective: 1000px;
          width: 280px;
          height: 380px;
          opacity: 0;
          animation: fadeIn 0.6s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .card-inner.flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 10px;
          overflow: hidden;
          background: #0d0d14;
          border: 1px solid rgba(255, 100, 30, 0.25);
          box-shadow: 0 0 20px rgba(255, 80, 20, 0.08), inset 0 0 30px rgba(0, 0, 0, 0.5);
        }
        .corner-tl, .corner-tr, .corner-bl, .corner-br {
          position: absolute;
          width: 16px; height: 16px;
          z-index: 10;
        }
        .corner-tl { top: 6px; left: 6px; border-top: 2px solid #ff5a1e; border-left: 2px solid #ff5a1e; border-radius: 2px 0 0 0; }
        .corner-tr { top: 6px; right: 6px; border-top: 2px solid #1e8fff; border-right: 2px solid #1e8fff; border-radius: 0 2px 0 0; }
        .corner-bl { bottom: 6px; left: 6px; border-bottom: 2px solid #1e8fff; border-left: 2px solid #1e8fff; border-radius: 0 0 0 2px; }
        .corner-br { bottom: 6px; right: 6px; border-bottom: 2px solid #ff5a1e; border-right: 2px solid #ff5a1e; border-radius: 0 0 2px 0; }

        .front-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          flex: 1;
          gap: 6px;
          padding: 12px;
          position: relative;
          z-index: 2;
        }
        .img-frame {
          position: relative;
          width: 100%;
          height: 310px;
          padding: 12px 12px 0 12px;
          background-color: #0a0b12;

          border-bottom: 0px solid rgba(255, 90, 30, 0.3);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .card-wrapper:hover .img-frame {
          transform: scale(1.05);
          border-color: #ff5a1e;
          box-shadow: 0 0 30px rgba(255, 90, 30, 0.5);
        }
        .img-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-bottom-left-radius:10px;
          border-bottom-right-radius:10px;
          filter: saturate(0.8) contrast(1.1);
          display: block;
          
        }
        .img-overlay {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
          pointer-events: none;
        }
        .member-name {
          color: #f0ece4;
          font-family: 'Courier New', monospace;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-align: center;
          margin-top: 5px;
        }
        .hover-hint {
          color: rgba(255, 90, 30, 0.5);
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .card-back {
          transform: rotateY(180deg);
          background: #080c14;
          border-color: rgba(30, 143, 255, 0.3);
          box-shadow: 0 0 20px rgba(30, 143, 255, 0.1), inset 0 0 30px rgba(0, 0, 0, 0.6);
        }
        .grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(30,143,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,143,255,0.04) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .back-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 10px;
          padding: 24px 16px;
        }
        .id-tag {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: rgba(30, 143, 255, 0.6);
          letter-spacing: 0.2em;
          background: rgba(30, 143, 255, 0.08);
          padding: 4px 10px;
          border: 1px solid rgba(30, 143, 255, 0.2);
          border-radius: 2px;
        }
        .back-name {
          color: #f0ece4;
          font-family: 'Courier New', monospace;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
        }
        .divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ff5a1e, transparent);
        }
        .back-role {
          color: rgba(255, 90, 30, 0.85);
          font-family: 'Courier New', monospace;
          font-size: 14px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .linkedin-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
          padding: 7px 14px;
          background: transparent;
          border: 1px solid rgba(30, 143, 255, 0.5);
          border-radius: 3px;
          color: #1e8fff;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .linkedin-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(30, 143, 255, 0.1);
          transform: translateX(-100%);
          transition: transform 0.2s ease;
        }
        .linkedin-btn:hover::before {
          transform: translateX(0);
        }
        .linkedin-btn:hover {
          border-color: #1e8fff;
          box-shadow: 0 0 12px rgba(30, 143, 255, 0.3);
          color: #fff;
        }
      `}</style>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="teampage-container">
      <div className="noise" />
      <div className="grid-bg" />

      <header className="page-header pt-24 text-center">
        <p className="event-label">◈ TECHFEST 2026 · TEAM ROSTER</p>
        <h1 className="page-title">
          THE <span className="accent-orange">BUILDERS</span>
          <br />
          <span className="accent-blue">BEHIND THE</span> CODE
        </h1>
        <div className="title-line" />
        <p className="subtitle">RETRO FUTURE DIVISION · CLASS OF 2026</p>
      </header>

      <div className="members-grid">
        {teamMembers.map((m, i) => (
          <MemberCard key={m.id} member={m} index={i} />
        ))}
      </div>

      <footer className="page-footer">
        <span>◈ END OF ROSTER ◈</span>
      </footer>

      <style jsx>{`
        .teampage-container {
          min-height: 100vh;
          background: #070810;
          position: relative;
          overflow-x: hidden;
          padding: 0 40px 80px;
          font-family: var(--font-tech), monospace;
          width: 100%;
        }
        .noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
        .grid-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background-image:
            linear-gradient(rgba(30,143,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,143,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .page-header {
          position: relative;
          z-index: 10;
          margin-bottom: 60px;
        }
        .event-label {
          color: rgba(30, 143, 255, 0.6);
          font-size: 16px;
          letter-spacing: 0.4em;
          margin-bottom: 24px;
        }
        .page-title {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(40px, 9vw, 90px);
          font-weight: 900;
          color: #e8e4dc;
          line-height: 1.05;
          letter-spacing: 0.06em;
          margin-bottom: 24px;
        }
        .accent-orange { color: #ff5a1e; text-shadow: 0 0 30px rgba(255,90,30,0.4); }
        .accent-blue { color: #1e8fff; text-shadow: 0 0 30px rgba(30,143,255,0.4); }
        .title-line {
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, #ff5a1e, #1e8fff);
          margin: 0 auto 14px;
          border-radius: 2px;
        }
        .subtitle {
          color: rgba(232, 228, 220, 0.3);
          font-size: 14px;
          letter-spacing: 0.5em;
        }
        .members-grid {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 60px;
          justify-items: center;
          padding: 0 5vw;
          width: 100%;
          max-width: 1800px;
          margin: 0 auto;
        }
        .page-footer {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-top: 60px;
          color: rgba(255, 90, 30, 0.3);
          font-size: 11px;
          letter-spacing: 0.3em;
        }
      `}</style>
    </div>
  );
}