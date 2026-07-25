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
  FileCheck2,
  Sparkles
} from 'lucide-react';

export const BuildWorkspace = () => {
  const { buildWorkspace, addBuildLog, setActiveTab, showToast } = useApp();
  const [logText, setLogText] = useState('');
  const [logSkill, setLogSkill] = useState('Mechanical Prototyping');

  // Interactive Cost Item Addition
  const [costItems, setCostItems] = useState([
    { item: "High-Capacity Bio-Sand Media Columns", qty: 2, cost: 45000, total: 90000 },
    { item: "DC Submersible 12V Solar Water Pump", qty: 1, cost: 35000, total: 35000 },
    { item: "Iron Precipitator Chemical Dosing Unit", qty: 1, cost: 25000, total: 25000 },
    { item: "Embedded Telemetry & Turbidity Sensors", qty: 1, cost: 20000, total: 20000 }
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('1');
  const [newItemCost, setNewItemCost] = useState('5000');

  const handleAddCostItem = (e) => {
    e.preventDefault();
    if (!newItemName) return;

    const qty = parseInt(newItemQty) || 1;
    const cost = parseInt(newItemCost) || 0;
    const total = qty * cost;

    setCostItems(prev => [...prev, { item: newItemName, qty, cost, total }]);
    setNewItemName('');
    setNewItemQty('1');
    setNewItemCost('5000');

    showToast({
      title: 'Cost Item Added!',
      message: `Added "${newItemName}" (₦${total.toLocaleString()}) to budget analysis.`,
      type: 'success'
    });
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!logText.trim()) return;
    addBuildLog(logText, logSkill);
    setLogText('');
    showToast({
      title: 'Build Log Posted!',
      message: `Recorded "${logSkill}" activity entry into project log.`,
      type: 'success'
    });
  };

  const riskList = buildWorkspace?.devPrep?.riskAnalysis || [
    { risk: "Media Clogging from Turbidity", mitigation: "Pre-filter mesh screen & backwash valve", status: "Mitigated" },
    { risk: "Solar Power Intermittent Voltage", mitigation: "Integrated 12V LiFePO4 Buffer Battery", status: "Validated" },
    { risk: "Chemical Dosing Over-Saturation", mitigation: "Automated pH feedback loop sensor", status: "In Progress" }
  ];

  const logsList = buildWorkspace?.buildLogs || buildWorkspace?.logs || [
    { id: 1, author: "David Olanrewaju", time: "10m ago", text: "Completed 3D CAD housing assembly for bio-sand column and pressure tested fittings.", skillTag: "Mechanical Prototyping" },
    { id: 2, author: "Nkechi Eze", time: "2h ago", text: "Calibrated turbidity sensor array and logged baseline water purity metrics.", skillTag: "IoT Sensor Calibration" }
  ];

  const totalCost = costItems.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in w-full">
      {/* Header Banner - Dark Background / White Text */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-[#2FA137] border border-emerald-500/30 px-3 py-1 rounded-full">
              SELECTED PROJECT (TOP 4 BUILD TEAM)
            </span>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Tech Lead Approved
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">{buildWorkspace?.groupName || "Group Alpha - Clean Hydro Systems"}</h1>
          <p className="text-xs text-slate-300 mt-1 font-medium">Full Prototype Fabrication, Cost Analysis & Skill-Tagged Build Logs</p>
        </div>

        <button
          onClick={() => setActiveTab('publish')}
          className="flex items-center justify-center gap-2 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg transition-all shrink-0"
        >
          <FileCheck2 className="w-4 h-4 text-white" />
          <span>Compile & Publish Final Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Dev Prep Tables & Cost Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Itemized Cost Analysis Table - White Background / Black Text */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-black text-base text-[#060721] flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#2FA137]" />
                <span>Itemized Cost Analysis & Prototype Budget</span>
              </h3>
              <span className="text-xs font-black text-[#2FA137] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Total: ₦{totalCost.toLocaleString()}</span>
            </div>

            <div className="overflow-x-auto max-w-full">
              <table className="w-full text-left text-xs border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                    <th className="py-2.5">Item Description</th>
                    <th className="py-2.5">Qty</th>
                    <th className="py-2.5">Unit Cost (₦)</th>
                    <th className="py-2.5 text-right">Total (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {costItems.map((row, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-bold text-[#060721] pr-2">{row.item}</td>
                      <td className="py-2.5 text-slate-600 font-medium">{row.qty}</td>
                      <td className="py-2.5 text-slate-600 font-medium">{row.cost.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-black text-[#060721]">₦{row.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Cost Item Form */}
            <form onSubmit={handleAddCostItem} className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-2">
              <input
                type="text"
                placeholder="New component name..."
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                className="sm:col-span-5 p-2.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium text-xs outline-none focus:ring-2 focus:ring-[#2FA137]"
              />
              <input
                type="number"
                min={1}
                placeholder="Qty"
                value={newItemQty}
                onChange={e => setNewItemQty(e.target.value)}
                className="sm:col-span-2 p-2.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-bold text-xs outline-none text-center"
              />
              <input
                type="number"
                placeholder="Unit Cost ₦"
                value={newItemCost}
                onChange={e => setNewItemCost(e.target.value)}
                className="sm:col-span-3 p-2.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-bold text-xs outline-none"
              />
              <button
                type="submit"
                className="sm:col-span-2 p-2.5 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Safety & Risk Analysis Table - White Background / Black Text */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Safety & Risk Assessment</span>
            </h3>

            <div className="overflow-x-auto max-w-full">
              <table className="w-full text-left text-xs border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                    <th className="py-2.5">Identified Risk</th>
                    <th className="py-2.5">Mitigation Strategy</th>
                    <th className="py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {riskList.map((row, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-bold text-[#060721] pr-2">{row.risk}</td>
                      <td className="py-2.5 text-slate-600 font-medium pr-2">{row.mitigation}</td>
                      <td className="py-2.5 text-right">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#2FA137] border border-emerald-200">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Build Logs & Skill Tagging */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
              <Hammer className="w-5 h-5 text-[#2FA137]" />
              <span>Skill-Tagged Build Log Entry</span>
            </h3>

            <form onSubmit={handleAddLog} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Select Verified Skill Tag</label>
                <select
                  value={logSkill}
                  onChange={e => setLogSkill(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-bold outline-none focus:ring-2 focus:ring-[#2FA137]"
                >
                  <option value="Mechanical Prototyping">Mechanical Prototyping</option>
                  <option value="Biogas Chemistry">Biogas Chemistry</option>
                  <option value="IoT Sensor Calibration">IoT Sensor Calibration</option>
                  <option value="CAD Structural Design">CAD Structural Design</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Technical Activity Log</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe progress, component assembly, or calibration test results..."
                  value={logText}
                  onChange={e => setLogText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium outline-none focus:ring-2 focus:ring-[#2FA137]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Post Build Entry</span>
              </button>
            </form>
          </div>

          {/* Activity Stream */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 px-1">Recorded Build Logs</h4>

            {logsList.map(log => (
              <div key={log.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-[#060721]">{log.author}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">{log.time}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{log.text}</p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#2FA137] border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-[#2FA137]" />
                    <span>{log.skillTag || log.skill}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
