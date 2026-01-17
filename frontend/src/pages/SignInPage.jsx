import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-slate-50 font-display text-slate-900 antialiased">
      <div className="flex min-h-screen w-full flex-row overflow-hidden">
        {/* Left Side: Form Section (60%) */}
        <div className="flex w-full flex-1 flex-col justify-center items-center bg-white p-6 lg:w-[60%] lg:px-20 xl:px-32">
          <div className="w-full max-w-[400px] flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">Welcome back</h1>
              <p className="text-slate-500 text-base">Welcome back! Please enter your details.</p>
            </div>
            {/* Form */}
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none text-slate-900" htmlFor="email">Email</label>
                <input 
                  className="flex h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
                  id="email" 
                  placeholder="Enter your email" 
                  type="email"
                />
              </div>
              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none text-slate-900" htmlFor="password">Password</label>
                <div className="relative">
                  <input 
                    className="flex h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 pr-10" 
                    id="password" 
                    placeholder="Enter your password" 
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <a className="text-sm font-medium text-primary hover:text-primary/80 hover:underline" href="#">Forgot password?</a>
              </div>
              {/* Submit Button */}
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-primary text-white hover:bg-primary/90 h-12 w-full shadow-sm mt-2">
                Sign In
              </button>
            </form>
            {/* Social Login Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or sign in with</span>
              </div>
            </div>
            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-11 px-4 py-2 text-slate-700">
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="currentColor"></path>
                </svg>
                Google
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-11 px-4 py-2 text-slate-700">
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-63.5 0-14 5-25.5 13.2-34.3-1.3-3.2-5.7-16.2 1.3-33.8 0 0 10.8-3.5 35.5 13.1 10.3-2.9 21.4-4.3 32.5-4.3 11.1 0 22.2 1.4 32.5 4.3 24.7-16.6 35.5-13.1 35.5-13.1 7.1 17.5 2.7 30.7 1.3 33.8 8.3 8.7 13.2 20.2 13.2 34.3 0 50.7-58.4 57.2-114.4 63.3 9.1 7.9 17.2 23.5 17.2 47.3 0 34.2-.3 61.9-.3 70.3 0 6.6 4.7 14.8 17.6 12.3C426.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" fill="currentColor"></path>
                </svg>
                GitHub
              </button>
            </div>
            {/* Sign Up Link */}
            <p className="text-center text-sm text-slate-500">
              Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
        
        {/* Right Side: Brand/Visual Section (40%) */}
        <div className="hidden lg:flex w-[40%] flex-col relative overflow-hidden text-white bg-linear-to-br from-primary to-blue-800">
          {/* Content Container */}
          <div className="relative z-10 flex h-full flex-col justify-between p-12">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl">graphic_eq</span>
              <span className="text-xl font-bold tracking-tight">Mithivoices</span>
            </div>
            {/* Central Visual / Illustration Area */}
            <div className="flex-1 flex items-center justify-center py-10">
              <div className="relative w-full aspect-square max-w-[400px]">
                {/* Abstract Glassmorphism Card */}
                <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-6 flex flex-col gap-4 transform -rotate-2 transition-transform duration-700 hover:rotate-0">
                  {/* Dummy Chart Lines */}
                  <div className="flex items-end justify-between gap-2 h-32 w-full mt-4">
                    <div className="w-1/6 bg-white/30 rounded-t h-[40%]"></div>
                    <div className="w-1/6 bg-white/50 rounded-t h-[70%]"></div>
                    <div className="w-1/6 bg-white/80 rounded-t h-[50%]"></div>
                    <div className="w-1/6 bg-white/40 rounded-t h-[80%]"></div>
                    <div className="w-1/6 bg-white/20 rounded-t h-[30%]"></div>
                    <div className="w-1/6 bg-white/60 rounded-t h-[60%]"></div>
                  </div>
                  {/* Dummy Text Lines */}
                  <div className="space-y-3 mt-4">
                    <div className="h-2 w-3/4 bg-white/30 rounded-full"></div>
                    <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
                    <div className="h-2 w-full bg-white/10 rounded-full"></div>
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -right-4 -top-4 bg-primary text-white p-3 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold">
                    <span className="material-symbols-outlined text-base">auto_awesome</span>
                    AI Powered
                  </div>
                </div>
                {/* Secondary smaller card behind */}
                <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-2xl bg-white/5 border border-white/10 rotate-3"></div>
              </div>
            </div>
            {/* Features Footer */}
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold leading-tight">Your AI voice companion</h2>
              <ul className="space-y-4 text-lg text-blue-100">
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </span>
                  Generate voices instantly
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </span>
                  Transcribe accurately
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </span>
                  Chat naturally
                </li>
              </ul>
            </div>
          </div>
          {/* Background Decorative Blob */}
          <div className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-primary/20 blur-3xl filter mix-blend-overlay"></div>
          <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-white/10 blur-3xl filter mix-blend-overlay"></div>
        </div>
      </div>
    </div>
  );
}
