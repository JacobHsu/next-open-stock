'use client';

import React from 'react';
import Link from 'next/link';
import { useWatchlist } from '@/hooks/useWatchlist';
import ETFMarketDataWidget from '@/components/ETFMarketDataWidget';
import TradingViewScreener from '@/components/TradingViewScreener';
import { WATCHLIST_MARKET_DATA_WIDGET_CONFIG } from '@/lib/constants';

const WatchlistPage = () => {
    const { watchlist, isLoading, removeFromWatchlist } = useWatchlist();
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    const handleRemove = (symbol: string) => {
        if (confirm(`Remove ${symbol} from watchlist?`)) {
            removeFromWatchlist(symbol);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-gray-400 text-xl">Loading watchlist...</div>
            </div>
        );
    }

    if (watchlist.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="text-center">
                    <div className="mb-4">
                        <svg
                            className="mx-auto h-16 w-16 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-300 mb-2">Your Watchlist is Empty</h2>
                    <p className="text-gray-500 mb-6">
                        Start adding stocks to your watchlist to track them here.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                    >
                        Browse Stocks
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-100 mb-2">My Watchlist</h1>
                    <p className="text-gray-400">
                        {watchlist.length} {watchlist.length === 1 ? 'stock' : 'stocks'} in your watchlist
                    </p>
                </div>

                <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800 border-b border-gray-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Symbol</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Company</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Added</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {watchlist.map((item) => (
                                    <tr
                                        key={item.symbol}
                                        className="hover:bg-gray-800 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/stocks/${item.symbol}`}
                                                className="text-teal-400 hover:text-teal-300 font-semibold text-lg"
                                            >
                                                {item.symbol}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {item.company}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {new Date(item.addedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <a
                                                    href={`https://seekingalpha.com/symbol/${item.symbol}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-medium"
                                                >
                                                    Seek
                                                </a>
                                                <Link
                                                    href={`/stocks/${item.symbol}`}
                                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors text-sm font-medium"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() => handleRemove(item.symbol)}
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-4 h-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TradingView Stock Screener */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-100 mb-4">Stock Screener</h2>
                    <TradingViewScreener height={550} />
                </div>

                {/* Popular ETFs Widget */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-100 mb-4">Popular ETFs</h2>
                    <ETFMarketDataWidget
                        scriptUrl={`${scriptUrl}market-quotes.js`}
                        config={WATCHLIST_MARKET_DATA_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </div>
        </div>
    );
};

export default WatchlistPage;
