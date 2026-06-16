import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useToast } from '../components/Toast';
import { Trophy, Medal, Flame, Award, Loader2, Sparkles } from 'lucide-react';

export const Leaderboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.getLeaderboard();
        setData(res);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load leaderboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [toast]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
          <span className="text-xs text-neutral-400 font-semibold tracking-wide">Compiling ranking positions...</span>
        </div>
      </div>
    );
  }

  const { leaderboard = [], currentUser } = data || {};

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 w-full text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/50 dark:border-neutral-800/50 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Leaderboard
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Compete with developers around the globe. Rank is determined by solve ratios and daily streaks.
          </p>
        </div>

        {/* Current user summarized stat */}
        {currentUser && (
          <div className="flex items-center gap-4 py-2.5 px-4 rounded-2xl bg-teal-500/10 border border-teal-500/20">
            <Award className="w-5 h-5 text-teal-500" />
            <div className="flex flex-col text-xs font-semibold">
              <span className="text-neutral-500 leading-none">Your Rank</span>
              <span className="text-base font-bold text-teal-600 dark:text-teal-400 mt-1">#{currentUser.rank}</span>
            </div>
            <div className="flex flex-col text-xs font-semibold border-l border-neutral-200 dark:border-neutral-800 pl-3">
              <span className="text-neutral-500 leading-none">Total Points</span>
              <span className="text-base font-bold text-neutral-800 dark:text-neutral-200 mt-1">{currentUser.points}</span>
            </div>
          </div>
        )}
      </div>

      {/* Ranks list grid */}
      <div className="glass-panel border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider text-left">
              <th className="py-4 pl-6 w-20">Rank</th>
              <th className="py-4 px-4">Username</th>
              <th className="py-4 px-4 w-32 text-center">Problems Solved</th>
              <th className="py-4 px-4 w-28 text-center">Streak</th>
              <th className="py-4 pr-6 w-32 text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
            {leaderboard.map((user) => (
              <tr
                key={user.username}
                className={`hover:bg-neutral-100/20 dark:hover:bg-neutral-800/10 transition-colors text-sm
                  ${user.isCurrentUser ? 'bg-teal-500/5 hover:bg-teal-500/10' : ''}
                `}
              >
                {/* Rank Column */}
                <td className="py-4 pl-6 font-bold">
                  <div className="flex items-center gap-1">
                    {user.rank === 1 && <Trophy className="w-4 h-4 text-amber-500" />}
                    {user.rank === 2 && <Medal className="w-4 h-4 text-neutral-400" />}
                    {user.rank === 3 && <Medal className="w-4 h-4 text-amber-700" />}
                    <span className={user.rank <= 3 ? 'text-teal-600 dark:text-teal-400' : 'text-neutral-500'}>
                      #{user.rank}
                    </span>
                  </div>
                </td>

                {/* Username Column */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${user.isCurrentUser ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-neutral-800 dark:text-neutral-200'}`}>
                      {user.username}
                    </span>
                    {user.isCurrentUser && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400 uppercase tracking-widest leading-none">
                        You
                      </span>
                    )}
                  </div>
                </td>

                {/* Solved Problems Column */}
                <td className="py-4 px-4 text-center text-neutral-700 dark:text-neutral-300 font-medium">
                  {user.solved}
                </td>

                {/* Streak Column */}
                <td className="py-4 px-4 text-center">
                  {user.streak > 0 ? (
                    <div className="inline-flex items-center gap-1 text-amber-500 font-semibold">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>{user.streak}</span>
                    </div>
                  ) : (
                    <span className="text-neutral-400 font-medium">-</span>
                  )}
                </td>

                {/* Points Column */}
                <td className="py-4 pr-6 text-right font-bold text-neutral-900 dark:text-neutral-100">
                  {user.points} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
