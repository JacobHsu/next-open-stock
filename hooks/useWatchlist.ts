'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    getWatchlist,
    isInWatchlist as checkIsInWatchlist,
    addToWatchlist as addSymbol,
    removeFromWatchlist as removeSymbol,
    WatchlistItem
} from '@/lib/watchlist';

export const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load watchlist from localStorage on mount
    useEffect(() => {
        const loadWatchlist = () => {
            const items = getWatchlist();
            setWatchlist(items);
            setIsLoading(false);
        };

        loadWatchlist();

        // Listen for storage changes from other tabs
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'stock-watchlist') {
                loadWatchlist();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const isInWatchlist = useCallback((symbol: string): boolean => {
        return checkIsInWatchlist(symbol);
    }, []);

    const addToWatchlist = useCallback((symbol: string, company: string) => {
        const success = addSymbol(symbol, company);
        if (success) {
            setWatchlist(getWatchlist());
        }
        return success;
    }, []);

    const removeFromWatchlist = useCallback((symbol: string) => {
        const success = removeSymbol(symbol);
        if (success) {
            setWatchlist(getWatchlist());
        }
        return success;
    }, []);

    return {
        watchlist,
        isLoading,
        isInWatchlist,
        addToWatchlist,
        removeFromWatchlist,
    };
};

export const useWatchlistStatus = (symbol: string) => {
    const [isInList, setIsInList] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkStatus = () => {
            const status = checkIsInWatchlist(symbol);
            setIsInList(status);
            setIsLoading(false);
        };

        checkStatus();

        // Listen for storage changes
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'stock-watchlist') {
                checkStatus();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [symbol]);

    const toggle = useCallback((company: string) => {
        if (isInList) {
            const success = removeSymbol(symbol);
            if (success) setIsInList(false);
            return !isInList;
        } else {
            const success = addSymbol(symbol, company);
            if (success) setIsInList(true);
            return !isInList;
        }
    }, [symbol, isInList]);

    return {
        isInWatchlist: isInList,
        isLoading,
        toggle,
    };
};
