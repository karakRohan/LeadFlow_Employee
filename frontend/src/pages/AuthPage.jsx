
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Users,
  Sparkles
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function AuthPage({ mode }) {
  const signup = mode === 'signup';

  const { user, login, signup: register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      await (
        signup
          ? register(form)
          : login({
              email: form.email,
              password: form.password
            })
      );

      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5EF] lg:grid lg:grid-cols-[1.05fr_.95fr]">

      {/* LEFT SECTION - PREMIUM BRANDING */}

      <section className="relative hidden min-h-screen overflow-hidden bg-gradient-to-br from-[#163B38] via-[#1D4841] to-[#315C50] px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">

        {/* Background Decorations */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-[#A8BFAE]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-[#C6A878]/15 blur-3xl" />

        <div className="pointer-events-none absolute right-20 top-1/3 h-64 w-64 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute right-32 top-[38%] h-40 w-40 rounded-full border border-white/10" />

        {/* Logo */}

        <Link
          to="/login"
          className="relative z-10 flex items-center gap-3 text-2xl font-extrabold tracking-tight"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-[#A8BFAE] text-[#163B38] shadow-xl">
            <BarChart3 size={25} />
          </span>

          leadflow<span className="text-[#C6A878]">.</span>
        </Link>

        {/* Hero Content */}

        <div className="relative z-10 max-w-xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.15em] text-[#D5E5D8] backdrop-blur-md">

            <Sparkles size={15} />

            A smarter way to manage leads

          </div>

          <h1 className="text-5xl font-extrabold leading-[1.15] tracking-tight xl:text-6xl">

            Build better relationships.

            <span className="mt-2 block bg-gradient-to-r from-[#D5E5D8] via-[#E7D8B9] to-[#C6A878] bg-clip-text text-transparent">
              Close more deals.
            </span>

          </h1>

          <p className="mt-7 max-w-md text-lg leading-8 text-[#DCE9E0]/85">

            One powerful workspace to organize your sales
            pipeline, manage conversations, track opportunities
            and turn prospects into loyal customers.

          </p>

          {/* Features */}

          <div className="mt-10 space-y-5">

            {[
              [Users, 'Every lead in one place'],
              [BarChart3, 'Pipeline insights at a glance'],
              [ShieldCheck, 'Private and secure workspace']
            ].map(([Icon, title]) => (

              <div
                key={title}
                className="flex items-center gap-4"
              >

                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/10 text-[#D5E5D8] backdrop-blur-md">

                  <Icon size={20} />

                </span>

                <span className="text-sm font-semibold text-[#EDF3EC]">
                  {title}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Footer */}

        <p className="relative z-10 text-xs text-[#D5E5D8]/65">

          © 2026 Leadflow. Built for teams that follow through.

        </p>

      </section>

      {/* RIGHT SECTION - LOGIN / SIGNUP */}

      <section className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_#E8EDE5,_transparent_45%),radial-gradient(ellipse_at_bottom_right,_#EAE3D5,_transparent_45%),#F6F5EF] px-5 py-12 sm:px-8">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}

          <Link
            to="/login"
            className="mb-10 flex items-center gap-2 text-xl font-extrabold text-[#163B38] lg:hidden"
          >

            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#163B38] text-white shadow-lg">
              <BarChart3 size={21} />
            </span>

            leadflow<span className="text-[#C6A878]">.</span>

          </Link>

          {/* Heading */}

          <div className="mb-8">

            <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-[#648B79]">

              <Sparkles size={15} />

              {signup ? 'Get started today' : 'Welcome back'}

            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#203B35] sm:text-4xl">

              {signup
                ? 'Create your account'
                : 'Sign in to Leadflow'}

            </h2>

            <p className="mt-3 text-sm leading-6 text-[#718078]">

              {signup
                ? 'Create your workspace and start managing your leads smarter.'
                : 'Enter your details to access your personal workspace.'}

            </p>

          </div>

          {/* Form Card */}

          <div className="rounded-3xl border border-[#E6E8DF] bg-white/90 p-6 shadow-[0_20px_60px_rgba(22,59,56,0.08)] backdrop-blur-xl sm:p-8">

            <form onSubmit={submit} className="space-y-5">

              {/* Full Name */}

              {signup && (

                <label className="block">

                  <span className="mb-2 block text-sm font-bold text-[#354B42]">
                    Full Name
                  </span>

                  <input
                    className="field rounded-xl border-[#DDE4DC] bg-[#FCFCF9] py-3 focus:border-[#648B79] focus:ring-4 focus:ring-[#648B79]/10"
                    placeholder="Enter your full name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value
                      })
                    }
                  />

                </label>

              )}

              {/* Email */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-[#354B42]">
                  Email Address
                </span>

                <input
                  className="field rounded-xl border-[#DDE4DC] bg-[#FCFCF9] py-3 focus:border-[#648B79] focus:ring-4 focus:ring-[#648B79]/10"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value
                    })
                  }
                />

              </label>

              {/* Password */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-[#354B42]">
                  Password
                </span>

                <input
                  className="field rounded-xl border-[#DDE4DC] bg-[#FCFCF9] py-3 focus:border-[#648B79] focus:ring-4 focus:ring-[#648B79]/10"
                  type="password"
                  minLength="8"
                  placeholder="Enter your password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value
                    })
                  }
                />

              </label>

              {/* Error */}

              {error && (

                <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">

                  {error}

                </p>

              )}

              {/* Submit Button */}

              <button
                type="submit"
                disabled={busy}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#163B38] to-[#315C50] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#163B38]/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#163B38]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {busy
                  ? 'Please wait...'
                  : signup
                    ? 'Create Account'
                    : 'Sign In'}

                {!busy && (

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                )}

              </button>

            </form>

            {/* Login / Signup Switch */}

            <p className="mt-7 text-center text-sm text-[#718078]">

              {signup
                ? 'Already have an account?'
                : "Don't have an account?"}

              {' '}

              <Link
                className="font-extrabold text-[#315C50] transition hover:text-[#A17C45]"
                to={signup ? '/login' : '/signup'}
              >

                {signup ? 'Sign In' : 'Create Account'}

              </Link>

            </p>

          </div>

          {/* Security Footer */}

          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-[#87948B]">

            <CheckCircle2 size={16} className="text-[#648B79]" />

            Your workspace is private and secure.

          </div>

          <p className="mt-5 text-center text-xs text-[#A0A79F]">

            Designed for smarter sales management.

          </p>

        </div>

      </section>

    </div>
  );
}
