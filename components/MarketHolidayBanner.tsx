'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, Clock } from 'lucide-react';

interface Holiday {
  date: string;
  name: string;
  type: 'full' | 'early';
  closeTime?: string;
}

interface HolidayData {
  today: Holiday | null;
  tomorrow: Holiday | null;
  nextHoliday: Holiday | null;
}

const MarketHolidayBanner = () => {
  const [holidayData, setHolidayData] = useState<HolidayData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('/api/market-holidays');
        const result = await response.json();
        if (result.success) {
          setHolidayData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch market holidays:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  if (loading || !holidayData) {
    return null;
  }

  // Show today's holiday if exists
  if (holidayData.today) {
    const { name, type, closeTime } = holidayData.today;

    // Full closure today - Red (strong warning)
    if (type === 'full') {
      return (
        <div className="w-full mb-4 p-4 bg-red-950/40 border border-red-800/60 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-100 font-medium">
                <span className="font-semibold">Market Closed Today</span> - {name}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Early close today - Orange (warning)
    return (
      <div className="w-full mb-4 p-4 bg-orange-950/40 border border-orange-800/60 rounded-lg">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-orange-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-orange-100 font-medium">
              <span className="font-semibold">Early Close Today</span> - {name} (Close at {closeTime})
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show tomorrow's holiday if exists
  if (holidayData.tomorrow) {
    const { name, type, closeTime } = holidayData.tomorrow;

    // Full closure tomorrow - Gray/Slate (advance notice)
    if (type === 'full') {
      return (
        <div className="w-full mb-4 p-4 bg-slate-800/40 border border-slate-700/60 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-slate-200 font-medium">
                <span className="font-semibold">Market Closed Tomorrow</span> - {name}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Early close tomorrow - Yellow (advance reminder)
    return (
      <div className="w-full mb-4 p-4 bg-yellow-950/40 border border-yellow-800/60 rounded-lg">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-yellow-100 font-medium">
              <span className="font-semibold">Early Close Tomorrow</span> - {name} (Close at {closeTime})
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Don't show anything if no holiday today or tomorrow
  return null;
};

export default MarketHolidayBanner;
