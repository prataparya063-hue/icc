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
  // If VITE_SUPABASE_URL already includes the RPC path (e.g., from user input), use it directly.
  // Otherwise, fallback to the default dashboard_json endpoint.
  const hasRpcPath = supabaseUrl?.includes('/rest/v1/rpc/');
  const endpoint = hasRpcPath ? supabaseUrl : '/rest/v1/rpc/dashboard_json';
  
  const response = await api.post(endpoint);
  return response.data;
};
