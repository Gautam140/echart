'use client';

import dynamic from 'next/dynamic';

const ChartSwitcher = dynamic(() => import('./components/ChartSwitcher'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        <span className="bg-blue-500 px-4 py-4 rounded-lg text-white">ECharts Dashboard</span>
      </h1>
      <ChartSwitcher />
    </main>
  );
}
