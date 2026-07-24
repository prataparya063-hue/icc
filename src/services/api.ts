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
  // We use a POST request as specified: /rest/v1/rpc/dashboard_json
  const response = await api.post('/rest/v1/rpc/dashboard_json');
  return response.data;
};
