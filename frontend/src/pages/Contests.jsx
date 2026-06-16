import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useToast } from '../components/Toast';
import { Calendar, Users, Trophy, Play, Bell, CheckCircle2, Loader2 } from 'lucide-react';

export const Contests = () => {
  const [contests, setContests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(new Set());
  const toast = useToast();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const data = await api.getContests();
        setContests(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load coding tournament schedules');
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, [toast]);

  const handleRegister = (contestId, title) => {
    setRegistered(prev => {
      const next = new Set(prev);
      if (next.has(contestId)) {
        next.delete(contestId);
        toast.info(`Deregistered from ${title}`);
      } else {
        next.add(contestId);
        toast.success(`Registered for ${title}! We will send a reminder.`);
      }
      return next;
    });
  };

  const handleEnterArena = (title) => {
    toast.success(`Entering ${title} arena... Good luck!`);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
          <span className="text-xs text-neutral-400 font-semibold tracking-wide">Retrieving tournament tables...</span>
        </div>
      </div>
    );
  }

  const { active = [], upcoming = [], past = [] } = contests || {};

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8 w-full text-left">
      {/* Page Header */}
      <div className="border-b border-neutral-200/50 dark:border-neutral-800/50 pb-5">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
          Competitions & Tournaments
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Compete in virtual contests, solve problems in real-time, and climb the leaderboard.
        </p>
      </div>

      {/* 1. Active contests */}
      {active.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            Live Contests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {active.map((c) => (
              <div 
                key={c.id}
                className="glass-panel border-red-500/20 bg-red-500/[0.02] dark:bg-red-500/[0.01] rounded-3xl p-6 flex flex-col justify-between gap-5 relative overflow-hidden group shadow-lg"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider bg-red-500/10 text-red-500 self-start">
                    Active Now
                  </span>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-neutral-50">{c.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500 mt-2">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{c.duration}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{c.participantsCount} competing</span>
                  </div>
                </div>
                <button
                  onClick={() => handleEnterArena(c.title)}
                  className="py-2.5 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/10 active:scale-[0.98]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Enter Arena
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Upcoming contests */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">Upcoming Contests</h2>
        {upcoming.length === 0 ? (
          <div className="p-8 text-center text-sm text-neutral-400 bg-neutral-50 dark:bg-neutral-900/30 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
            No upcoming contests scheduled.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((c) => {
              const isReg = registered.has(c.id);
              return (
                <div 
                  key={c.id}
                  className="glass-panel border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl p-6 flex flex-col justify-between gap-5 bg-white dark:bg-[#121212] shadow-md hover:border-teal-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-bold text-neutral-950 dark:text-neutral-50">{c.title}</h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      Starts: {new Date(c.startTime).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500 mt-2">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{c.duration}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{c.participantsCount} registered</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRegister(c.id, c.title)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]
                      ${isReg 
                        ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-teal-500 hover:bg-teal-600 text-white'
                      }
                    `}
                  >
                    {isReg ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Registered
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5" /> Register Now
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Past contests */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">Contests Archives</h2>
        <div className="glass-panel border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider text-left">
                <th className="py-4 pl-6">Contest Name</th>
                <th className="py-4 px-4 w-32 text-center">Questions</th>
                <th className="py-4 px-4 w-32 text-center">Competitors</th>
                <th className="py-4 pr-6 w-44 text-right">Winner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60 text-sm">
              {past.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-100/10 dark:hover:bg-neutral-800/10 transition-colors">
                  <td className="py-4 pl-6 font-bold text-neutral-800 dark:text-neutral-200">{c.title}</td>
                  <td className="py-4 px-4 text-center text-neutral-500 font-medium">{c.questionsCount}</td>
                  <td className="py-4 px-4 text-center text-neutral-500 font-medium">{c.participantsCount}</td>
                  <td className="py-4 pr-6 text-right">
                    <div className="inline-flex items-center gap-1.5 text-amber-500 font-semibold justify-end">
                      <Trophy className="w-3.5 h-3.5 fill-current" />
                      <span>@{c.winner}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
