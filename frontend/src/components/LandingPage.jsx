import React, { useState, useEffect, useRef } from 'react'

// Custom hook for scroll-based animations
const useScrollAnimation = () => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

const LandingPage = () => {
  const [serverTime, setServerTime] = useState(new Date())
  
  // Refs for scroll animations
  const [headerRef, headerVisible] = useScrollAnimation()
  const [heroRef, heroVisible] = useScrollAnimation()
  const [featuresRef, featuresVisible] = useScrollAnimation()
  const [projectsRef, projectsVisible] = useScrollAnimation()

  useEffect(() => {
    const timer = setInterval(() => {
      setServerTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <header 
        ref={headerRef}
        className={`relative z-10 border-b border-white/5 transition-all duration-700 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <span className="font-bold text-xs sm:text-sm">S</span>
            </div>
            <span className="font-['Syne'] font-semibold text-base sm:text-lg tracking-tight">Spur</span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            {/* Resume */}
            <a 
              href="https://drive.google.com/file/d/1uyyTxK-cKZHcZ87UxFRkXqeH1Emo1TVD/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              title="Resume"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/priyanshagarwal01/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              title="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* GitHub */}
            <a 
              href="https://github.com/Priyansh-max" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              title="GitHub"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            {/* Portfolio */}
            <a 
              href="https://priyanshagarwal.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              title="Portfolio"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section 
        ref={heroRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24"
      >
        <div className="max-w-3xl">
          <div className={`transition-all duration-700 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-normal text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-4 sm:mb-6">
              Spur Hiring Assignment
            </span>
          </div>
          <h1 className={`font-['Syne'] text-4xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6 transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            The future of
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              customer support
            </span>
          </h1>
          <p className={`text-sm sm:text-md text-zinc-400 leading-relaxed mb-4 sm:mb-6 max-w-xl transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Experience seamless AI assistance<br /><span className="text-sm sm:text-md italic text-zinc-400"> get started by clicking the chat button at the bottom right of the screen.</span>
          </p>

          <ul className={`text-sm sm:text-md text-zinc-400 leading-relaxed mb-8 sm:mb-10 max-w-xl list-disc list-inside space-y-1.5 sm:space-y-2 transition-all duration-700 delay-[400ms] ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <li>Instant responses</li>
            <li>24/7 availability</li>
            <li>Secure and private conversations</li>
            <li>Access to past conversation history</li>
          </ul>

          <div className={`flex flex-wrap gap-3 sm:gap-4 transition-all duration-700 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a 
              href="https://drive.google.com/file/d/1uyyTxK-cKZHcZ87UxFRkXqeH1Emo1TVD/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-md bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-all duration-200 hover:scale-[1.02]"
            >
              Resume
            </a>
            <a 
              href="https://priyanshagarwal.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-md text-zinc-300 font-medium rounded-lg border border-white/10 hover:bg-white/5 transition-all duration-200"
            >
              Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* Why Hire Me */}
      <section 
        ref={featuresRef}
        id="features" 
        className="relative z-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 pb-16 sm:pb-24">
          <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-['Syne'] text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Why hire me?</h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-3xl mx-auto px-4">Hi, I'm Priyansh Agarwal <span className="animate-pulse">👋</span>
              <br />
            I build AI systems, GenAI agents, and full-stack products, and I'm always curious about turning complex ideas into simple, usable experiences.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { 
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Ship Fast",
                desc: "I move quickly from idea to production. No overthinking, just clean, working code."
              },
              { 
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "Full-Stack Builder",
                desc: "Frontend to backend, databases to deployment, I own the entire stack."
              },
              { 
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Ownership Mindset",
                desc: "I take full responsibility, from scoping to shipping, debugging to docs."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className={`group p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-700 ${
                  featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: featuresVisible ? `${200 + i * 100}ms` : '0ms' }}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-['Syne'] font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of Work */}
      <section 
        ref={projectsRef}
        className="relative z-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 sm:pb-32">
          <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-['Syne'] text-lg sm:text-xl md:text-2xl font-bold mb-2">Proof of Work</h2>
            <p className="text-zinc-400 max-w-md text-xs sm:text-sm mx-auto">Projects I've built that showcase my skills</p>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                title: "FindMyTeam",
                desc: "A platform for finding open source projects and teams to collaborate and build a profile.",
                tags: ["React", "Node.js", "PostgreSQL", "Redis", "Github API"],
                image: "/images/findmyteam.png",
                link: "https://findmyteam.vercel.app/"
              },
              {
                title: "SearchBot Agent",
                desc: "GenAI-powered platform with browser automation that searches the web and brings detailed answers.",
                tags: ["Python", "Playwright", "FastAPI", "Browser Automation", "Web Scraping"],
                image: "/images/searchgpt.png",
                link: "https://searchbot.live/"
              },
              {
                title: "Gorilla vs 100Humans",
                desc: "A fun game where you compete as a gorilla fighting 100 humans.",
                tags: ["React", "Canvas", "AI Bots", "HTML5", "Nodejs", "2D Web Game"],
                image: "/images/gorillavs100humans.png",
                link: "https://www.gorillavs100humans.games/"
              },
              {
                title: "RedditMastry",
                desc: "A platform that generates high-impact Reddit posts and strategies to boost engagement.",
                tags: ["React", "Gemini API", "PostgreSQL", "AI Agents"],
                image: "/images/redditmastry.png",
                link: "https://redditmastry.vercel.app/"
              }
            ].map((project, i) => (
              <div 
                key={i}
                className={`group flex flex-col rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 overflow-hidden transition-all duration-700 hover:translate-y-[-4px] ${
                  projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: projectsVisible ? `${200 + i * 100}ms` : '0ms' }}
              >
                {/* Image */}
                <div className="relative h-32 sm:h-36 overflow-hidden bg-[#1a1a1d]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 p-3 sm:p-4">
                  <h3 className="font-['Syne'] font-semibold text-xs sm:text-sm mb-1 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                  <p className="text-[10px] sm:text-xs text-zinc-500 mb-2 sm:mb-3 flex-1 line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-zinc-400 hover:text-white transition-colors group/link"
                  >
                    <span>View Project</span>
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        id="contact" 
        className="relative z-10 border-t border-white/5 bg-[#0a0a0b]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <p className="text-xs sm:text-sm text-zinc-500 text-center sm:text-left">
            Made by <a href="https://priyanshagarwal.me/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-indigo-400 transition-colors">Priyansh Agarwal</a>
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs text-zinc-500">Server Active</span>
            </div>
            <span className="text-[10px] sm:text-xs text-zinc-400 font-mono">{formatTime(serverTime)}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
