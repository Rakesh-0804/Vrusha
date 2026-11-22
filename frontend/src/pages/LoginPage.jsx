import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Leaf, 
  CheckCircle2, 
  KeyRound, 
  UserCheck,
  Send,
  X,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

export default function LoginPage() {
  const { loginWithCredentials, registerUser, loginWithOTP, loginWithGoogle } = useAuth();

  const [mode, setMode] = useState('signin'); // 'signin' | 'register' | 'otp'
  const [otpStep, setOtpStep] = useState(1);
  const [otpCode, setOtpCode] = useState('');

  // Form fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // Credentials quick-info drawer
  const [showCredsInfo, setShowCredsInfo] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  // Google Sign In Handler
  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    if (!googleEmail || !googleEmail.includes('@')) {
      setError('Please enter a valid Google email address.');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      await loginWithGoogle({ email: googleEmail.trim().toLowerCase(), name: googleName.trim() || googleEmail.split('@')[0] });
      setSuccess('Successfully authenticated with Google account!');
      setShowGoogleModal(false);
    } catch (err) {
      setError('Google Sign-In failed: ' + (err.message || 'Authentication error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please enter your email address/mobile and password.');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      await loginWithCredentials({ identifier: identifier.trim(), password });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please provide your full name, email address, and password.');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      await registerUser({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), password, address: address.trim(), pincode: pincode.trim() });
      setSuccess('Account created successfully! Signing you in...');
    } catch (err) {
      setError(err.message || 'Registration failed. User may already exist.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmailOTP = async (e) => {
    e.preventDefault();
    const targetEmail = email || identifier;
    if (!targetEmail || !targetEmail.includes('@')) {
      setError('Please enter a valid email address to receive a verification code.');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail.trim().toLowerCase(), identifier: targetEmail.trim().toLowerCase() })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpStep(2);
        setOtpCode('');
        setSuccess(`Verification code sent to ${targetEmail}! Please check your email inbox.`);
      } else {
        setError(data.error || 'Failed to send OTP code to email.');
      }
    } catch (err) {
      setError('Email verification service connection failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmailOTP = async (e) => {
    e.preventDefault();
    const targetEmail = email || identifier;
    if (!targetEmail || !otpCode) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      await loginWithOTP(targetEmail.trim().toLowerCase(), name.trim() || targetEmail.split('@')[0], otpCode.trim(), { address: address.trim(), pincode: pincode.trim() });
    } catch (err) {
      setError(err.message || 'Email verification code invalid or expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070e14] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Mesh & Radial Glows */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-teal-500/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none"></div>

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-3.5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-2xl shadow-emerald-950 border border-emerald-400/40">
          <Leaf className="w-8 h-8 text-slate-950" />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-serif">
            VRUKSHA
          </h1>
          <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/90 border border-emerald-700/50 py-1 px-4 rounded-full inline-block shadow-inner">
            Airway Botanical & Logistics Portal
          </p>
        </div>
      </div>

      {/* Card Container */}
      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-lg z-10">
        <div className="bg-[#0b1620]/90 border border-emerald-500/20 backdrop-blur-2xl py-8 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-3xl sm:px-10 space-y-6">

          {/* GOOGLE SIGN IN BUTTON */}
          <div>
            <button
              onClick={() => { setShowGoogleModal(true); resetMessages(); }}
              disabled={isLoading}
              type="button"
              className="w-full bg-[#050b10] hover:bg-[#08121a] border border-slate-700 hover:border-emerald-500/60 text-white font-bold py-3 px-4 rounded-2xl text-xs transition-all flex items-center justify-center gap-3 shadow-md group"
            >
              <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google Workspace</span>
            </button>
          </div>

          {/* DIVIDER */}
          <div className="relative flex py-0.5 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Or sign in with email credentials
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Mode Switcher Segmented Control */}
          <div className="bg-[#050b10] p-1 rounded-2xl border border-slate-800 flex font-semibold text-xs">
            <button
              onClick={() => { setMode('signin'); resetMessages(); }}
              className={`flex-1 py-2 rounded-xl text-center transition-all ${
                mode === 'signin'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-700/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); resetMessages(); }}
              className={`flex-1 py-2 rounded-xl text-center transition-all ${
                mode === 'register'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-700/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => { setMode('otp'); resetMessages(); setOtpStep(1); }}
              className={`flex-1 py-2 rounded-xl text-center transition-all ${
                mode === 'otp'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-700/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Email OTP
            </button>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="bg-rose-950/90 border border-rose-800 text-rose-200 text-xs p-3.5 rounded-2xl flex items-center gap-2.5">
              <span className="font-bold shrink-0">Error:</span>
              <span className="leading-snug">{error}</span>
            </div>
          )}
          {success && (
            <div className="bg-emerald-950/90 border border-emerald-800 text-emerald-200 text-xs p-3.5 rounded-2xl flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="leading-snug">{success}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="user@vruksha.com or mobile"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-2xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-2xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-3.5 rounded-2xl transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 disabled:opacity-50"
              >
                <span>{isLoading ? 'Verifying Authentication...' : 'Enter Vruksha Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Contact</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="password"
                      required
                      placeholder="Minimum 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Primary Delivery Address</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Apartment, Street Name, City"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Pincode</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="560038"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-white text-center font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-3.5 rounded-2xl transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 disabled:opacity-50 mt-2"
              >
                <span>{isLoading ? 'Creating Account...' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* EMAIL OTP FORM */}
          {mode === 'otp' && (
            <div className="space-y-4">
              {otpStep === 1 ? (
                <form onSubmit={handleSendEmailOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Enter Account Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                      <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={email || identifier}
                        onChange={(e) => { setEmail(e.target.value); setIdentifier(e.target.value); }}
                        className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-2xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send 6-Digit Email Verification Code</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyEmailOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 text-center">
                      Enter 6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#050b10] border border-emerald-500/50 rounded-2xl px-4 py-3 text-center tracking-[0.35em] text-2xl font-mono text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Verify Code & Enter</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Authorized Credentials Helper Drawer Toggle */}
          <div className="pt-2 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => setShowCredsInfo(!showCredsInfo)}
              className="text-[11px] text-slate-400 hover:text-emerald-300 flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showCredsInfo ? 'Hide Authorized Access Accounts' : 'View Authorized Access Accounts'}</span>
            </button>

            {showCredsInfo && (
              <div className="mt-3 bg-[#050b10] border border-slate-800 p-3 rounded-2xl space-y-2 text-[11px] text-slate-300 animate-in fade-in duration-200">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="font-bold text-emerald-400">Admin Control</span>
                  <span className="font-mono text-slate-400">admin@vruksha.com / admin123</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="font-bold text-teal-400">Partner Nursery</span>
                  <span className="font-mono text-slate-400">seller@vruksha.com / seller123</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-bold text-slate-300">Customer Account</span>
                  <span className="font-mono text-slate-400">user@vruksha.com / user123</span>
                </div>
              </div>
            )}
          </div>

          <div className="text-center text-[10px] text-slate-500 pt-1 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit SSL Encrypted & Session-Validated Infrastructure</span>
          </div>

        </div>
      </div>

      {/* GOOGLE AUTHENTICATION MODAL */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1620] border border-emerald-500/30 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <h3 className="font-bold text-white text-sm">Google Workspace Auth</h3>
              </div>
              <button onClick={() => setShowGoogleModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGoogleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Google Email</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@gmail.com"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Account Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Display Name"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  className="w-full bg-[#050b10] border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-emerald-950"
                >
                  {isLoading ? 'Authorizing...' : 'Authorize'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
