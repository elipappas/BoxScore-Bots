'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/nav_bar';
import { supabase } from '../../lib/supabase';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type DailyDist = {
  date: string;
  average_dist_pts: number | null;
  average_dist_reb: number | null;
  average_dist_ast: number | null;
};

export default function StatsPage() {
  const [dailyDist, setDailyDist] = useState<DailyDist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('tracking')
          .select('date, average_dist_pts, average_dist_reb, average_dist_ast')
          .order('date', { ascending: true }); // optional, sort by date

        if (error) throw error;

        // Supabase returns strings for numeric types sometimes, convert if needed
        const mappedData = (data || []).map((row: any) => ({
          date: row.date,
          average_dist_pts: row.average_dist_pts !== null ? +row.average_dist_pts : null,
          average_dist_reb: row.average_dist_reb !== null ? +row.average_dist_reb : null,
          average_dist_ast: row.average_dist_ast !== null ? +row.average_dist_ast : null,
        }));

        setDailyDist(mappedData);
      } catch (err) {
        console.error('Error fetching daily distribution:', err);
        setDailyDist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Compute overall averages
  const avg = (key: keyof DailyDist) =>
    dailyDist.length > 0
      ? (
          dailyDist.reduce((sum, d) => sum + Number(d[key] || 0), 0) /
          dailyDist.filter((d) => d[key] != null).length
        ).toFixed(2)
      : 'N/A';

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

      <main className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8 text-center text-white">
          <h1 className="text-4xl font-bold drop-shadow-md">
            BOXSCORE BOT HISTORIC PROJECTIONS
          </h1>
        </div>

        {/* Overall Averages */}
        <div className="mb-8 flex justify-center gap-6 text-white">
          <div className="bg-[#8B0000] px-4 py-2 rounded shadow">
            <span className="font-bold">Avg PTS Dist:</span> {avg('average_dist_pts')}
          </div>
          <div className="bg-[#8B0000] px-4 py-2 rounded shadow">
            <span className="font-bold">Avg REB Dist:</span> {avg('average_dist_reb')}
          </div>
          <div className="bg-[#8B0000] px-4 py-2 rounded shadow">
            <span className="font-bold">Avg AST Dist:</span> {avg('average_dist_ast')}
          </div>
        </div>

        {/* Bar Charts */}
        <div className="mb-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {[
            { key: 'average_dist_pts', label: 'PTS' },
            { key: 'average_dist_reb', label: 'REB' },
            { key: 'average_dist_ast', label: 'AST' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <h2 className="mb-2 text-lg font-bold text-center">
                {stat.label} Distribution by Day
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailyDist}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any) =>  value != null ? Number(value).toFixed(2) : 'N/A'} //FORMATTER SET TO ANY BC COMPILER DOESN'T LIKE POSSIBILITY OF UNDEFINED VARS
                    labelFormatter={(value: any) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  />
                  <Legend />
                  <Bar dataKey={stat.key as keyof DailyDist} fill="#8B0000" name={stat.label} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
