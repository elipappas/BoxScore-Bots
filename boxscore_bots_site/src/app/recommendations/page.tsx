'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/nav_bar';
import { supabase } from '../../lib/supabase';

type Player = {
  name: string;
  points: number | null;
  line: number | null;
  difference: number | null;
  recommendation: number | null;
};

export default function RecPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  // Sort state
  const [sortConfig, setSortConfig] = useState<{ key: keyof Player; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('differences')
          .select('name, points, line, difference, recommendation');

        if (error) {
          console.error('Error fetching projections:', error.message);
          setPlayerData([]);
        } else {
          const mapped = (data || []).map((row: any) => ({
            name: row.name,
            points: row.points,
            line: row.line,
            difference: row.difference,
            recommendation: row.recommendation
          }));
          setPlayerData(mapped);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setPlayerData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key: keyof Player) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = [...playerData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key] ?? 0;
    const bValue = b[key] ?? 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return direction === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
    }
  });

  const filteredPlayers = sortedPlayers.filter((player) =>
    player.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        Loading projections...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#87CEEB] font-sans text-[#2c3e50]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-24 pb-12">
        <div className="mb-8 text-center text-white">
          <h1 className="text-4xl font-bold drop-shadow-md">
            BOXSCORE BOT vs. SPORTSBOOKS
          </h1>
          <p className="mt-2 text-lg font-medium text-white/90">
            Top Picks for Today's Games
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by player name..."
            className="w-full max-w-md rounded-full border-2 border-white bg-white/95 px-6 py-3 shadow-lg outline-none transition-all focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#8B0000] text-white cursor-pointer">
                <tr>
                  {['name', 'points', 'line', 'difference', 'recommendation'].map((key, idx) => (
                    <th
                      key={idx}
                      className="p-4 font-bold uppercase tracking-wider text-center"
                      onClick={() => handleSort(key as keyof Player)}
                    >
                      {key.toUpperCase()}
                      {sortConfig?.key === key && (
                        <span>{sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                      <td className="p-4 font-semibold text-blue-900">{player.name}</td>
                      <td className="p-4 text-center font-medium">{(player.points ?? 0).toFixed(2)}</td>
                      <td className="p-4 text-center font-medium">{(player.line ?? 0).toFixed(2)}</td>
                      <td className="p-4 text-center font-medium">{(player.difference ?? 0).toFixed(2)}</td>
                      <td className="p-4 text-center font-medium">{player.recommendation != null && player.recommendation > 0 ? 'OVER' : 'UNDER'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-gray-400 italic">
                      No matching player found for "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
