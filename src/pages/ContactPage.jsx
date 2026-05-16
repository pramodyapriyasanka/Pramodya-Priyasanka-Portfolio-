import { Contact } from "@/sections/Contact";

const ContactPage = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ─── GPU hints ─── */
        .ct-orb, .ct-aurora, .ct-spark, .ct-pulse, .ct-ring {
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        /* ─── Orb 1 — slow, deep sine ─── */
        @keyframes ct-orb-1 {
          0%   { transform: translate(-50%,-50%) translateY(0px)   scale(1);    }
          30%  { transform: translate(-50%,-50%) translateY(-20px)  scale(1.06); }
          65%  { transform: translate(-50%,-50%) translateY(-36px)  scale(1.11); }
          100% { transform: translate(-50%,-50%) translateY(0px)   scale(1);    }
        }
        /* ─── Orb 2 — mid offset ─── */
        @keyframes ct-orb-2 {
          0%   { transform: translate(-50%,-50%) translateY(0px)   scale(1);    }
          45%  { transform: translate(-50%,-50%) translateY(-24px)  scale(1.07); }
          100% { transform: translate(-50%,-50%) translateY(0px)   scale(1);    }
        }
        /* ─── Orb 3 — slow drift ─── */
        @keyframes ct-orb-3 {
          0%   { transform: translate(-50%,-50%) translateY(0px)  scale(1);    }
          55%  { transform: translate(-50%,-50%) translateY(-16px) scale(1.04); }
          100% { transform: translate(-50%,-50%) translateY(0px)  scale(1);    }
        }
        /* ─── Orb 4 — bottom anchor ─── */
        @keyframes ct-orb-4 {
          0%   { transform: translate(-50%,-50%) translateY(0px)  scale(1);    }
          50%  { transform: translate(-50%,-50%) translateY(-12px) scale(1.03); }
          100% { transform: translate(-50%,-50%) translateY(0px)  scale(1);    }
        }
        .ct-orb-1 { animation: ct-orb-1 26s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .ct-orb-2 { animation: ct-orb-2 20s cubic-bezier(0.37, 0,    0.63, 1   ) infinite 4s; }
        .ct-orb-3 { animation: ct-orb-3 32s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite 2s; }
        .ct-orb-4 { animation: ct-orb-4 22s cubic-bezier(0.37, 0,    0.63, 1   ) infinite 6s; }

        /* ─── Aurora — wide cinematic sweep ─── */
        @keyframes ct-aurora {
          0%   { transform: translateX(-22%) translateY(0%)   skewX(0deg);    opacity: 0.50; }
          20%  { transform: translateX(-8%)  translateY(-4%)  skewX(1.2deg);  opacity: 0.68; }
          50%  { transform: translateX(22%)  translateY(-8%)  skewX(0deg);    opacity: 0.82; }
          80%  { transform: translateX(8%)   translateY(-3%)  skewX(-1.2deg); opacity: 0.65; }
          100% { transform: translateX(-22%) translateY(0%)   skewX(0deg);    opacity: 0.50; }
        }
        .ct-aurora { animation: ct-aurora 30s cubic-bezier(0.37, 0, 0.63, 1) infinite; }

        /* ─── Sparkles — 5 independent paths ─── */
        @keyframes ct-sp-a {
          0%   { transform: translateY(0px)   translateX(0px)  scale(1);    opacity: 0.18; }
          30%  { transform: translateY(-14px)  translateX(5px)  scale(1.16); opacity: 0.30; }
          65%  { transform: translateY(-9px)   translateX(-4px) scale(0.88); opacity: 0.11; }
          100% { transform: translateY(0px)   translateX(0px)  scale(1);    opacity: 0.18; }
        }
        @keyframes ct-sp-b {
          0%   { transform: translateY(0px)  translateX(0px)  scale(1);    opacity: 0.15; }
          50%  { transform: translateY(-19px) translateX(-6px) scale(1.22); opacity: 0.27; }
          100% { transform: translateY(0px)  translateX(0px)  scale(1);    opacity: 0.15; }
        }
        @keyframes ct-sp-c {
          0%   { transform: translateY(0px)  translateX(0px) scale(1);    opacity: 0.13; }
          40%  { transform: translateY(-11px) translateX(7px) scale(1.12); opacity: 0.24; }
          80%  { transform: translateY(-16px) translateX(2px) scale(0.93); opacity: 0.09; }
          100% { transform: translateY(0px)  translateX(0px) scale(1);    opacity: 0.13; }
        }
        @keyframes ct-sp-d {
          0%   { transform: translateY(0px)  translateX(0px)  scale(1);    opacity: 0.16; }
          55%  { transform: translateY(-22px) translateX(-3px) scale(1.18); opacity: 0.26; }
          100% { transform: translateY(0px)  translateX(0px)  scale(1);    opacity: 0.16; }
        }
        @keyframes ct-sp-e {
          0%   { transform: translateY(0px)  translateX(0px)  scale(1);    opacity: 0.12; }
          45%  { transform: translateY(-8px)  translateX(-8px) scale(1.08); opacity: 0.20; }
          100% { transform: translateY(0px)  translateX(0px)  scale(1);    opacity: 0.12; }
        }
        .ct-sp-a { animation: ct-sp-a 13s cubic-bezier(0.45,0.05,0.55,0.95) infinite; }
        .ct-sp-b { animation: ct-sp-b 19s cubic-bezier(0.37,0,0.63,1)        infinite 2s; }
        .ct-sp-c { animation: ct-sp-c 16s cubic-bezier(0.45,0.05,0.55,0.95) infinite 5s; }
        .ct-sp-d { animation: ct-sp-d 23s cubic-bezier(0.37,0,0.63,1)        infinite 1s; }
        .ct-sp-e { animation: ct-sp-e 28s cubic-bezier(0.45,0.05,0.55,0.95) infinite 3.5s; }

        /* ─── Pulse glow heartbeat ─── */
        @keyframes ct-pulse {
          0%   { transform: scale(1);    opacity: 0.10; }
          50%  { transform: scale(1.12); opacity: 0.22; }
          100% { transform: scale(1);    opacity: 0.10; }
        }
        .ct-pulse-1 { animation: ct-pulse 18s cubic-bezier(0.37,0,0.63,1) infinite; }
        .ct-pulse-2 { animation: ct-pulse 24s cubic-bezier(0.37,0,0.63,1) infinite 6s; }

        /* ─── Rotating ring ─── */
        @keyframes ct-ring-spin {
          0%   { transform: translate(-50%,-50%) rotate(0deg)   scale(1);    opacity: 0.06; }
          50%  { transform: translate(-50%,-50%) rotate(180deg) scale(1.04); opacity: 0.12; }
          100% { transform: translate(-50%,-50%) rotate(360deg) scale(1);    opacity: 0.06; }
        }
        @keyframes ct-ring-spin-rev {
          0%   { transform: translate(-50%,-50%) rotate(0deg)    scale(1);    opacity: 0.05; }
          50%  { transform: translate(-50%,-50%) rotate(-180deg) scale(1.06); opacity: 0.10; }
          100% { transform: translate(-50%,-50%) rotate(-360deg) scale(1);    opacity: 0.05; }
        }
        .ct-ring-1 { animation: ct-ring-spin     70s linear infinite; }
        .ct-ring-2 { animation: ct-ring-spin-rev 90s linear infinite 5s; }

        /* ─── Noise texture ─── */
        .ct-noise {
          background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ─── Scanline shimmer (ultra-subtle depth) ─── */
        @keyframes ct-scanline {
          0%   { background-position: 0% 0%;   }
          100% { background-position: 0% 100%; }
        }
        .ct-scanline {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.008) 3px,
            rgba(255,255,255,0.008) 4px
          );
          animation: ct-scanline 8s linear infinite;
        }
      `}} />

      <main className="relative pt-20 min-h-screen bg-[#080b10] text-white overflow-hidden">

        {/* ── Layer 1 — deep ambient orbs ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top-left cyan */}
          <div className="ct-orb ct-orb-1 absolute top-[8%]   left-[12%]  h-[520px] w-[520px] rounded-full bg-cyan-500/10    blur-[110px] opacity-55 mix-blend-screen" />
          {/* Top-right violet */}
          <div className="ct-orb ct-orb-2 absolute top-[5%]   right-[-8%] h-[460px] w-[460px] rounded-full bg-violet-500/10  blur-[120px] opacity-48 mix-blend-screen" />
          {/* Bottom-left emerald */}
          <div className="ct-orb ct-orb-3 absolute bottom-[-8%] left-[-8%] h-[600px] w-[600px] rounded-full bg-emerald-500/8  blur-[130px] opacity-38 mix-blend-screen" />
          {/* Bottom-right teal */}
          <div className="ct-orb ct-orb-4 absolute bottom-[5%]  right-[8%]  h-[380px] w-[380px] rounded-full bg-teal-500/8    blur-[100px] opacity-35 mix-blend-screen" />
        </div>

        {/* ── Layer 2 — inner depth system (aurora + sparkles + rings + noise) ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Aurora sweep */}
          <div className="ct-aurora absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(14,41,78,0.28),_transparent_40%),radial-gradient(ellipse_at_left,_rgba(34,211,238,0.10),_transparent_32%),radial-gradient(ellipse_at_right,_rgba(139,92,246,0.08),_transparent_34%),radial-gradient(ellipse_at_bottom,_rgba(16,185,129,0.06),_transparent_30%)] mix-blend-screen opacity-90" />

          {/* Noise dot grid */}
          <div className="absolute inset-0 ct-noise opacity-100" />

          {/* Scanline depth */}
          <div className="ct-scanline absolute inset-0 pointer-events-none" />

          {/* Pulse blobs */}
          <div className="ct-pulse ct-pulse-1 absolute left-[48%] top-[38%] h-72 w-72 rounded-full bg-[#0e2950]/18 blur-[200px]" />
          <div className="ct-pulse ct-pulse-2 absolute left-[30%] top-[60%] h-56 w-56 rounded-full bg-violet-900/12    blur-[180px]" />

          {/* Rotating rings — large decorative halos */}
          <div className="ct-ring ct-ring-1 absolute left-[50%] top-[50%] h-[900px] w-[900px] rounded-full border border-cyan-400/8" />
          <div className="ct-ring ct-ring-2 absolute left-[50%] top-[50%] h-[1200px] w-[1200px] rounded-full border border-violet-400/5" />

          {/* Sparkles */}
          <div className="ct-spark ct-sp-a absolute left-[7%]   top-[15%]    h-1.5 w-1.5 rounded-full bg-white/15      blur-sm" />
          <div className="ct-spark ct-sp-b absolute left-[18%]  bottom-[30%] h-2   w-2   rounded-full bg-cyan-400/22    blur-sm" />
          <div className="ct-spark ct-sp-c absolute right-[14%] top-[22%]    h-1.5 w-1.5 rounded-full bg-violet-400/18  blur-sm" />
          <div className="ct-spark ct-sp-d absolute right-[26%] bottom-[18%] h-2   w-2   rounded-full bg-emerald-400/16 blur-sm" />
          <div className="ct-spark ct-sp-e absolute left-[55%]  top-[68%]    h-1.5 w-1.5 rounded-full bg-teal-400/14    blur-sm" />
        </div>

        {/* ── Content ── */}
        <Contact />
      </main>
    </>
  );
};

export default ContactPage;