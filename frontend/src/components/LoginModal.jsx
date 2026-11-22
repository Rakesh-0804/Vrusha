import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Smartphone, Mail, ArrowRight, Lock, UserPlus, LogIn, KeyRound, UserCheck } from 'lucide-react';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, loginWithCredentials, registerUser, loginWithOTP, loginWithGoogle } = useAuth();

  const [mode, setMode] = useState('signin'); // 'signin' | 'register' | 'otp'
  const [otpStep, setOtpStep] = useState(1);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  // Google Modal Form States
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const resetForm = () => {
    setError('');
    setSuccess('');
    setIsLoading(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please enter your Email/Mobile number and Password');
      return;
    }
    resetForm();
    setIsLoading(true);

    try {
      await loginWithCredentials({ identifier: identifier.trim(), password });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || (!email && !phone) || !password) {
      setError('Please fill in Name, Password, and Email or Mobile number');
      return;
    }
    resetForm();
    setIsLoading(true);

    try {
      await registerUser({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), password, address: address.trim(), pincode: pincode.trim() });
      setSuccess('Account created successfully! Welcome to Vruksha.');
    } catch (err) {
      setError(err.message || 'Registration failed. User may already exist.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!identifier) {
      setError('Please enter your mobile number or email ID');
      return;
    }
    resetForm();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim().toLowerCase() })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpStep(2);
        setOtp('');
        setSuccess(`Verification code sent to ${identifier}! Please check your email inbox.`);
      } else {
        setError(data.error || 'Unable to send verification code.');
      }
    } catch (err) {
      setError('Unable to reach the authentication service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp.trim())) {
      setError('Please enter the 6-digit verification code');
      return;
    }
    resetForm();
    setIsLoading(true);
    try {
      await loginWithOTP(identifier.trim().toLowerCase(), name.trim() || 'Vruksha Customer', otp.trim(), { address: address.trim(), pincode: pincode.trim() });
    } catch (err) {
      setError(err.message || 'Verification code invalid or expired');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    if (!googleEmail || !googleEmail.includes('@')) {
      setError('Please enter a valid Google email address.');
      return;
    }
    resetForm();
    setIsLoading(true);
    try {
      await loginWithGoogle({ email: googleEmail.trim().toLowerCase(), name: googleName.trim() || googleEmail.split('@')[0] });
      setIsGoogleModalOpen(false);
    } catch (err) {
      setError(err.message || 'Google authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      
      {/* GOOGLE ACCOUNT AUTHENTICATION POPUP */}
      {isGoogleModalOpen ? (
        <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <h3 className="font-bold text-slate-900 text-sm font-serif">Google Account Authentication</h3>
            </div>
            <button onClick={() => setIsGoogleModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleGoogleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Google Email Address</label>
              <input
                type="email"
                required
                placeholder="your.google@gmail.com"
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name (Optional)</label>
              <input
                type="text"
                placeholder="Your Full Name"
                value={googleName}
                onChange={(e) => setGoogleName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs"
              >
                {isLoading ? 'Signing In...' : 'Authenticate'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
          
          {/* Close Button */}
          <button
            onClick={() => { setIsLoginModalOpen(false); resetForm(); }}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              {mode === 'register' ? <UserPlus className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <h2 className="text-xl font-black text-slate-900 font-serif">
              {mode === 'register' ? 'Create Vruksha Account' : mode === 'otp' ? 'Email OTP Login' : 'Welcome Back to Vruksha'}
            </h2>
            <p className="text-xs text-slate-500">
              {mode === 'register' 
                ? 'Join our gardening community to order plants, seeds & services'
                : 'Sign in to access your saved address, orders & live tracking'}
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-5 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setMode('signin'); resetForm(); }}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mode === 'signin' 
                  ? 'bg-white text-emerald-950 shadow-sm font-black' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => { setMode('register'); resetForm(); }}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mode === 'register' 
                  ? 'bg-white text-emerald-950 shadow-sm font-black' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
              <span>New User (Register)</span>
            </button>
          </div>

          {/* Notifications */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl mb-4 text-center font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl mb-4 text-center font-bold">
              {success}
            </div>
          )}

          {/* MODE 1: SIGN IN (Credential Login) */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="your.email@example.com or 9876543210"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => { setMode('otp'); resetForm(); }}
                    className="text-[11px] text-emerald-700 font-bold hover:underline"
                  >
                    Use OTP Instead
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In to Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Switch to Register footer */}
              <div className="text-center pt-2 text-xs text-slate-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); resetForm(); }}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Register as New User ➔
                </button>
              </div>
            </form>
          )}

          {/* MODE 2: REGISTER (New User Sign Up) */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sundaram"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="priya.s@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Delivery Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Street Address, City, State, Pincode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'Creating Account...' : 'Register New Account'}</span>
                <UserCheck className="w-4 h-4" />
              </button>

              {/* Switch to Sign In footer */}
              <div className="text-center pt-2 text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signin'); resetForm(); }}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Sign In here ➔
                </button>
              </div>
            </form>
          )}

          {/* MODE 3: OTP LOGIN */}
          {mode === 'otp' && (
            <>
              {otpStep === 1 ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Enter Mobile Number or Email ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="+91 9876543210 or name@example.com"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                      />
                      <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                  >
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2 text-xs text-slate-500">
                    <button
                      type="button"
                      onClick={() => { setMode('signin'); resetForm(); }}
                      className="text-slate-600 hover:text-slate-800 font-bold"
                    >
                      ← Return to Password Sign In
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl">
                    Verification code sent to <strong>{identifier}</strong>.<br />
                    <span className="text-[11px] text-emerald-700">Enter the 6-digit code sent to your inbox.</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Delivery Address (optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Street Address, City, State, Pincode"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Pincode (optional)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6-digit Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Enter 6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-center tracking-widest text-base font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-200"
                  >
                    Verify Code & Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpStep(1)}
                    className="w-full text-xs font-semibold text-slate-500 hover:text-slate-700"
                  >
                    Change Mobile / Email
                  </button>
                </form>
              )}
            </>
          )}

          {/* Social Login Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-[10px] text-slate-400 uppercase font-bold">
              <span className="bg-white px-2">OR QUICK SOCIAL SIGN-IN</span>
            </div>
          </div>

          {/* Social Login Button */}
          <button
            type="button"
            onClick={() => setIsGoogleModalOpen(true)}
            className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

        </div>
      )}

    </div>
  );
}
