import React, { useState } from 'react';
import { TopRep } from '../types';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '../utils/cn';

interface DataTableProps {
  data: TopRep[];
}

const ITEMS_PER_PAGE = 5;

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((item) =>
    item.salesRep.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Sales Leaderboard</h3>
          <p className="text-sm text-muted-foreground mt-1">Performance of sales representatives</p>
        </div>
        <div className="relative max-w-sm w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search representative..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-64 pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-transparent border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">SALES REP</th>
              <th className="px-6 py-4 font-medium text-center">DAY ORDERS</th>
              <th className="px-6 py-4 font-medium text-center">DAY REVENUE</th>
              <th className="px-6 py-4 font-medium text-center">MTD ORDERS</th>
              <th className="px-6 py-4 font-medium text-center">MTD REVENUE</th>
              <th className="px-6 py-4 font-medium text-right">TARGET %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No sales reps found.
                </td>
              </tr>
            ) : (
              paginatedData.map((rep) => (
                <tr key={rep.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{rep.salesRep}</td>
                  <td className="px-6 py-4 text-center">{formatNumber(rep.dayOrders)}</td>
                  <td className="px-6 py-4 text-center">{formatCurrency(rep.dayRevenue)}</td>
                  <td className="px-6 py-4 text-center">{formatNumber(rep.mtdOrders)}</td>
                  <td className="px-6 py-4 text-center font-medium">{formatCurrency(rep.mtdRevenue)}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-semibold inline-flex",
                      rep.targetPercent >= 100 ? "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20" : "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                    )}>
                      {rep.targetPercent.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{Math.min(startIndex + 1, filteredData.length)}</span> to <span className="font-medium text-foreground">{Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length)}</span> of <span className="font-medium text-foreground">{filteredData.length}</span> results
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-1 rounded-md border border-border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 rounded-md border border-border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
