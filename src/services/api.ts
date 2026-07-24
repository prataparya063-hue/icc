import axios from 'axios';
import { DashboardResponse } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const api = axios.create({
  baseURL: supabaseUrl,
  headers: {
    'Content-Type': 'application/json',
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  },
});

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
  // Construct the correct endpoint by extracting the base domain, just in case the user's .env file has an old path
  const baseUrl = supabaseUrl ? supabaseUrl.split('/rest/')[0] : '';
  const endpoint = `${baseUrl}/rest/v1/rpc/dashboard_json`;
  
  const response = await api.post(endpoint);
  
  // The RPC returns a TABLE(dashboard_data JSONB), which comes as an array of one object.
  const rawData = Array.isArray(response.data) && response.data.length > 0 
    ? response.data[0].dashboard_data 
    : response.data?.dashboard_data;
    
  if (!rawData) {
    throw new Error('Invalid response format from Supabase RPC');
  }

  // Map the backend structure to our frontend DashboardResponse structure
  return {
    kpis: {
      todayRevenue: rawData.today_performance?.revenue || 0,
      todayOrders: rawData.today_performance?.orders || 0,
      mtdRevenue: rawData.month_mtd?.revenue || 0,
      arpu: rawData.month_mtd?.orders ? (rawData.month_mtd.revenue / rawData.month_mtd.orders) : 0,
    },
    charts: {
      salesTrend: (rawData.daily_summary || []).map((x: any) => ({
        date: new Date(x.date).toLocaleDateString('en-US', { weekday: 'short' }),
        amount: x.revenue
      })),
      monthlySales: (rawData.monthly_summary || []).map((x: any) => ({
        month: x.month,
        amount: x.revenue
      })),
      paymentMethods: (rawData.top_destinations || []).map((x: any) => ({
        name: x.destination,
        value: x.orders
      }))
    },
    topReps: (rawData.daily_leaderboard || []).slice(0, 10).map((x: any, i: number) => ({
      id: `REP-${i + 1}`,
      salesRep: x.sales_rep || 'Unknown',
      dayOrders: x.day_orders || 0,
      dayRevenue: x.day_revenue || 0,
      mtdOrders: x.mtd_orders || 0,
      mtdRevenue: x.mtd_revenue || 0,
      targetPercent: x.target_percent || 0,
    }))
  };
};
