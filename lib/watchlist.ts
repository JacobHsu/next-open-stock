// Watchlist utility functions
const WATCHLIST_KEY = 'stock-watchlist';

export interface WatchlistItem {
    symbol: string;
    company: string;
    addedAt: number;
}

/**
 * Get all items from watchlist
 */
export const getWatchlist = (): WatchlistItem[] => {
    if (typeof window === 'undefined') return [];

    try {
        const data = localStorage.getItem(WATCHLIST_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading watchlist:', error);
        return [];
    }
};

/**
 * Check if a symbol is in watchlist
 */
export const isInWatchlist = (symbol: string): boolean => {
    const watchlist = getWatchlist();
    return watchlist.some(item => item.symbol.toUpperCase() === symbol.toUpperCase());
};

/**
 * Add a symbol to watchlist
 */
export const addToWatchlist = (symbol: string, company: string): boolean => {
    if (typeof window === 'undefined') return false;

    try {
        const watchlist = getWatchlist();
        const symbolUpper = symbol.toUpperCase();

        // Check if already exists
        if (watchlist.some(item => item.symbol === symbolUpper)) {
            return false;
        }

        const newItem: WatchlistItem = {
            symbol: symbolUpper,
            company,
            addedAt: Date.now(),
        };

        watchlist.push(newItem);
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
        return true;
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        return false;
    }
};

/**
 * Remove a symbol from watchlist
 */
export const removeFromWatchlist = (symbol: string): boolean => {
    if (typeof window === 'undefined') return false;

    try {
        const watchlist = getWatchlist();
        const symbolUpper = symbol.toUpperCase();
        const filtered = watchlist.filter(item => item.symbol !== symbolUpper);

        if (filtered.length === watchlist.length) {
            return false; // Symbol not found
        }

        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        return false;
    }
};

/**
 * Clear entire watchlist
 */
export const clearWatchlist = (): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(WATCHLIST_KEY);
    } catch (error) {
        console.error('Error clearing watchlist:', error);
    }
};
