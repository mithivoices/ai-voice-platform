import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="font-display bg-[#f6f6f8] text-[#0e121b] antialiased overflow-x-hidden">
      {/* TopNavBar */}
      <div className="sticky top-0 z-50 w-full border-b border-solid border-[#e7ebf3] bg-[#f6f6f8]/95 backdrop-blur-sm">
        <div className="flex justify-center">
          <div className="flex flex-col max-w-[1200px] flex-1 px-4 lg:px-8">
            <header className="flex items-center justify-between whitespace-nowrap py-3">
              <div className="flex items-center gap-3 text-[#0e121b]">
                <div className="flex items-center justify-center text-[#2463eb]">
                  <span className="material-symbols-outlined text-3xl">smart_toy</span>
                </div>
                <h2 className="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em]">Mithivoices</h2>
              </div>
              <div className="flex flex-1 justify-end gap-8">
                <div className="hidden md:flex items-center gap-6">
                  <a className="text-[#0e121b] hover:text-[#2463eb] transition-colors text-sm font-medium leading-normal" href="#">Home</a>
                  <a className="text-[#0e121b] hover:text-[#2463eb] transition-colors text-sm font-medium leading-normal" href="#features">Features</a>
                  <a className="text-[#0e121b] hover:text-[#2463eb] transition-colors text-sm font-medium leading-normal" href="#pricing">Pricing</a>
                  <a className="text-[#0e121b] hover:text-[#2463eb] transition-colors text-sm font-medium leading-normal" href="#">About</a>
                  <a className="text-[#0e121b] hover:text-[#2463eb] transition-colors text-sm font-medium leading-normal" href="#">Contact</a>
                </div>
                <div className="flex gap-3">
                  <Link to="/signin" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-transparent text-[#0e121b] text-sm font-bold leading-normal hover:bg-slate-100 transition-colors">
                    <span className="truncate">Sign In</span>
                  </Link>
                  <Link to="/signup" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-[#2463eb] hover:bg-blue-700 text-white text-sm font-bold leading-normal transition-colors">
                    <span className="truncate">Get Started</span>
                  </Link>
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>

      {/* HeroSection - Left text, Right visual */}
      <div className="relative flex h-auto w-full flex-col bg-[#f6f6f8] overflow-hidden">
        <div className="flex h-full grow flex-col">
          <div className="flex flex-1 justify-center py-5">
            <div className="flex flex-col max-w-[1200px] flex-1 px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-10 md:py-16 items-center">
                {/* Left Content - TEXT */}
                <div className="flex flex-col gap-6 text-left">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-[#0e121b] dark:text-white text-4xl md:text-5xl font-black leading-[1.15] tracking-[-0.033em]">
                      Transform Text<br />into <span className="text-[#2563eb]">Lifelike AI<br />Voices</span>
                    </h1>
                    <p className="text-[#4d6599] dark:text-gray-400 text-base font-normal leading-relaxed max-w-md">
                      A privacy-first AI voice platform built for speed, quality, and control.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/signup" className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#2463eb] hover:bg-blue-700 text-white text-sm font-bold leading-normal transition-all">
                      <span className="truncate">Try Free</span>
                    </Link>
                    <button className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-white border border-slate-200 text-[#0e121b] text-sm font-bold leading-normal hover:bg-slate-50 transition-colors gap-2">
                      <span className="material-symbols-outlined text-base">play_circle</span>
                      <span className="truncate">Watch Demo</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#4d6599] dark:text-gray-500">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    <span>Built with privacy-first principles and secure AI voice processing.</span>
                  </div>
                </div>
                
                {/* Right Visual - Audio Waveform */}
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-[480px] rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '16/10' }}>
                    {/* Dark background with waveform visualization */}
                    <div className="w-full h-full bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#0a1628] flex items-center justify-center relative">
                      {/* Waveform bars */}
                      <div className="flex items-center justify-center gap-[3px] h-full w-full px-8">
                        {[
                          20, 35, 55, 75, 90, 100, 95, 80, 60, 45, 30, 40, 55, 70, 85, 95, 100, 90, 75, 55, 40, 25,
                          30, 45, 60, 80, 95, 100, 92, 78, 60, 42, 28, 35, 50, 68, 82, 94, 100, 88, 70, 52, 35, 22
                        ].map((height, i) => (
                          <div 
                            key={i} 
                            className="w-[6px] rounded-full"
                            style={{ 
                              height: `${height * 0.6}%`,
                              background: `linear-gradient(to top, #1e88e5, #42a5f5, #64b5f6)`,
                              opacity: 0.9,
                              boxShadow: '0 0 8px rgba(33, 150, 243, 0.5)'
                            }}
                          />
                        ))}
                      </div>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2463eb]/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Core Capabilities */}
      <div className="relative flex h-auto w-full flex-col bg-white py-16" id="features">
        <div className="flex justify-center">
          <div className="flex flex-col max-w-[1200px] flex-1 px-4 lg:px-8">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3 text-center items-center">
                <div className="inline-flex items-center gap-1 text-[#2463eb] text-sm font-semibold">
                  <span className="material-symbols-outlined text-sm">widgets</span>
                  Features
                </div>
                <h2 className="text-[#0e121b] dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.02em]">
                  Core Capabilities
                </h2>
                <p className="text-[#4d6599] dark:text-gray-400 text-sm font-normal leading-normal max-w-lg">
                  Everything you need for next-generation AI voice applications.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 - Professional TTS */}
                <Link to="/text-to-speech" className="flex flex-col gap-3 rounded-xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#2463eb]">
                    <span className="material-symbols-outlined text-2xl">record_voice_over</span>
                  </div>
                  <h3 className="text-[#0e121b] text-base font-bold leading-tight">Professional TTS</h3>
                  <p className="text-[#4d6599] text-sm leading-relaxed">Generate human-like speech from text with local AI models. Choose from over 50+ diverse voices.</p>
                </Link>
                {/* Card 2 - Accurate STT */}
                <Link to="/speech-to-text" className="flex flex-col gap-3 rounded-xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#2463eb]">
                    <span className="material-symbols-outlined text-2xl">mic</span>
                  </div>
                  <h3 className="text-[#0e121b] dark:text-white text-base font-bold leading-tight">Accurate STT</h3>
                  <p className="text-[#4d6599] dark:text-gray-400 text-sm leading-relaxed">Transcribe audio into text with high accuracy. Optimized for real-time processing and live captions.</p>
                </Link>
                {/* Card 3 - AI Voice Chat */}
                <Link to="/voice-chat" className="flex flex-col gap-3 rounded-xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#2463eb]">
                    <span className="material-symbols-outlined text-2xl">forum</span>
                  </div>
                  <h3 className="text-[#0e121b] text-base font-bold leading-tight">AI Voice Chat</h3>
                  <p className="text-[#4d6599] dark:text-gray-400 text-sm leading-relaxed">Interact with AI using natural voice conversation. Optimized for seamless, real-time interaction.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - Why Mithivoices? */}
      <div className="relative flex h-auto w-full flex-col bg-[#f6f6f8] py-16">
        <div className="flex justify-center">
          <div className="flex flex-col max-w-[1200px] flex-1 px-4 lg:px-8">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-[#0e121b] text-2xl md:text-3xl font-bold leading-tight tracking-[-0.02em]">
                  Why Mithivoices?
                </h2>
                <p className="text-[#4d6599] text-sm font-normal">Built for privacy, speed, and uncompromising quality.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Benefit 1 */}
                <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-sm">
                  <div className="text-[#2463eb]">
                    <span className="material-symbols-outlined text-2xl">security</span>
                  </div>
                  <h3 className="text-[#0e121b] dark:text-white text-sm font-bold">Privacy First</h3>
                  <p className="text-[#4d6599] dark:text-gray-400 text-xs leading-normal">Designed with privacy-first architecture and secure AI processing.</p>
                </div>
                {/* Benefit 2 */}
                <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-sm">
                  <div className="text-[#2463eb]">
                    <span className="material-symbols-outlined text-2xl">bolt</span>
                  </div>
                  <h3 className="text-[#0e121b] text-sm font-bold">Lightning Fast</h3>
                  <p className="text-[#4d6599] text-xs leading-normal">Optimized for low-latency real-time voice applications on consumer hardware.</p>
                </div>
                {/* Benefit 3 */}
                <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-sm">
                  <div className="text-[#2463eb]">
                    <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                  </div>
                  <h3 className="text-[#0e121b] text-sm font-bold">Professional Quality</h3>
                  <p className="text-[#4d6599] text-xs leading-normal">Studio-grade audio output indistinguishable from human speech.</p>
                </div>
                {/* Benefit 4 */}
                <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-sm">
                  <div className="text-[#2463eb]">
                    <span className="material-symbols-outlined text-2xl">thumb_up</span>
                  </div>
                  <h3 className="text-[#0e121b] text-sm font-bold">Easy to Use</h3>
                  <p className="text-[#4d6599] text-xs leading-normal">Simple interface and developer-friendly integration via local API.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="relative flex h-auto w-full flex-col bg-white py-16 border-t border-slate-100" id="pricing">
        <div className="flex justify-center">
          <div className="flex flex-col max-w-[1200px] flex-1 px-4 lg:px-8">
            <div className="flex flex-col items-center gap-3 mb-10 text-center">
              <h2 className="text-[#0e121b] dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.02em]">Simple, Transparent Pricing</h2>
              <p className="text-[#4d6599] dark:text-gray-400 text-sm">Pricing is based on usage limits, support, and platform features.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Free Tier */}
              <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6">
                <div>
                  <h3 className="text-[#0e121b] text-base font-bold mb-1">Free</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#0e121b] text-3xl font-black tracking-tight">$0</span>
                    <span className="text-[#4d6599] text-sm font-medium">/mo</span>
                  </div>
                </div>
                <button className="w-full h-9 rounded-lg bg-white border border-slate-200 text-[#0e121b] text-sm font-bold hover:bg-slate-50 transition-colors">
                  Get Started
                </button>
                <div className="flex flex-col gap-2.5 text-sm text-[#0e121b]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb] text-lg">check</span>
                    <span>Local TTS Engine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb] text-lg">check</span>
                    <span>Basic Usage Limits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb] text-lg">check</span>
                    <span>Community Support</span>
                  </div>
                </div>
              </div>
              {/* Starter Tier */}
              <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6">
                <div>
                  <h3 className="text-[#0e121b] text-base font-bold mb-1">Starter</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#0e121b] text-3xl font-black tracking-tight">$5</span>
                    <span className="text-[#4d6599] text-sm font-medium">/mo</span>
                  </div>
                </div>
                <button className="w-full h-9 rounded-lg bg-[#2463eb] hover:bg-blue-700 text-white text-sm font-bold transition-colors">
                  Subscribe
                </button>
                <div className="flex flex-col gap-2.5 text-sm text-[#0e121b]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb] text-lg">check</span>
                    <span>Higher Usage Limits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb] text-lg">check</span>
                    <span>Priority Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb] text-lg">check</span>
                    <span>Commercial Use License</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb] text-lg">check</span>
                    <span>API Access</span>
                  </div>
                </div>
              </div>
              {/* Semi-annual Tier - BEST VALUE */}
              <div className="flex flex-col gap-5 rounded-xl border-2 border-[#2463eb] bg-white p-6 relative">
                <div className="absolute -top-3 right-4 bg-[#2463eb] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Best Deal
                </div>
                <div>
                  <h3 className="text-[#0e121b] text-base font-bold mb-1">Starter Semi-annual</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#0e121b] text-3xl font-black tracking-tight">$25</span>
                    <span className="text-[#4d6599] text-sm font-medium">/6 mo</span>
                  </div>
                </div>
                <button className="w-full h-9 rounded-lg bg-[#2463eb] hover:bg-blue-700 text-white text-sm font-bold transition-colors">
                  Subscribe Now
                </button>
                <div className="flex flex-col gap-2.5 text-sm text-[#0e121b]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb] text-lg">check</span>
                    <span>Best Value (Save 17%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb] text-lg">check</span>
                    <span>6 Months Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2463eb] text-lg">check</span>
                    <span>All Starter Features</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#f6f6f8] border-t border-slate-200 py-12">
        <div className="flex justify-center">
          <div className="flex flex-col max-w-[1200px] flex-1 px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
              <div className="col-span-2 lg:col-span-2 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#0e121b]">
                  <span className="material-symbols-outlined text-[#2463eb]">smart_toy</span>
                  <span className="text-base font-bold">Mithivoices</span>
                </div>
                <p className="text-[#4d6599] dark:text-gray-400 text-xs max-w-[240px] leading-relaxed">
                  Privacy-focused AI voice technology for creators and developers.
                </p>
                <div className="flex gap-3 mt-1">
                  <a className="text-[#4d6599] hover:text-[#2463eb] transition-colors" href="#">
                    <span className="material-symbols-outlined text-xl">public</span>
                  </a>
                  <a className="text-[#4d6599] hover:text-[#2463eb] transition-colors" href="#">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-[#0e121b] font-bold text-xs uppercase tracking-wider mb-1">Product</h4>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Features</a>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Pricing</a>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Download</a>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Changelog</a>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-[#0e121b] font-bold text-xs uppercase tracking-wider mb-1">Resources</h4>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Documentation</a>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">API Reference</a>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Community</a>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Help Center</a>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-[#0e121b] font-bold text-xs uppercase tracking-wider mb-1">Company</h4>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">About</a>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Blog</a>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Legal</a>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Contact</a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-200 gap-3">
              <p className="text-[#4d6599] text-xs">© 2024 Mithivoices Inc. All rights reserved.</p>
              <div className="flex gap-5">
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Privacy Policy</a>
                <a className="text-[#4d6599] hover:text-[#2463eb] text-xs" href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
