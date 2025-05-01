'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

type ChartType = 'Line' | 'Bar' | 'Pie' | 'Nightingale' | 'ShareDataset' | 'NegativeBar';

const ChartSwitcher: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);
  const [selectedChart, setSelectedChart] = useState<ChartType>('Line');

  const trafficData = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ];

  const chartOptions: Record<ChartType, echarts.EChartsOption> = {
    Line: {
      title: { text: 'Line Chart', textStyle: { color: '#ffffff' } },
      tooltip: {},
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'line',
          data: [150, 230, 224, 218, 135],
          smooth: true,
          lineStyle: { color: '#3b82f6' },
        },
      ],
    },
    Bar: {
      title: { text: 'Bar Chart', textStyle: { color: '#ffffff' } },
      tooltip: {},
      xAxis: { type: 'category', data: ['A', 'B', 'C', 'D'] },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [23, 45, 76, 32],
          itemStyle: {
            color: (params) =>
              ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'][(params as any).dataIndex],
          },
        },
      ],
    },
    Pie: {
      title: { text: 'Traffic Source - Pie', textStyle: { color: '#ffffff' } },
      tooltip: { trigger: 'item' },
      legend: { top: 'bottom', textStyle: { color: '#ffffff' } },
      series: [
        {
          name: 'Traffic Source',
          type: 'pie',
          radius: '55%',
          data: trafficData,
          label: { formatter: '{b}: {d}%', color: '#fff' },
        },
      ],
    },
    Nightingale: {
      title: { text: 'Traffic Source - Nightingale', textStyle: { color: '#ffffff' } },
      legend: { top: 'bottom', textStyle: { color: '#ffffff' } },
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: [30, 100],
          roseType: 'area',
          data: trafficData,
          label: { formatter: '{b}: {d}%', color: '#fff' },
        },
      ],
    },
    ShareDataset: {
      title: { text: 'Shared Dataset', textStyle: { color: '#ffffff' } },
      tooltip: {},
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ],
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
    },
    NegativeBar: {
      title: {
        text: 'Bar with Negative Values',
        textStyle: { color: '#ffffff' },
        top: 20,
        left:40 // margin from the top
      },
      tooltip: {},
      grid: {
        left: '10%', // margin from the left
        top: 60      // additional space for the title
      },
      xAxis: { type: 'value' },
      yAxis: { type: 'category', data: ['Profit', 'Loss'] },
      series: [
        {
          type: 'bar',
          data: [200, -150],
          label: { show: true, position: 'right', color: '#fff' },
          itemStyle: {
            color: (params) => {
              const value = typeof params.value === 'number' ? params.value : Number(params.value);
              return value < 0 ? '#ef4444' : '#10b981';
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    } else {
      chartInstance.current.clear();
    }

    chartInstance.current.setOption(chartOptions[selectedChart]);

    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [selectedChart,chartOptions]);

  return (
    <div className="p-4 mt-10">
      <div className="flex flex-wrap gap-3 justify-center mb-20">
        {(Object.keys(chartOptions) as ChartType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedChart(type)}
            className={`px-4 py-2 rounded transition-all duration-300 text-sm md:text-base ${
              selectedChart === type
                ? 'bg-blue-600 text-white font-semibold scale-105 shadow-lg text-2xl'
                : 'bg-gray-200 text-gray-800 hover:bg-blue-200 text-xl'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div
        ref={chartRef}
        className="w-full rounded-xl shadow-xl bg-slate-800 mx-auto transition-all duration-500 flex items-center"
        style={{ height: '400px' }}
      />

      <style jsx>{`
        @media (min-width: 768px) {
          div[ref] {
            height: 400px !important;
          }
        }
        @media (min-width: 1024px) {
          div[ref] {
            height: 550px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ChartSwitcher;
