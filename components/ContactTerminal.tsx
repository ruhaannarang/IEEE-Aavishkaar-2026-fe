"use client";
import React, { useState } from 'react';
import styled from 'styled-components';

export default function ContactTerminal() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [activeTab, setActiveTab] = useState('info');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('TRANSMITTING...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('TRANSMISSION SUCCESSFUL');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('ERROR: SIGNAL LOST');
      }
    } catch (error) {
      setStatus('ERROR: SYSTEM FAILURE');
    }
  };

  return (
    <StyledWrapper>
      <div className="pipboy-wrapper">
        {/* <input type="radio" id="tab-info" name="pip-tabs" defaultChecked />
        <input type="radio" id="tab-comms" name="pip-tabs" />
        <input type="radio" id="tab-radar" name="pip-tabs" /> */}
        <input 
          type="radio" 
          id="tab-info" 
          name="pip-tabs" 
          checked={activeTab === 'info'} 
          onChange={() => setActiveTab('info')} 
        />
        <input 
          type="radio" 
          id="tab-comms" 
          name="pip-tabs" 
          checked={activeTab === 'comms'} 
          onChange={() => setActiveTab('comms')} 
        />
        <input 
          type="radio" 
          id="tab-radar" 
          name="pip-tabs" 
          checked={activeTab === 'radar'} 
          onChange={() => setActiveTab('radar')} 
        />
        <div className="pipboy-chassis">
          <div className="screw tl" />
          <div className="screw tr" />
          <div className="screw bl" />
          <div className="screw br" />
          <div className="crt-screen">
            <div className="screen-glass" />
            <div className="scanlines" />
            <div className="boot-sequence">
              <header className="top-bar">
                <div className="dynamic-title flicker-text" />
                <div className="line flexible" />
                <div className="stats-info">
                  <span>NET <span className="bold">ONLINE</span></span>
                  <span>SIG <span className="bold">STRONG</span></span>
                  <span className="pulse-icon">📡</span>
                </div>
              </header>
              <main className="middle-section">
                
                {/* TAB 1: INFO */}
                <div className="tab-content content-info">
                  <aside className="side-menu">
                    <div>TEL</div>
                    <div>EML</div>
                    <div>LOC</div>
                    <div className="active-box-static">SYS</div>
                  </aside>
                  <section className="contact-details">
                    <div className="terminal-block">
                       <div className="contact-line">TEL: +1 (555) 019-9323</div>
                       <div className="contact-line">EML: ieeeritb@gmail.com</div>
                    </div>
                    <div className="date"></div>
                  </section>
                  <aside className="right-menu">
                    <div className="hazard-symbol">
                      <div className="hazard-core" />
                    </div>
                    <div className="rad-text">SECURE</div>
                  </aside>
                </div>

                {/* TAB 2: COMMS */}
                <div className="tab-content content-comms">
                  <form onSubmit={handleSubmit} className="pip-form">
                    <div className="form-group">
                      <label>{">"} NAME_</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>{">"} EMAIL_</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>{">"} MESSAGE_</label>
                      <textarea 
                        rows={1} 
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="submit-btn">[ TRANSMIT ]</button>
                    {status && <div className="status-msg flicker-fast">{status}</div>}
                  </form>
                </div>

                {/* TAB 3: RADAR */}
                <div className="tab-content content-radar">
                  <div className="radar-container">
                    <span />
                    <div className="blip" />
                  </div>
                  <div className="radar-text flicker-fast">TRACKING SIGNAL...</div>
                </div>

              </main>
              <footer className="bottom-bar">
                <label htmlFor="tab-info" className="nav-item">INFO</label>
                <div className="line flexible" />
                <label htmlFor="tab-comms" className="nav-item">COMMS</label>
                <div className="line flexible" />
                <label htmlFor="tab-radar" className="nav-item">RADAR</label>
                <div className="line flexible" />
                <div className="radio-visualizer">
                  <div className="bar bar-1" />
                  <div className="bar bar-2" />
                  <div className="bar bar-3" />
                  <div className="bar bar-4" />
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .pipboy-wrapper {
    margin:0 auto;
    --pip-green: #1aff40;
    --pip-glow: rgba(26, 255, 64, 0.6);
    --bg-dark: #020a02;
    --chassis-dark: #1a1a1a;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Courier New", Courier, monospace;
    text-transform: uppercase;
    width: 100%;
    max-width: 650px;
    padding: 1rem;
    box-sizing: border-box;
    container-type: inline-size;
    container-name: pipboy;
  }

  .pipboy-wrapper ::selection {
    background-color: var(--pip-green);
    color: var(--bg-dark);
    text-shadow: none;
  }
  .pipboy-wrapper ::-moz-selection {
    background-color: var(--pip-green);
    color: var(--bg-dark);
    text-shadow: none;
  }

  .pipboy-wrapper input[type="radio"] {
    display: none;
  }

  .pipboy-chassis {
    position: relative;
    width: 100%;
    background-image: radial-gradient(
        rgba(255, 255, 255, 0.04) 1px,
        transparent 1px
      ),
      linear-gradient(135deg, #2b2b2b, #111, #222);
    background-size:
      3px 3px,
      100% 100%;
    padding: 2.5rem;
    border-radius: 2rem;
    box-shadow:
      inset 0 0 20px #000,
      0 20px 40px rgba(0, 0, 0, 0.8),
      0 0 0 2px #333,
      0 5px 15px rgba(26, 255, 64, 0.1);
    border: 2px solid #444;
    box-sizing: border-box;
  }

  .screw {
    position: absolute;
    width: 14px;
    height: 14px;
    background: linear-gradient(45deg, #555, #111);
    border-radius: 50%;
    border: 1px solid #000;
    box-shadow: inset 1px 1px 2px rgba(255, 255, 255, 0.2);
  }

  .screw::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 2px;
    background: #000;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .tl { top: 15px; left: 15px; }
  .tr { top: 15px; right: 15px; transform: rotate(90deg); }
  .bl { bottom: 15px; left: 15px; transform: rotate(180deg); }
  .br { bottom: 15px; right: 15px; transform: rotate(270deg); }

  .crt-screen {
    background-color: var(--bg-dark);
    border-radius: 1.5rem;
    position: relative;
    overflow: hidden;
    border: 8px solid #0a0a0a;
    box-shadow:
      inset 0 0 60px rgba(0, 0, 0, 1),
      0 0 10px rgba(0, 0, 0, 0.8);
    aspect-ratio: 4/3;
    cursor: crosshair;
  }

  .screen-glass {
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: none;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(0, 0, 0, 0.4) 80%
    );
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.9);
  }

  .screen-glass::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 15%;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(26, 255, 64, 0.1),
      transparent
    );
    animation: crtScanline 7s linear infinite;
    pointer-events: none;
    z-index: 11;
  }

  .scanlines {
    position: absolute;
    inset: 0;
    z-index: 9;
    pointer-events: none;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
    background-size: 100% 4px;
  }

  .boot-sequence {
    height: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    color: var(--pip-green);
    text-shadow: 0 0 4px var(--pip-glow);
    animation: turnOnCRT 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    opacity: 0;
  }

  .bold { font-weight: 900; }
  .line {
    height: 2px;
    background-color: var(--pip-green);
    box-shadow: 0 0 8px var(--pip-glow);
    opacity: 0.8;
  }
  .flexible {
    flex-grow: 1;
    margin: 0 10px;
  }

  .top-bar, .bottom-bar {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    font-weight: bold;
  }
  .top-bar { margin-bottom: 1.5rem; }
  .dynamic-title { letter-spacing: 1px; }
  .stats-info { display: flex; gap: 12px; }
  .bottom-bar { margin-top: auto; }
  .nav-item {
    padding: 4px 10px;
    cursor: crosshair;
    border: 1px solid transparent;
    transition: all 0.2s;
  }
  .nav-item:hover {
    background-color: rgba(26, 255, 64, 0.15);
  }

  .middle-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;       /* <-- ADD THIS: Allows the form to scroll */
    scrollbar-width: none;
  }
  .middle-section::-webkit-scrollbar { 
    display: none; 
  }
  .tab-content {
    display: none;
    width: 100%;
    height: 100%;
    margin:auto 0;
    animation: screenGlitch 0.4s ease-out;
  }

  #tab-info:checked ~ .pipboy-chassis .dynamic-title::before { content: "SYS_INFO"; }
  #tab-comms:checked ~ .pipboy-chassis .dynamic-title::before { content: "COMMUNICATIONS"; }
  #tab-radar:checked ~ .pipboy-chassis .dynamic-title::before { content: "LOCAL_RADAR"; }

  #tab-info:checked ~ .pipboy-chassis .content-info,
  #tab-comms:checked ~ .pipboy-chassis .content-comms,
  #tab-radar:checked ~ .pipboy-chassis .content-radar {
    display: flex;
  }

  #tab-info:checked ~ .pipboy-chassis label[for="tab-info"],
  #tab-comms:checked ~ .pipboy-chassis label[for="tab-comms"],
  #tab-radar:checked ~ .pipboy-chassis label[for="tab-radar"] {
    background-color: var(--pip-green);
    color: var(--bg-dark);
    text-shadow: none;
    box-shadow: 0 0 10px var(--pip-glow);
  }

  .content-info {
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .side-menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1rem;
  }
  .active-box-static {
    border: 2px solid var(--pip-green);
    padding: 2px 8px;
    box-shadow: inset 0 0 10px var(--pip-glow);
  }
  .contact-details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .terminal-block {
    background-color: var(--pip-green);
    border-radius: 6px;
    padding: 10px 20px;
    margin-bottom: 5px;
    box-shadow: 0 0 25px var(--pip-glow);
    animation: blockPulse 4s infinite alternate;
  }
  .contact-line {
    font-size: 1.2rem;
    margin: 10px 0;
    color: var(--bg-dark);
    font-weight: bold;
    text-shadow: none;
  }
  .date {
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .right-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .rad-text {
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .hazard-symbol {
    width: 50px;
    height: 50px;
    position: relative;
    background: conic-gradient(
      var(--pip-green) 0deg 60deg,
      transparent 60deg 120deg,
      var(--pip-green) 120deg 180deg,
      transparent 180deg 240deg,
      var(--pip-green) 240deg 300deg,
      transparent 300deg 360deg
    );
    border-radius: 50%;
    animation: radarSpin 8s linear infinite;
    box-shadow: 0 0 15px var(--pip-glow);
  }
  .hazard-core {
    position: absolute;
    inset: 10px;
    background: var(--bg-dark);
    border-radius: 50%;
  }
  .hazard-core::after {
    content: "";
    position: absolute;
    inset: 6px;
    background: var(--pip-green);
    border-radius: 50%;
  }

  .content-comms {
    flex-direction: column;
    width: 100%;
    justify-content: center;
    padding: 0 10px;
  }
  .pip-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .pip-form input, .pip-form textarea {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--pip-green);
    color: var(--pip-green);
    font-family: "Courier New", Courier, monospace;
    font-size: 1rem;
    padding: 4px;
    outline: none;
    resize: none;
    box-shadow: 0 2px 5px -2px var(--pip-glow);
  }
  .pip-form input:focus, .pip-form textarea:focus {
    background: rgba(26, 255, 64, 0.1);
  }
  .submit-btn {
    background: transparent;
    border: 2px solid var(--pip-green);
    color: var(--pip-green);
    font-family: "Courier New", Courier, monospace;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: crosshair;
    padding: 8px;
    margin-top: 10px;
    transition: all 0.2s;
    box-shadow: 0 0 10px var(--pip-glow), inset 0 0 5px var(--pip-glow);
  }
  .submit-btn:hover {
    background: var(--pip-green);
    color: var(--bg-dark);
    text-shadow: none;
  }
  .status-msg {
    text-align: center;
    margin-top: 8px;
    font-weight: bold;
  }

  .content-radar {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
  }
  .radar-container {
    position: relative;
    width: 160px;
    height: 160px;
    background: rgba(26, 255, 64, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: inset 0 0 20px var(--pip-glow);
    border: 2px solid var(--pip-green);
  }
  .radar-container::before {
    content: "";
    position: absolute;
    inset: 20px;
    background: rgba(26, 255, 64, 0.15);
    border-radius: 50%;
    border: 1px dashed rgba(26, 255, 64, 0.3);
  }
  .radar-container::after {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    background: rgba(26, 255, 64, 0.25);
    border-radius: 50%;
    border: 1px solid var(--pip-green);
  }
  .radar-container span {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: transparent;
    transform-origin: top left;
    animation: angularRotation 2s linear infinite;
    box-shadow: 6px -100px 40px -30px var(--pip-green);
    border-top: 2px solid var(--pip-green);
    z-index: 2;
  }
  .blip {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #fff;
    border-radius: 50%;
    top: 35px;
    left: 100px;
    box-shadow: 0 0 10px #fff, 0 0 20px var(--pip-green);
    animation: blipFade 2s infinite;
    z-index: 3;
  }

  .radio-visualizer {
    display: flex;
    gap: 3px;
    align-items: flex-end;
    height: 15px;
    margin-left: 10px;
  }
  .bar {
    width: 4px;
    background-color: var(--pip-green);
    animation: eqBounce 1s infinite alternate;
  }
  .bar-1 { animation-delay: 0.1s; }
  .bar-2 { animation-delay: 0.3s; }
  .bar-3 { animation-delay: 0s; }
  .bar-4 { animation-delay: 0.4s; }

  @keyframes screenGlitch {
    0% { opacity: 0; filter: contrast(200%); transform: translateY(-2px); text-shadow: 3px 0 rgba(255, 0, 0, 0.7), -3px 0 rgba(0, 0, 255, 0.7); }
    20% { opacity: 0.8; text-shadow: -3px 0 rgba(255, 0, 0, 0.7), 3px 0 rgba(0, 0, 255, 0.7); }
    50% { opacity: 0.5; filter: contrast(150%) hue-rotate(20deg); transform: translateY(2px); text-shadow: 2px 0 rgba(255, 0, 0, 0.7), -2px 0 rgba(0, 0, 255, 0.7); }
    100% { opacity: 1; filter: contrast(100%); transform: translateY(0); text-shadow: 0 0 4px var(--pip-glow); }
  }
  @keyframes crtScanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(800%); }
  }
  @keyframes turnOnCRT {
    0% { transform: scale(1, 0.005); opacity: 0; filter: brightness(10); }
    30% { transform: scale(1, 0.005); opacity: 1; filter: brightness(5); }
    60% { transform: scale(1, 1); filter: brightness(2); }
    100% { transform: scale(1, 1); opacity: 1; filter: brightness(1); }
  }
  @keyframes angularRotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes radarSpin { 100% { transform: rotate(360deg); } }
  @keyframes blipFade { 0%, 85% { opacity: 0; } 90% { opacity: 1; transform: scale(1.5); } 100% { opacity: 0; } }
  @keyframes eqBounce { 0% { height: 3px; } 100% { height: 15px; } }
  @keyframes blockPulse { 0% { box-shadow: 0 0 15px var(--pip-glow); } 100% { box-shadow: 0 0 35px var(--pip-glow); } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

  .blink-colon { animation: blink 1s step-end infinite; }
  .flicker-text { animation: flicker 0.15s infinite; }
  .flicker-fast { animation: flicker 0.08s infinite; }
  .pulse-icon { animation: pulse 1.5s infinite ease-in-out; }

  @container pipboy (max-width: 600px) {
    .pipboy-chassis { padding: 1.5rem; border-radius: 1.5rem; }
    .crt-screen { border-width: 5px; }
    .boot-sequence { padding: 1.2rem; }
    .terminal-block .time { font-size: 3rem; }
    .top-bar, .bottom-bar { font-size: 0.8rem; }
    .side-menu, .inventory-list { font-size: 0.85rem; }
    .radar-container { width: 130px; height: 130px; }
    .radar-container::before { inset: 15px; }
    .radar-container::after { width: 40px; height: 40px; }
    .blip { top: 30px; left: 85px; }
    .hazard-symbol { width: 40px; height: 40px; }
    .hazard-core { inset: 8px; }
    .hazard-core::after { inset: 4px; }
  }

  @container pipboy (max-width: 450px) {
    .pipboy-chassis { padding: 1rem; border-radius: 1rem; }
    .crt-screen { border-width: 4px; }
    .boot-sequence { padding: 0.8rem; }
    .terminal-block { padding: 4px 8px; }
    .terminal-block .time { font-size: 1.5rem; }
    .date { font-size: 0.7rem; letter-spacing: 1px; }
    .top-bar { margin-bottom: 0.8rem; }
    .top-bar, .bottom-bar { font-size: 0.6rem; }
    .stats-info { gap: 5px; }
    .flexible { margin: 0 5px; }
    .nav-item { padding: 2px 4px; }
    .side-menu { font-size: 0.6rem; gap: 5px; }
    .inventory-list { font-size: 0.65rem; }
    .rad-text, .radar-text { font-size: 0.6rem; }
    .radar-container { width: 100px; height: 100px; }
    .radar-container::before { inset: 12px; }
    .radar-container::after { width: 30px; height: 30px; }
    .blip { top: 20px; left: 65px; width: 4px; height: 4px; }
    .hazard-symbol { width: 30px; height: 30px; box-shadow: 0 0 10px var(--pip-glow); }
    .hazard-core { inset: 6px; }
    .hazard-core::after { inset: 3px; }
  }
`;