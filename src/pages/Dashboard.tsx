import React, { useMemo } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { Layout } from '../components/Layout';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorCard } from '../components/ErrorCard';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { DataTable } from '../components/DataTable';
import { DollarSign, ShoppingCart, Users, Activity } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
  PieChart, Pie
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { data, isLoading, error, refetch } = useDashboardData();

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];

  // Custom Tooltips for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-xl">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium">
                {entry.name.toLowerCase().includes('amount') || entry.name.toLowerCase().includes('sales')
                  ? formatCurrency(entry.value)
                  : formatNumber(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Layout onRefresh={() => {}} isRefreshing={true}>
        <LoadingSkeleton />
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout onRefresh={refetch}>
        <ErrorCard message={error?.message || 'Data unavailable'} onRetry={refetch} />
      </Layout>
    );
  }

  return (
    <Layout onRefresh={refetch} isRefreshing={isLoading}>
      <div className="space-y-6 md:space-y-8">
        
        {/* KPI Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(data.kpis.totalSales)}
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <KPICard
            title="Total Orders"
            value={formatNumber(data.kpis.orders)}
            icon={<ShoppingCart className="h-5 w-5" />}
            trend={{ value: 5.2, isPositive: true }}
          />
          <KPICard
            title="Total Customers"
            value={formatNumber(data.kpis.customers)}
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 2.1, isPositive: true }}
          />
          <KPICard
            title="Net Profit"
            value={formatCurrency(data.kpis.profit)}
            icon={<Activity className="h-5 w-5" />}
            trend={{ value: 1.4, isPositive: false }}
          />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <ChartCard title="Sales Trend" subtitle="Daily revenue for the last 7 days" className="lg:col-span-2 xl:col-span-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.salesTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                <XAxis dataKey="date" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" name="Revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Payment Methods" subtitle="Distribution of transactions">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.charts.paymentMethods}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.charts.paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {data.charts.paymentMethods.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Monthly Sales" subtitle="Performance across the year" className="lg:col-span-2 xl:col-span-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.charts.monthlySales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                <XAxis dataKey="month" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#262626', opacity: 0.4 }} />
                <Bar dataKey="amount" name="Sales" radius={[4, 4, 0, 0]}>
                  {data.charts.monthlySales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.charts.monthlySales.length - 1 ? '#8b5cf6' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        {/* Data Table Section */}
        <section>
          <DataTable data={data.recentInvoices} />
        </section>

      </div>
    </Layout>
  );
};
