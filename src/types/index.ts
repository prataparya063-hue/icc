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

export interface Invoice {
  id: string;
  customerName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
  date: string;
}

export interface DashboardResponse {
  kpis: {
    totalSales: number;
    orders: number;
    customers: number;
    profit: number;
  };
  charts: {
    salesTrend: SalesData[];
    monthlySales: MonthlySales[];
    paymentMethods: PaymentMethod[];
  };
  recentInvoices: Invoice[];
}
