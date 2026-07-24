import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import {
  Hammer,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  MessageSquare,
  Plus,
  FileCheck2
} from 'lucide-react';

export const BuildWorkspace = () => {
  const { buildWorkspace, addBuildLog, setActiveTab } = useApp();
  const [logText, setLogText] = useState('');
  const [logSkill, setLogSkill] = useState('Mechanical Prototyping');

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!logText.trim()) return;
    addBuildLog(logText, logSkill);
    setLogText('');
  };

  const totalCost = buildWorkspace.devPrep.costAnalysis.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-black dark:bg-zinc-900 text-white border border-zinc-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="black">SELECTED PROJECT (TOP 4)</Badge>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Tech Lead Approved
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black">{buildWorkspace.groupName}</h1>
          <p className="text-xs text-zinc-400 mt-1">Full Prototype Fabrication, Cost Analysis & Skill-Tagged Build Logs</p>
        </div>

        <button
          onClick={() => setActiveTab('publish')}
          className="flex items-center justify-center gap-2 bg-white text-black font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg hover:opacity-90 transition-all shrink-0"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Compile & Publish Final Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Dev Prep Tables & Cost Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Itemized Cost Analysis Table */}
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-black dark:text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span>Itemized Cost Analysis</span>
              </h3>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Total: ₦{totalCost.toLocaleString()}</span>
            </div>

            <div className="overflow-x-auto max-w-full">
              <table className="w-full text-left text-xs border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400">
                    <th className="py-2.5">Item Description</th>
                    <th className="py-2.5">Qty</th>
                    <th className="py-2.5">Unit Cost (₦)</th>
                    <th className="py-2.5 text-right">Total (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {buildWorkspace.devPrep.costAnalysis.map((row, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-medium text-black dark:text-white pr-2">{row.item}</td>
                      <td className="py-2.5 text-zinc-500">{row.qty}</td>
                      <td className="py-2.5 text-zinc-500">{row.cost.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-bold text-black dark:text-white">{row.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* Safety & Risk Analysis Table */}
          <GlassCard className="space-y-4">
            <h3 className="font-bold text-sm text-black dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Safety & Risk Assessment</span>
            </h3>

            <div className="overflow-x-auto max-w-full">
              <table className="w-full text-left text-xs border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400">
                    <th className="py-2.5">Identified Risk</th>
                    <th className="py-2.5">Mitigation Strategy</th>
                    <th className="py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {buildWorkspace.devPrep.riskAnalysis.map((row, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-medium text-black dark:text-white pr-2">{row.risk}</td>
                      <td className="py-2.5 text-zinc-500 pr-2">{row.mitigation}</td>
                      <td className="py-2.5 text-right">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border border-zinc-200 dark:border-zinc-700">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Build Logs & Skill Tagging */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="space-y-4">
            <h3 className="font-bold text-sm text-black dark:text-white flex items-center gap-2">
              <Hammer className="w-4 h-4 text-black dark:text-white" />
              <span>Skill-Tagged Build Log Entry</span>
            </h3>

            <form onSubmit={handleAddLog} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-500 font-semibold mb-1">Select Verified Skill Tag</label>
                <select
                  value={logSkill}
                  onChange={e => setLogSkill(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                >
                  <option value="Mechanical Prototyping">Mechanical Prototyping</option>
                  <option value="Biogas Chemistry">Biogas Chemistry</option>
                  <option value="IoT Sensor Calibration">IoT Sensor Calibration</option>
                  <option value="CAD Structural Design">CAD Structural Design</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-500 font-semibold mb-1">Technical Activity Log</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe progress, component assembly, or calibration test results..."
                  value={logText}
                  onChange={e => setLogText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Post Build Entry</span>
              </button>
            </form>
          </GlassCard>

          {/* Activity Stream */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400 px-1">Recorded Build Logs</h4>

            {buildWorkspace.logs.map(log => (
              <GlassCard key={log.id} className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-black dark:text-white">{log.author}</span>
                  <span className="text-[10px] text-zinc-400">{log.time}</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{log.text}</p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border border-zinc-200 dark:border-zinc-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>{log.skillTag}</span>
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
