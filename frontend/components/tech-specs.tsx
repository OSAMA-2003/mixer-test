"use client";

import React, { useState } from "react";
import { Zap, Gauge, Wind, Shield, Layers, Cpu, CheckCircle2 } from "lucide-react";

export default function TechSpecs() {
  const [activeSpeedMode, setActiveSpeedMode] = useState<number>(2);

  const speedModes = [
    {
      id: 0,
      name: "Gentle Fold",
      rpm: "8,500 RPM",
      sound: "52 dB (Whisper)",
      useCase: "Soft berries, kiwi slices, chia seed hydration, delicate fruit bowls.",
      color: "text-emerald-400",
      gaugePercent: 28,
    },
    {
      id: 1,
      name: "Hydro-Shear",
      rpm: "18,000 RPM",
      sound: "64 dB (Low hum)",
      useCase: "Fibrous greens, kale, celery stalks, cold pressed apples with peel.",
      color: "text-amber-400",
      gaugePercent: 60,
    },
    {
      id: 2,
      name: "Hyper-Vortex Turbo",
      rpm: "30,000 RPM",
      sound: "71 dB (Damped)",
      useCase: "Whole frozen mango chunks, coconut ice blocks, complete silky emulsion.",
      color: "text-orange-400",
      gaugePercent: 100,
    },
    {
      id: 3,
      name: "Micro-Pulse Cycle",
      rpm: "Variable Pulsing",
      sound: "Wave harmonics",
      useCase: "Intermittent shockwaves that dislodge and shred dense nuts and seeds.",
      color: "text-rose-400",
      gaugePercent: 82,
    },
  ];

  const currentMode = speedModes[activeSpeedMode];

  return (
    <section id="tech-specs" className="relative py-28 px-6 bg-[#0a0f16] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" /> Aerospace Engineering
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            The Science of <span className="text-gradient-orange">Hydro-Vortex</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Why our blends taste infinitely creamier. Our custom motor and blade geometry create a zero-gravity fluid suction effect that breaks cells without burning nutrients.
          </p>
        </div>

        {/* Interactive Mode Simulator + Machine Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Interactive Dial & Gauge (Left 5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-amber-400" /> Mode Selector Simulator
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>

              {/* Gauge Display */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-center mb-6">
                <div className="text-xs text-slate-400 uppercase font-mono tracking-widest mb-1">
                  Active Blade Velocity
                </div>
                <div className={`text-4xl sm:text-5xl font-black tracking-tight ${currentMode.color}`}>
                  {currentMode.rpm}
                </div>
                <div className="text-xs text-slate-400 mt-2 flex items-center justify-center gap-2">
                  <span>Acoustics: {currentMode.sound}</span>
                </div>

                {/* Progress bar gauge */}
                <div className="w-full h-3 bg-white/10 rounded-full mt-4 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-500"
                    style={{ width: `${currentMode.gaugePercent}%` }}
                  />
                </div>
              </div>

              {/* Use Case Note */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 leading-relaxed mb-6">
                <span className="font-bold text-white block mb-1">Optimal Application:</span>
                {currentMode.useCase}
              </div>
            </div>

            {/* Mode Selector Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {speedModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveSpeedMode(mode.id)}
                  className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                    activeSpeedMode === mode.id
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10"
                      : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="text-white font-extrabold">{mode.name}</div>
                  <div className="text-[11px] opacity-75 font-mono">{mode.rpm}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Core Hardware Breakdown (Right 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1800W High-Torque Motor</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Industrial pure copper winding delivers 3.5 peak horsepower, instantly crushing rock-hard frozen fruits and fibrous greens without stalling.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-amber-400">
                <CheckCircle2 className="w-4 h-4" /> Constant Torque Load Control
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Diamond-Cut Titanium Blades</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  6-wing multi-plane hydrofoil blades precision-angled at 28°, 45°, and 60° to simultaneously create lift, cavitation, and micro-shearing.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-orange-400">
                <CheckCircle2 className="w-4 h-4" /> Never Requires Resharpening
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Wind className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Dual Thermal Dissipation</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Aerodynamic exhaust channels prevent heat from migrating from the motor base to the glass pitcher, keeping cold smoothies cold.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> &lt; 22°C Cold Extraction
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Borosilicate Acoustic Glass</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Heavy-duty 8mm thermal shock-proof glass with interior ribbed baffles that break laminar flow and force continuous vertical recycling.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-purple-400">
                <CheckCircle2 className="w-4 h-4" /> 100% BPA-Free & Scratch Proof
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
