import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Finnhub API Configuration
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'YOUR_FINNHUB_API_KEY';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

export interface FinnhubQuote {
  c: number; // Current price
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

export async function fetchFinnhubQuote(symbol: string): Promise<FinnhubQuote | null> {
  try {
    const response = await fetch(`${FINNHUB_BASE_URL}/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`);
    if (!response.ok) {
      throw new Error(`Finnhub API error: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.c === 0) return null; // Finnhub returns 0 for invalid symbols
    return data;
  } catch (error) {
    console.error('Error fetching Finnhub quote:', error);
    return null;
  }
}

// Map asset pairs to Finnhub symbols
export const getFinnhubSymbol = (pair: string, assetClass: string): string => {
  const symbolMap: Record<string, string> = {
    'EUR/USD': 'EURUSD',
    'GBP/USD': 'GBPUSD',
    'USD/JPY': 'USDJPY',
    'GBP/JPY': 'GBPJPY',
    'XAU/USD': 'OANDA:XAUUSD',
    'BTC/USD': 'BINANCE:BTCUSDT',
    'ETH/USD': 'BINANCE:ETHUSDT',
    'US30': 'DJIA',
    'US500': 'SPX',
    'VIX': 'VIX',
  };
  return symbolMap[pair] || pair.replace('/', '');
};