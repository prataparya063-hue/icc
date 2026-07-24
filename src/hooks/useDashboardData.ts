import { useState, useEffect, useCallback } from 'react';
import { DashboardResponse } from '../types';
import { fetchDashboardData } from '../services/api';

// Placeholder data in case API fails or env vars are missing
const PLACEHOLDER_DATA: DashboardResponse = {
  kpis: {
    totalSales: 124500,
    orders: 1423,
    customers: 892,
    profit: 45600,
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
  recentInvoices: [
    { id: 'INV-001', customerName: 'Acme Corp', amount: 1500, status: 'Paid', date: '2023-10-01' },
    { id: 'INV-002', customerName: 'Globex', amount: 2300, status: 'Pending', date: '2023-10-02' },
    { id: 'INV-003', customerName: 'Soylent', amount: 890, status: 'Failed', date: '2023-10-03' },
    { id: 'INV-004', customerName: 'Initech', amount: 4500, status: 'Paid', date: '2023-10-04' },
    { id: 'INV-005', customerName: 'Umbrella', amount: 3100, status: 'Paid', date: '2023-10-05' },
    { id: 'INV-006', customerName: 'Stark Ind', amount: 12000, status: 'Pending', date: '2023-10-06' },
  ]
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
