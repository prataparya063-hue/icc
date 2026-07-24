export interface SalesData {
  date: string;
  amount: number;
}

export interface MonthlySales {
  month: string;
  amount: number;
}

export interface PaymentMethod {
  name: string;
  value: number;
}

export interface TopRep {
  id: string;
  salesRep: string;
  dayOrders: number;
  dayRevenue: number;
  mtdOrders: number;
  mtdRevenue: number;
  targetPercent: number;
}

export interface DashboardResponse {
  kpis: {
    todayRevenue: number;
    todayOrders: number;
    mtdRevenue: number;
    arpu: number;
  };
  charts: {
    salesTrend: SalesData[];
    monthlySales: MonthlySales[];
    paymentMethods: PaymentMethod[];
  };
  topReps: TopRep[];
}
