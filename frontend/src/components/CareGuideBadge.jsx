import React from 'react';
import { Sun, Droplets } from 'lucide-react';

export default function CareGuideBadge({ sunlight, water, compact = false }) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
        {sunlight && (
          <span 
            className="inline-flex items-center gap-1 bg-amber-50/90 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200/80 font-medium" 
            title={`Sunlight requirement: ${sunlight}`}
          >
            <Sun className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate max-w-[85px]">{sunlight}</span>
          </span>
        )}
        {water && (
          <span 
            className="inline-flex items-center gap-1 bg-sky-50/90 text-sky-900 px-2 py-0.5 rounded-md border border-sky-200/80 font-medium" 
            title={`Watering requirement: ${water}`}
          >
            <Droplets className="w-3 h-3 text-sky-600 shrink-0" />
            <span className="truncate max-w-[85px]">{water}</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 text-xs">
      <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-2xl flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
          <Sun className="w-4 h-4 text-amber-700" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-amber-950 text-[10px] uppercase tracking-wider">Sunlight Need</p>
          <p className="text-amber-900 font-semibold text-xs mt-0.5 truncate">{sunlight || 'Indirect Light'}</p>
        </div>
      </div>

      <div className="bg-sky-50/80 border border-sky-200/80 p-3 rounded-2xl flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
          <Droplets className="w-4 h-4 text-sky-700" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sky-950 text-[10px] uppercase tracking-wider">Watering Rhythm</p>
          <p className="text-sky-900 font-semibold text-xs mt-0.5 truncate">{water || 'Once a week'}</p>
        </div>
      </div>
    </div>
  );
}
