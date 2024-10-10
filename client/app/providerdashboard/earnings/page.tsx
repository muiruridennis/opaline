"use client";
import React, { useEffect, useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import { CSVLink } from 'react-csv';
import Button from '../../../components/button';
import axios from 'axios';
import { dummyEarningsData } from '@/constants/dummyData';
import { SummaryCards } from './summaryCards';
import { EarningsGraph } from './earningsGraph';
import { PieChart } from './pieChart';

interface Transaction {
  id: number;
  date: string;
  service: string;
  amount: number;
}

const EarningsPage: React.FC = () => {
  const [earningsData, setEarningsData] = useState<Transaction[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('This Month');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 10;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dateOptions = ['Last Week', 'This Month', 'Custom Range'];

  // Fetch earnings data from the backend (placeholder for real API)
  useEffect(() => {
    const fetchEarningsData = async () => {
      setIsLoading(true);
      try {
        // Simulate fetching data
        const response = dummyEarningsData;
        setEarningsData(response);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEarningsData();
  }, []);

  // Calculate total earnings using useMemo
  const totalEarnings = useMemo(
    () => earningsData.reduce((sum, transaction) => sum + transaction.amount, 0),
    [earningsData]
  );

  // Handle export as PDF with better formatting
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Earnings Report', 10, 10);
    earningsData.forEach((transaction, index) => {
      doc.text(`${index + 1}. ${transaction.date}: ${transaction.service} - $${transaction.amount.toFixed(2)}`, 10, 20 + index * 10);
    });
    doc.save('earnings_report.pdf');
  };

  // Paginate transactions
  const paginatedTransactions = useMemo(
    () => earningsData.slice((currentPage - 1) * transactionsPerPage, currentPage * transactionsPerPage),
    [currentPage, earningsData]
  );

  // Change page
  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Earnings Overview</h1>
      <div className="p-4 border border-gray-300 rounded-md shadow-sm">
        <SummaryCards />
      </div>
      <div className="p-4 border border-gray-300 rounded-md shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col h-[400px]">
            <EarningsGraph />
          </div>
          <div className="p-4 border border-gray-300 rounded-md shadow-sm flex flex-col h-[400px]">
            <h2 className="text-xl font-semibold mb-4">Earnings by Service</h2>
            <div className="flex-1 flex items-center justify-center">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border border-gray-300 rounded-md shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Date:</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              aria-label="Filter by date"
            >
              {dateOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleExportPDF} text="Export as PDF" />
            <CSVLink data={earningsData} filename="earnings_report.csv">
              <Button text="Export as CSV" />
            </CSVLink>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">Total Earnings: ${totalEarnings.toFixed(2)}</h2>
        {isLoading ? (
          <p>Loading transactions...</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Service</th>
                <th className="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-center">
                    No transactions available.
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-2">{transaction.date}</td>
                    <td className="px-4 py-2">{transaction.service}</td>
                    <td className="px-4 py-2">${transaction.amount.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(earningsData.length / transactionsPerPage) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-1 border rounded-md ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            aria-label={`Go to page ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EarningsPage;
