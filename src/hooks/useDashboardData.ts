import { useState, useEffect, useCallback } from 'react';
import { DashboardResponse } from '../types';
import { fetchDashboardData } from '../services/api';

// Placeholder data in case API fails or env vars are missing
const PLACEHOLDER_DATA: DashboardResponse = {
  kpis: {
    todayRevenue: 12450,
    todayOrders: 142,
    mtdRevenue: 124500,
    arpu: 139.47,
  },
  charts: {
    salesTrend: [
      { date: 'Mon', amount: 4000 },
      { date: 'Tue', amount: 3000 },
      { date: 'Wed', amount: 5000 },
      { date: 'Thu', amount: 2780 },
      { date: 'Fri', amount: 6890 },
      { date: 'Sat', amount: 8390 },
      { date: 'Sun', amount: 7490 },
    ],
    monthlySales: [
      { month: 'Jan', amount: 65000 },
      { month: 'Feb', amount: 59000 },
      { month: 'Mar', amount: 80000 },
      { month: 'Apr', amount: 81000 },
      { month: 'May', amount: 56000 },
      { month: 'Jun', amount: 95000 },
    ],
    paymentMethods: [
      { name: 'Credit Card', value: 400 },
      { name: 'PayPal', value: 300 },
      { name: 'Stripe', value: 300 },
      { name: 'Crypto', value: 100 },
    ],
  },
  topReps: [
    { id: '1', salesRep: 'Alice Johnson', dayOrders: 28, dayRevenue: 3200, mtdOrders: 420, mtdRevenue: 48000, targetPercent: 92 },
    { id: '2', salesRep: 'Bob Smith', dayOrders: 24, dayRevenue: 2800, mtdOrders: 380, mtdRevenue: 43500, targetPercent: 84 },
    { id: '3', salesRep: 'Carol White', dayOrders: 31, dayRevenue: 3900, mtdOrders: 460, mtdRevenue: 52000, targetPercent: 98 },
    { id: '4', salesRep: 'David Lee', dayOrders: 19, dayRevenue: 2100, mtdOrders: 310, mtdRevenue: 35000, targetPercent: 71 },
    { id: '5', salesRep: 'Eva Martinez', dayOrders: 22, dayRevenue: 2600, mtdOrders: 350, mtdRevenue: 40000, targetPercent: 78 },
  ],
};

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase env vars missing, using placeholder data.');
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(PLACEHOLDER_DATA);
        return;
      }
      const responseData = await fetchDashboardData();
      setData(responseData);
    } catch (err: any) {
      console.error('Failed to fetch dashboard data:', err);
      // Fallback to placeholder if we want to show something, or just throw error
      // As per instructions, "Show proper error state if API fails."
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, isLoading, error, refetch: loadData };
};
