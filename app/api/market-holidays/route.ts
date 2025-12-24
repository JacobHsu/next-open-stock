import { NextResponse } from 'next/server';
import marketHolidays from '@/public/data/market-holidays.json';

interface Holiday {
  date: string;
  name: string;
  type: 'full' | 'early';
  closeTime?: string;
}

interface HolidayResponse {
  today: Holiday | null;
  tomorrow: Holiday | null;
  nextHoliday: Holiday | null;
}

/**
 * Get market holiday information for today, tomorrow, and next upcoming holiday
 * GET /api/market-holidays
 */
export async function GET() {
  try {
    const now = new Date();
    // Convert to ET timezone (UTC-5 or UTC-4 for DST)
    const etOffset = -5 * 60; // ET is UTC-5 (or -4 during DST)
    const etDate = new Date(now.getTime() + etOffset * 60 * 1000);

    const today = etDate.toISOString().split('T')[0];
    const tomorrow = new Date(etDate.getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const holidays = marketHolidays.holidays as Holiday[];

    // Find today's holiday
    const todayHoliday = holidays.find((h) => h.date === today) || null;

    // Find tomorrow's holiday
    const tomorrowHoliday = holidays.find((h) => h.date === tomorrow) || null;

    // Find next upcoming holiday (after today)
    const upcomingHolidays = holidays.filter((h) => h.date > today);
    const nextHoliday = upcomingHolidays.length > 0 ? upcomingHolidays[0] : null;

    const response: HolidayResponse = {
      today: todayHoliday,
      tomorrow: tomorrowHoliday,
      nextHoliday,
    };

    return NextResponse.json({
      success: true,
      data: response,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error('Error in market-holidays API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
