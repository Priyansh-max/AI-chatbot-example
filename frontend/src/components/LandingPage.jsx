import React from 'react'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <span className="font-bold text-sm">S</span>
            </div>
            <span className="font-['Syne'] font-semibold text-lg tracking-tight">Spur</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="max-w-3xl stagger">
          <div className="animate-fadeUp opacity-0">
            <span className="inline-block px-3 py-1 text-xs font-medium text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-6">
              AI-Powered Support
            </span>
          </div>
          <h1 className="animate-fadeUp opacity-0 font-['Syne'] text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            The future of
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              customer support
            </span>
          </h1>
          <p className="animate-fadeUp opacity-0 text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl">
            Experience seamless AI assistance. Get instant answers to your questions, 24/7.
          </p>
          <div className="animate-fadeUp opacity-0 flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-all duration-200 hover:scale-[1.02]">
              Get Started
            </button>
            <button className="px-6 py-3 text-zinc-300 font-medium rounded-lg border border-white/10 hover:bg-white/5 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 border-t border-white/5 bg-[#111113]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-['Syne'] text-3xl md:text-4xl font-bold mb-4">Why choose Spur?</h2>
            <p className="text-zinc-400 max-w-md mx-auto">Everything you need for exceptional customer experience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Lightning Fast",
                desc: "Instant responses powered by advanced AI"
              },
              { 
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Always Available",
                desc: "24/7 support without wait times"
              },
              { 
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Secure & Private",
                desc: "Your data is always protected"
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-['Syne'] font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-['Syne'] text-3xl md:text-4xl font-bold mb-6">
                Built for modern
                <br />
                <span className="text-indigo-400">e-commerce</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Our AI understands your store's policies and provides accurate, helpful responses. Shipping info, return policies, product questions — handled instantly.
              </p>
              <div className="space-y-3">
                {[
                  "Free shipping on orders over $50",
                  "30-day hassle-free returns",
                  "Support hours: Mon-Fri, 9AM-6PM EST"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center animate-float">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-sm">Click the chat button to try it</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 border-t border-white/5 bg-[#111113]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <span className="font-bold text-xs">S</span>
              </div>
              <span className="font-['Syne'] font-semibold">Spur Store</span>
            </div>
            <p className="text-sm text-zinc-500">© 2025 Spur. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

