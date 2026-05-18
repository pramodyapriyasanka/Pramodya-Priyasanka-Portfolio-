import { useEffect, useState, useRef } from "react"
import { supabase } from "@/supabaseClient"

const AchievementsPage = () => {
  const [certifications, setCertifications] = useState([])
  const [education, setEducation] = useState([])
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const { data: certData, error: certError } = await supabase
          .from("certifications")
          .select("*")
          .order("created_at", { ascending: false })

        if (certError) {
          console.error("Failed to load certifications from Supabase:", certError)
        } else {
          setCertifications(Array.isArray(certData) ? certData : [])
        }

        const { data: eduData, error: eduError } = await supabase
          .from("education")
          .select("*")
          .order("created_at", { ascending: false })

        if (eduError) {
          console.error("Failed to load education from Supabase:", eduError)
        } else {
          setEducation(Array.isArray(eduData) ? eduData : [])
        }
      } catch (err) {
        console.error("Error loading achievements:", err)
      }
    }

    loadAchievements()

    const handleDataChange = () => {
      loadAchievements()
    }

    window.addEventListener("portfolio-data-changed", handleDataChange)

    const t = requestAnimationFrame(() => setMounted(true))
    return () => {
      window.removeEventListener("portfolio-data-changed", handleDataChange)
      cancelAnimationFrame(t)
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ─── Orb Floats ─────────────────────────────────────────── */
        @keyframes orb-drift-a {
          0%   { transform: translate(0,   0px) scale(1);    opacity: .55; }
          33%  { transform: translate(18px,-28px) scale(1.06); opacity: .65; }
          66%  { transform: translate(-12px,14px) scale(.97); opacity: .50; }
          100% { transform: translate(0,   0px) scale(1);    opacity: .55; }
        }
        @keyframes orb-drift-b {
          0%   { transform: translate(0,   0px) scale(1);    opacity: .45; }
          40%  { transform: translate(-20px,-18px) scale(1.04); opacity: .58; }
          70%  { transform: translate(14px, 22px) scale(.98); opacity: .42; }
          100% { transform: translate(0,   0px) scale(1);    opacity: .45; }
        }
        @keyframes orb-drift-c {
          0%   { transform: translate(0,   0px) scale(1);   opacity: .40; }
          50%  { transform: translate(10px,-14px) scale(1.03); opacity: .52; }
          100% { transform: translate(0,   0px) scale(1);   opacity: .40; }
        }

        /* ─── Aurora ─────────────────────────────────────────────── */
        @keyframes aurora-shift {
          0%   { transform: translateX(-14%) translateY(0%)  rotate(0deg);   opacity: .55; }
          25%  { transform: translateX(8%)  translateY(-4%) rotate(1.5deg); opacity: .70; }
          50%  { transform: translateX(14%) translateY(-7%) rotate(0deg);   opacity: .62; }
          75%  { transform: translateX(-4%) translateY(-2%) rotate(-1deg);  opacity: .68; }
          100% { transform: translateX(-14%) translateY(0%)  rotate(0deg);   opacity: .55; }
        }

        /* ─── Particles ──────────────────────────────────────────── */
        @keyframes particle-float {
          0%   { transform: translateY(0px)   scale(1);    opacity: 0; }
          15%  { opacity: var(--p-opacity, .18); }
          50%  { transform: translateY(-22px) scale(1.12); opacity: calc(var(--p-opacity, .18) * .6); }
          85%  { opacity: var(--p-opacity, .18); }
          100% { transform: translateY(0px)   scale(1);    opacity: 0; }
        }

        /* ─── Scan line shimmer on cards ─────────────────────────── */
        @keyframes card-shimmer {
          0%   { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(250%)  skewX(-12deg); }
        }

        /* ─── Badge pulse ────────────────────────────────────────── */
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0   0px rgba(32,201,151,.35); }
          50%       { box-shadow: 0 0 0  6px rgba(32,201,151,0);    }
        }

        /* ─── Page entrance ──────────────────────────────────────── */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(.94); }
          to   { opacity: 1; transform: scale(1);   }
        }

        /* ─── Underline draw ─────────────────────────────────────── */
        @keyframes draw-line {
          from { width: 0; }
          to   { width: 100%; }
        }

        /* ─── Section divider glow ───────────────────────────────── */
        @keyframes glow-pulse {
          0%, 100% { opacity: .30; }
          50%      { opacity: .65; }
        }

        /* ─── Apply ──────────────────────────────────────────────── */
        .ach-orb-a { animation: orb-drift-a 26s cubic-bezier(.45,.05,.55,.95) infinite; }
        .ach-orb-b { animation: orb-drift-b 32s cubic-bezier(.45,.05,.55,.95) infinite 3s; }
        .ach-orb-c { animation: orb-drift-c 22s cubic-bezier(.45,.05,.55,.95) infinite 6s; }
        .ach-aurora { animation: aurora-shift 28s ease-in-out infinite; }

        .ach-particle { animation: particle-float var(--p-dur, 14s) ease-in-out infinite var(--p-delay, 0s); }

        .ach-badge-pulse { animation: badge-pulse 2.8s ease-in-out infinite; }

        .page-mounted .hero-label   { animation: fade-up  .55s cubic-bezier(.22,1,.36,1) both .10s; }
        .page-mounted .hero-title   { animation: fade-up  .65s cubic-bezier(.22,1,.36,1) both .22s; }
        .page-mounted .hero-name    { animation: fade-up  .60s cubic-bezier(.22,1,.36,1) both .36s; }
        .page-mounted .hero-desc    { animation: fade-up  .60s cubic-bezier(.22,1,.36,1) both .46s; }

        .page-mounted .section-head { animation: fade-up  .55s cubic-bezier(.22,1,.36,1) both; }
        .page-mounted .ach-card     { animation: scale-in .55s cubic-bezier(.22,1,.36,1) both; }

        /* Card shimmer on hover */
        .ach-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(32,201,151,.07), transparent);
          transform: translateX(-100%) skewX(-12deg);
          pointer-events: none;
          border-radius: inherit;
        }
        .ach-card:hover::after {
          animation: card-shimmer .75s cubic-bezier(.4,0,.2,1) forwards;
        }

        /* Underline on section heading */
        .section-underline {
          display: block;
          height: 1px;
          background: linear-gradient(90deg, #20C997, transparent);
          margin-top: 6px;
          animation: draw-line .8s cubic-bezier(.22,1,.36,1) both .6s;
          width: 0;
        }
        .page-mounted .section-underline { width: auto; }

        .divider-glow { animation: glow-pulse 4s ease-in-out infinite; }

        /* Noise texture */
        .ach-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
      `}} />

      <main
        className={`relative pt-24 min-h-screen bg-[#080b10] text-white overflow-hidden ${mounted ? "page-mounted" : ""}`}
      >
        {/* ── Deep Background Glows ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="ach-orb-a absolute top-[8%]  left-[6%]  h-[480px] w-[480px] rounded-full bg-cyan-500/8  blur-[110px]" />
          <div className="ach-orb-b absolute bottom-[8%] right-[6%] h-[560px] w-[560px] rounded-full bg-violet-500/8 blur-[130px]" />
        </div>

        <section className="relative z-10 container mx-auto px-6 py-24">

          {/* ── Section Atmosphere ── */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[40px]" aria-hidden="true">
            {/* Orbs */}
            <div className="ach-orb-a absolute left-[-10%] top-[-5%]  h-72  w-72  rounded-full bg-[#20C997]/15 blur-[130px]" />
            <div className="ach-orb-b absolute right-[-8%]  top-[8%]   h-96  w-96  rounded-full bg-[#10b981]/12 blur-[150px]" />
            <div className="ach-orb-c absolute left-[12%]  top-[18%]  h-64  w-64  rounded-full bg-[#22d3ee]/12 blur-[130px]" />

            {/* Aurora */}
            <div className="ach-aurora absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(32,201,151,.10),transparent_40%),radial-gradient(ellipse_at_70%_80%,rgba(14,228,206,.07),transparent_40%)] mix-blend-screen" />

            {/* Noise */}
            <div className="ach-noise absolute inset-0 opacity-60" />

            {/* Particles */}
            {[
              { l:"8%",  t:"28%", s:"6px",  c:"#20C997", op:.18, dur:"16s", del:"0s"  },
              { l:"22%", b:"30%", s:"8px",  c:"#20C997", op:.14, dur:"20s", del:"3s"  },
              { r:"16%", t:"20%", s:"5px",  c:"#0ea5e9", op:.16, dur:"13s", del:"6s"  },
              { r:"32%", b:"22%", s:"7px",  c:"#10b981", op:.14, dur:"18s", del:"2s"  },
              { l:"50%", t:"12%", s:"5px",  c:"#22d3ee", op:.12, dur:"22s", del:"9s"  },
              { l:"75%", b:"40%", s:"6px",  c:"#20C997", op:.10, dur:"17s", del:"4s"  },
            ].map((p, i) => (
              <div
                key={i}
                className="ach-particle absolute rounded-full blur-[2px]"
                style={{
                  left: p.l, right: p.r, top: p.t, bottom: p.b,
                  width: p.s, height: p.s,
                  background: p.c,
                  "--p-opacity": p.op,
                  "--p-dur":     p.dur,
                  "--p-delay":   p.del,
                }}
              />
            ))}
          </div>

          {/* ── Hero Header ── */}
          <div className="mx-auto max-w-4xl text-center mb-24 flex flex-col items-center">
            <span className="hero-label inline-flex items-center gap-2 text-[#20C997] text-xs md:text-sm font-bold tracking-[0.30em] uppercase mb-7">
              <span className="block h-px w-6 bg-[#20C997]/60 rounded-full" />
              Achievements
              <span className="block h-px w-6 bg-[#20C997]/60 rounded-full" />
            </span>

            <h1 className="hero-title text-4xl md:text-6xl lg:text-[4rem] leading-[1.08] mb-6">
              <span className="font-sans font-bold text-[#20C997] tracking-tight">Certifications </span>
              <span className="font-serif italic font-normal text-white">and education highlights.</span>
            </h1>

            <p className="hero-name mt-2 text-[#20C997] font-medium tracking-wider text-sm">
              Profile of Pramodya Priyasanka, BSc Software Engineering.
            </p>

            <p className="hero-desc mt-5 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
              Explore my verified certifications and academic milestones, including university degree and graduation year details.
            </p>

            {/* Decorative divider */}
            <div className="mt-10 flex items-center gap-4 w-48 justify-center">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#20C997]/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#20C997]/60" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#20C997]/40" />
            </div>
          </div>

          <div className="space-y-20">

            {/* ══ Education ══ */}
            <div>
              <div
                className="section-head mb-12 flex items-end justify-between gap-4"
                style={{ animationDelay: ".55s" }}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.40em] text-[#20C997] mb-3 flex items-center gap-2">
                    <span className="inline-block h-px w-4 bg-[#20C997]/50 rounded-full" />
                    Education
                  </p>
                  <h2 className="text-3xl font-semibold text-white">
                    Academic journey and graduation milestones.
                  </h2>
                  <span className="section-underline" />
                </div>
              </div>

              {/* Divider */}
              <div className="divider-glow mb-10 h-px w-full bg-gradient-to-r from-transparent via-[#20C997]/30 to-transparent" />

              <div className="grid gap-8 lg:grid-cols-2">
                {education.length > 0 ? education.map((item, i) => (
                  <article
                    key={item.id}
                    className="ach-card group relative overflow-hidden rounded-[28px] border border-white/8 bg-slate-950/75 p-8 shadow-2xl shadow-black/50
                               transition-all duration-500 ease-out
                               hover:-translate-y-2 hover:border-[#20C997]/35
                               hover:shadow-[0_20px_50px_rgba(32,201,151,.08),0_0_0_1px_rgba(32,201,151,.12)]"
                    style={{ animationDelay: `${.65 + i * .12}s` }}
                  >
                    {/* Hover gradient */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#20C997]/6 via-transparent to-[#10b981]/4 pointer-events-none rounded-[28px]" />

                    {/* Top accent bar */}
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#20C997]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 mb-6">
                      <h3 className="text-xl font-semibold text-white group-hover:text-[#20C997] transition-colors duration-300 leading-snug">
                        {item.degree}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400 tracking-wide">{item.institution}</p>
                    </div>

                    <p className="relative z-10 text-sm leading-relaxed text-slate-300/90 mb-7">{item.description}</p>

                    <div className="relative z-10 flex items-center justify-between text-sm text-slate-400 border-t border-white/5 pt-5">
                      <span
                        className="ach-badge-pulse font-medium px-3.5 py-1.5 rounded-full
                                   bg-[#20C997]/10 border border-[#20C997]/20 text-[#20C997] text-xs tracking-wider"
                      >
                        {item.year}
                      </span>
                      <span className="text-xs text-slate-500 tracking-wide">{item.school}</span>
                    </div>
                  </article>
                )) : (
                  <div className="rounded-[28px] border border-white/8 bg-slate-950/70 p-12 text-center text-slate-500 col-span-2">
                    No academic journey details added yet. Please add them from the admin panel.
                  </div>
                )}
              </div>
            </div>

            {/* ══ Certifications ══ */}
            <div>
              <div
                className="section-head mb-12 flex items-end justify-between gap-4"
                style={{ animationDelay: ".75s" }}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.40em] text-[#20C997] mb-3 flex items-center gap-2">
                    <span className="inline-block h-px w-4 bg-[#20C997]/50 rounded-full" />
                    Certifications
                  </p>
                  <h2 className="text-3xl font-semibold text-white">
                    Verified credentials and professional recognition.
                  </h2>
                  <span className="section-underline" />
                </div>
              </div>

              {/* Divider */}
              <div className="divider-glow mb-10 h-px w-full bg-gradient-to-r from-transparent via-[#20C997]/30 to-transparent" />

              <div className="grid gap-8 lg:grid-cols-2">
                {certifications.length > 0 ? certifications.map((cert, i) => (
                  <article
                    key={cert.id}
                    className="ach-card group relative overflow-hidden rounded-[28px] border border-white/8 bg-slate-950/75 p-8 shadow-2xl shadow-black/50 flex flex-col
                               transition-all duration-500 ease-out
                               hover:-translate-y-2 hover:border-[#20C997]/35
                               hover:shadow-[0_20px_50px_rgba(32,201,151,.08),0_0_0_1px_rgba(32,201,151,.12)]"
                    style={{ animationDelay: `${.85 + i * .12}s` }}
                  >
                    {/* Hover gradient */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-bl from-[#20C997]/6 via-transparent to-[#10b981]/4 pointer-events-none rounded-[28px]" />

                    {/* Top accent bar */}
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#20C997]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-[#20C997] transition-colors duration-300 leading-snug">
                          {cert.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-400 tracking-wide">{cert.issuer || cert.institution}</p>
                      </div>
                      <span
                        className="ach-badge-pulse shrink-0 rounded-full bg-[#20C997]/10 border border-[#20C997]/25
                                   px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#20C997]"
                      >
                        {cert.type || "Certification"}
                      </span>
                    </div>

                    {cert.image && (
                      <div className="relative z-10 mb-6 w-full h-48 overflow-hidden rounded-2xl border border-white/8">
                        <img
                          src={cert.image}
                          alt={`${cert.title} Certificate`}
                          className="w-full h-full object-cover opacity-75 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        {/* Image overlay glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#20C997]/8 to-transparent" />
                      </div>
                    )}

                    <p className="relative z-10 text-sm leading-relaxed text-slate-300/90 mb-7 flex-grow">
                      {cert.description}
                    </p>

                    <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-5 mt-auto">
                      <span className="font-medium text-slate-300">{cert.date}</span>
                      <span className="text-slate-500 tracking-wide">
                        {cert.type === "Degree Certification" ? "Academic Credential" : "Professional Achievement"}
                      </span>
                    </div>
                  </article>
                )) : (
                  <div className="rounded-[28px] border border-white/8 bg-slate-950/70 p-12 text-center text-slate-500 col-span-2">
                    No certifications added yet. Please add them from the admin panel.
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}

export default AchievementsPage