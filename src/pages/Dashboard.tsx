import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { Layout } from '../components/Layout';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorCard } from '../components/ErrorCard';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { DataTable } from '../components/DataTable';
import { IndianRupee, ShoppingBag, TrendingUp, Award } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
  PieChart, Pie
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { data, isLoading, error, refetch } = useDashboardData();

  const COLORS = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#a142f4'];

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
            title="Today's Revenue"
            value={formatCurrency(data.kpis.todayRevenue)}
            icon={<IndianRupee className="h-5 w-5" />}
            trend={{ value: 143.9, isPositive: true }}
          />
          <KPICard
            title="Today's Orders"
            value={formatNumber(data.kpis.todayOrders)}
            icon={<ShoppingBag className="h-5 w-5" />}
            trend={{ value: 131.6, isPositive: true }}
          />
          <KPICard
            title="MTD Revenue"
            value={formatCurrency(data.kpis.mtdRevenue)}
            icon={<TrendingUp className="h-5 w-5" />}
            trend={{ value: 70.7, isPositive: true }}
          />
          <KPICard
            title="Top Performer (ARPU)"
            value={formatCurrency(data.kpis.arpu)}
            icon={<Award className="h-5 w-5" />}
          />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard title="Daily Revenue Trend" subtitle="Revenue over the current month" className="md:col-span-2">
            <div className="w-full" style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.charts.salesTrend} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#444746" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10} 
                  />
                  <YAxis 
                    stroke="#444746" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => formatCurrency(value)} 
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    name="Revenue" 
                    stroke="#1a73e8" 
                    strokeWidth={3} 
                    fillOpacity={0} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Top Destinations" subtitle="Orders by eSIM destination" className="md:col-span-1">
            <div className="w-full" style={{ height: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.charts.paymentMethods}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.charts.paymentMethods.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-4 px-2">
              {data.charts.paymentMethods.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-muted-foreground truncate" title={entry.name}>{entry.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </section>

        {/* Monthly Performance Chart */}
        <section>
          <ChartCard title="Monthly Performance" subtitle="Revenue comparison across months">
            <div className="w-full" style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.charts.monthlySales} margin={{ top: 10, right: 10, left: 10, bottom: 0 }} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#444746" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10} 
                  />
                  <YAxis 
                    stroke="#444746" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₹${value/1000}k`} 
                  />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#f0f4f9', opacity: 0.4 }} />
                  <Bar dataKey="amount" name="Revenue" radius={[4, 4, 0, 0]}>
                    {data.charts.monthlySales.map((_, index) => (
                      <Cell key={`cell-${index}`} fill="#0b57d0" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* Data Table Section */}
        <section>
          <DataTable data={data.topReps} />
        </section>

      </div>
    </Layout>
  );
};
