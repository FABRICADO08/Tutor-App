'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Activity, BookOpen, CalendarDays, Check, ChevronDown, CircleDollarSign, Clock3, GraduationCap, Heart, LayoutDashboard, LogOut, Menu, MessageSquare, Search, Settings, ShieldCheck, TrendingUp, Users, X } from 'lucide-react'
import { signIn, signOut, useSession } from '@/lib/auth-client'

type Role = 'Admin' | 'Educator' | 'Student'

type Booking = { student: string; initials: string; subject: string; date: string; status: 'Confirmed' | 'Pending' | 'Cancelled' }

const bookings: Booking[] = [
  { student: 'Emma Wilson', initials: 'EW', subject: 'Mathematics', date: 'Today, 10:00 AM', status: 'Confirmed' },
  { student: 'Liam Chen', initials: 'LC', subject: 'Physics', date: 'Today, 2:30 PM', status: 'Pending' },
  { student: 'Olivia Brown', initials: 'OB', subject: 'English Literature', date: 'Tomorrow, 9:00 AM', status: 'Confirmed' },
]

function Avatar({ image, initials }: { image?: string | null; initials: string }) {
  return image ? <img src={image} alt="Google profile" className="size-9 rounded-full object-cover" /> : <div className="flex size-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">{initials}</div>
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-6 shrink-0" aria-hidden="true">
      <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z" />
      <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z" />
      <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2Z" />
      <path fill="#EA4335" d="M24 12c3 0 5.6 1 7.7 3.1l5.8-5.8C34 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.2C14.2 15.6 18.7 12 24 12Z" />
    </svg>
  )
}

const learningBenefits = [
  { title: 'Expert Tutors', description: 'Learn from qualified and experienced tutors.', icon: Users, tone: 'bg-[#e8efff] text-[#2858df]' },
  { title: 'Flexible Scheduling', description: 'Book a session at a time that works for you.', icon: CalendarDays, tone: 'bg-[#def5ed] text-[#1b9e83]' },
  { title: 'Track Progress', description: 'See your improvement and stay motivated.', icon: TrendingUp, tone: 'bg-[#eee8ff] text-[#7658dc]' },
  { title: 'Personalised Learning', description: 'Get support shaped around your goals.', icon: Heart, tone: 'bg-[#ffeaef] text-[#d94270]' },
]

function SignIn() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGoogleSignIn() {
    setLoading(true)
    setError(null)
    try {
      const result = await signIn.social({ provider: 'google', callbackURL: '/' })
      if (result && typeof result === 'object' && 'error' in result && result.error) {
        setError('We could not start Google sign-in. Please try again.')
      }
    } catch {
      setError('We could not start Google sign-in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f7f9ff] text-[#111d63]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_10%,rgba(220,231,255,0.8),transparent_36%),radial-gradient(ellipse_at_92%_90%,rgba(232,226,255,0.65),transparent_38%)]" />
      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-1 items-stretch gap-7 px-4 pb-28 pt-5 sm:gap-9 sm:px-8 sm:pt-8 lg:grid-cols-[minmax(420px,0.92fr)_minmax(0,1.08fr)] lg:gap-10 lg:px-12 lg:py-8 xl:gap-14 xl:px-16">
        <section className="mx-auto flex min-h-[650px] w-full max-w-[560px] flex-col rounded-[30px] border border-white/90 bg-white/95 px-6 py-8 shadow-[0_28px_90px_rgba(48,76,155,0.14)] backdrop-blur sm:px-10 sm:py-11 lg:mx-0 lg:max-w-none lg:min-h-[calc(100vh-112px)] lg:px-11 xl:px-14">
          <header className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="flex size-16 items-center justify-center rounded-[21px] bg-gradient-to-br from-[#4f73e8] to-[#778bf1] text-white shadow-lg shadow-blue-200/70">
                <GraduationCap size={38} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="text-[46px] font-extrabold leading-none tracking-[-0.07em] text-[#101b68]">Tutor</span>
            </div>
            <p className="mt-4 text-sm font-medium tracking-[0.02em] text-[#60719d]">Learn <span className="px-2 text-[#536fe0]">•</span> Grow <span className="px-2 text-[#536fe0]">•</span> Succeed</p>
          </header>

          <div className="mx-auto mt-12 w-full max-w-[410px] text-center sm:mt-16 lg:mt-[clamp(3.25rem,9vh,5.75rem)]">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#111d68] sm:text-[34px]">Welcome Back!</h1>
            <p className="mx-auto mt-3 max-w-sm text-base leading-7 text-[#7080a8]">Sign in to continue your learning journey and achieve your goals.</p>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              aria-busy={loading}
              type="button"
              className="mt-8 flex min-h-[60px] w-full items-center justify-center gap-3 rounded-[14px] border border-[#cbd7f5] bg-white px-5 text-sm font-bold text-[#14215f] shadow-[0_7px_18px_rgba(54,89,180,0.08)] transition hover:-translate-y-0.5 hover:border-[#8ea2f0] hover:bg-[#fbfcff] hover:shadow-[0_12px_25px_rgba(54,89,180,0.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6e85ee]/25 disabled:cursor-wait disabled:opacity-65"
            >
              <GoogleMark />
              <span className="flex-1 text-center">{loading ? 'Connecting...' : 'Continue with Google'}</span>
              <span className="text-xl font-normal text-[#7584b1]" aria-hidden="true">→</span>
            </button>
            {error && <p className="mt-3 text-sm text-rose-700" role="alert">{error}</p>}

            <div className="mt-7 flex items-center gap-4 text-xs text-[#7785aa]">
              <span className="h-px flex-1 bg-[#dbe2f3]" />
              <span>or</span>
              <span className="h-px flex-1 bg-[#dbe2f3]" />
            </div>

            <div className="mx-auto mt-7 flex max-w-[300px] items-center justify-center gap-3 text-left">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#edf2ff] text-[#526a9e]">
                <ShieldCheck size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#354b81]">Secure login with Google</p>
                <p className="mt-1 text-xs leading-5 text-[#7c89ac]">Your information is safe with us.</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-12 text-center">
            <p className="text-[22px] font-semibold italic leading-tight tracking-tight text-[#1b2c70]">Better Students<br />Brighter Futures <Heart className="ml-1 inline size-4 text-[#536fe0]" aria-hidden="true" /></p>
            <span className="mx-auto mt-3 block h-[2px] w-24 rotate-[-17deg] rounded-full bg-[#f4a23b]" aria-hidden="true" />
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-[720px] flex-col justify-center gap-7 pb-7 lg:max-w-none lg:pb-12">
          <div className="relative isolate h-[340px] overflow-hidden rounded-[30px] bg-[#e2eaff] shadow-[0_20px_55px_rgba(53,82,164,0.18)] sm:h-[430px] lg:h-[clamp(340px,44vh,490px)]">
            <Image
              src="/tutor-study-hero.png"
              alt="A student smiling while studying at her laptop with books and school supplies nearby"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="object-cover object-[58%_center]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#15234d]/10 via-transparent to-white/10" />
            <div className="absolute right-4 top-4 rotate-2 rounded-xl border border-white/80 bg-[#fff5e3]/95 px-4 py-3 shadow-lg sm:right-6 sm:top-6">
              <p className="text-sm font-bold leading-snug text-[#17265b]">Small steps<br />big dreams</p>
              <Heart className="mt-1 size-4 text-[#536fe0]" aria-hidden="true" />
            </div>
            <div className="absolute bottom-5 left-5 -rotate-2 rounded-xl border border-white/80 bg-[#eef5bf]/95 px-3 py-2 shadow-md sm:bottom-7 sm:left-7">
              <p className="text-xs font-bold leading-snug text-[#31475b]">You can<br />do it</p>
            </div>
          </div>

          <div className="px-1 sm:px-3">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#111d68] sm:text-[32px]">Your Personal Learning Hub</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#6d7ca3] sm:text-base sm:leading-7">Connect with expert tutors, get help when you need it, and reach your full potential.</p>
            <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
              {learningBenefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <li key={benefit.title} className="flex min-w-0 items-center gap-3">
                    <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${benefit.tone}`}>
                      <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-[#17265b]">{benefit.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-[#7482a5]">{benefit.description}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20">
        <svg viewBox="0 0 1440 120" className="size-full" preserveAspectRatio="none">
          <path d="M0 62C170 114 305 32 488 42C650 52 711 92 884 74C1070 55 1180 13 1440 36V120H0V62Z" fill="#5274d8" />
        </svg>
        <span className="absolute bottom-2 right-6 text-xs font-semibold tracking-wide text-white/95 sm:right-12 sm:text-sm">Let&apos;s learn together</span>
      </div>
    </main>
  )
}

const roleContent: Record<Role, { greeting: string; subtitle: string; role: string }> = {
  Admin: { greeting: 'Good morning', subtitle: "Here's what's happening across your platform today.", role: 'Administrator' },
  Educator: { greeting: 'Good morning', subtitle: 'Here are the students who booked sessions with you.', role: 'Educator' },
  Student: { greeting: 'Good morning', subtitle: 'Keep going — you are making great progress.', role: 'Student' },
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Users }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700"><Icon size={18} /></div><p className="mt-5 text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900">{value}</p></div>
}

function AdminDashboard() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => bookings.filter((item) => `${item.student} ${item.subject}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Total Users" value="2,847" icon={Users} /><Stat label="Active Tutors" value="186" icon={GraduationCap} /><Stat label="Total Students" value="2,661" icon={BookOpen} /><Stat label="Monthly Revenue" value="$48,290" icon={CircleDollarSign} /></div><div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]"><section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-slate-900">Revenue overview</h2><p className="mt-1 text-sm text-slate-500">Monthly revenue and bookings performance</p><div className="mt-8 flex h-48 items-end gap-3 border-b border-slate-100">{[42, 56, 48, 67, 61, 76, 70, 85, 79, 95, 88, 100].map((height, index) => <div key={index} className="flex h-full flex-1 items-end"><div className={`w-full rounded-t-md ${index === 11 ? 'bg-black' : 'bg-slate-200'}`} style={{ height: `${height}%` }} /></div>)}</div><div className="mt-3 flex justify-between text-[10px] text-slate-400"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Dec</span></div></section><section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-slate-900">Pending approvals</h2><p className="mt-1 text-sm text-slate-500">Tutors waiting for review</p>{['Sarah Johnson', 'David Kim', 'Rachel Lee'].map((name) => <div key={name} className="mt-5 flex items-center gap-3"><Avatar initials={name.split(' ').map((part) => part[0]).join('')} /><div className="flex-1"><p className="text-sm font-semibold text-slate-800">{name}</p><p className="text-xs text-slate-400">Tutor application</p></div><button aria-label={`Approve ${name}`} className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50"><Check size={15} /></button></div>)}</section></div><section className="mt-6 rounded-2xl border border-slate-200 bg-white"><div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold text-slate-900">Recent bookings</h2><p className="mt-1 text-sm text-slate-500">Latest sessions booked on the platform</p></div><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search bookings" className="h-9 rounded-lg border border-slate-200 pl-9 pr-3 text-xs outline-none focus:border-black" /></div></div><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400"><tr><th className="px-6 py-3">Student</th><th className="px-6 py-3">Subject</th><th className="px-6 py-3">Date & time</th><th className="px-6 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((item) => <tr key={item.student}><td className="px-6 py-4"><div className="flex items-center gap-3"><Avatar initials={item.initials} /><span className="font-semibold text-slate-800">{item.student}</span></div></td><td className="px-6 py-4 text-slate-500">{item.subject}</td><td className="px-6 py-4 text-slate-500">{item.date}</td><td className="px-6 py-4"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700">{item.status}</span></td></tr>)}</tbody></table></div></section></>
}

function EducatorDashboard() { return <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-slate-900">Students who booked with you</h2><p className="mt-1 text-sm text-slate-500">Only your booked sessions are visible here.</p><div className="mt-6 flex flex-col gap-3">{bookings.slice(0, 2).map((item) => <div key={item.student} className="flex items-center gap-4 rounded-xl bg-slate-50 p-4"><Avatar initials={item.initials} /><div className="flex-1"><p className="text-sm font-semibold text-slate-800">{item.student}</p><p className="mt-1 text-xs text-slate-500">{item.subject} · {item.date}</p></div><button className="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white">Open session</button></div>)}</div></section> }
function StudentDashboard() { return <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-slate-900">Upcoming sessions</h2><p className="mt-1 text-sm text-slate-500">Your personal learning plan</p>{bookings.slice(0, 2).map((item) => <div key={item.student} className="mt-4 flex items-center gap-4 rounded-xl border border-slate-100 p-4"><Avatar initials="JC" /><div className="flex-1"><p className="text-sm font-semibold text-slate-800">Dr. James Carter</p><p className="mt-1 text-xs text-slate-500">{item.subject} · {item.date}</p></div><button className="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white">Join</button></div>)}</div><div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-slate-900">Learning progress</h2><div className="mt-8 flex items-center gap-5"><div className="relative flex size-28 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#111 0deg 277deg, #e2e8f0 277deg 360deg)' }}><div className="flex size-20 flex-col items-center justify-center rounded-full bg-white"><strong className="text-xl text-slate-900">77%</strong><span className="text-[9px] text-slate-400">Complete</span></div></div><p className="text-xs leading-6 text-slate-500"><strong className="text-slate-900">12</strong> lessons completed<br /><strong className="text-slate-900">3</strong> assignments due</p></div></div></section> }

export default function Page() {
  const { data: session, isPending } = useSession()
  const [role, setRole] = useState<Role>('Student')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  if (isPending) return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Loading account...</div>
  if (!session?.user) return <SignIn />
  const email = session.user.email.toLowerCase()
  const isAdmin = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '').split(',').map((item) => item.trim().toLowerCase()).includes(email)
  const effectiveRole = isAdmin ? role : role === 'Admin' ? 'Student' : role
  const content = roleContent[effectiveRole]
  const nav = effectiveRole === 'Admin' ? [['Dashboard', LayoutDashboard], ['Activity', Activity], ['Users', Users], ['Tutors', GraduationCap], ['Students', Users], ['Subjects', BookOpen], ['Bookings', CalendarDays], ['Messages', MessageSquare]] : effectiveRole === 'Educator' ? [['Dashboard', LayoutDashboard], ['My Bookings', CalendarDays], ['Messages', MessageSquare]] : [['Dashboard', LayoutDashboard], ['My Sessions', CalendarDays], ['Messages', MessageSquare]]
  return <main className="min-h-screen bg-slate-100 text-slate-900"><aside className={`fixed inset-y-0 left-0 z-20 w-64 bg-black px-5 py-6 text-white transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}><div className="flex items-center gap-3 px-2"><div className="flex size-9 items-center justify-center rounded-xl bg-white text-black"><ShieldCheck size={19} /></div><span className="text-xl font-bold">TutorFlow</span><button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden" aria-label="Close navigation"><X size={20} /></button></div><nav className="mt-10 flex flex-col gap-1">{nav.map(([label, Icon]) => <button key={label as string} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm ${label === 'Dashboard' ? 'bg-white font-semibold text-black' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`} onClick={() => setSidebarOpen(false)}>{<Icon size={17} />}{label as string}</button>)}</nav><div className="absolute bottom-6 left-5 right-5 border-t border-slate-800 pt-4"><button className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400"><Settings size={17} />Settings</button></div></aside><div className="lg:pl-64"><header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8"><button onClick={() => setSidebarOpen(true)} className="lg:hidden" aria-label="Open navigation"><Menu size={21} /></button><div className="ml-auto flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-xs font-semibold text-slate-900">{session.user.name}</p><p className="text-[10px] text-slate-500">{content.role}</p></div><Avatar image={session.user.image} initials={session.user.name?.slice(0, 2).toUpperCase() ?? 'U'} /><button onClick={() => signOut()} aria-label="Sign out" className="text-slate-400 hover:text-black"><LogOut size={17} /></button></div></header><div className="p-5 sm:p-8"><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm text-slate-500">{content.greeting}, {session.user.name?.split(' ')[0]}</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{effectiveRole} dashboard</h1><p className="mt-2 text-sm text-slate-500">{content.subtitle}</p></div>{isAdmin && <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1"><span className="px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">View as</span><select value={role} onChange={(event) => setRole(event.target.value as Role)} className="rounded-lg bg-slate-100 px-2 py-2 text-xs font-semibold outline-none"><option>Admin</option><option>Educator</option><option>Student</option></select><ChevronDown size={14} className="mr-2 text-slate-400" /></div>}</div>{effectiveRole === 'Admin' ? <AdminDashboard /> : effectiveRole === 'Educator' ? <EducatorDashboard /> : <StudentDashboard />}</div></div></main>
}
