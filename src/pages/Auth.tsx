
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">KYC Platform</h1>
          <p className="text-slate-600">Automated Client Onboarding & Compliance</p>
        </div>
        
        {isLogin ? (
          <LoginForm onToggle={() => setIsLogin(false)} />
        ) : (
          <SignupForm onToggle={() => setIsLogin(true)} />
        )}
        
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Demo credentials: admin@example.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
