import Chart from 'chart.js/auto';
import { useEffect, useState, useRef } from 'react';

const ChartComponent = () => {

  const [allData, setAllData] = useState([])
  const chartRef = useRef(null); 
  const chartInstance = useRef(null);

  useEffect(() => {
    const Data1 = localStorage.getItem('expenses')
    const parsedData = JSON.parse(Data1 || '[]')
    setAllData(parsedData)
  }, [])

  useEffect(() => {
    if (allData?.length === 0) return;

    const categories = [...new Set(allData?.map(item => item?.category))];
    const totals = categories?.map(cat => {
      return allData
        .filter(item => item?.category === cat)
        .reduce((sum, item) => sum + Number(item?.amount), 0);
    });

    if (chartInstance?.current) {
      chartInstance?.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [{
          label: 'Expenses by Category',
          data: totals,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Spending Breakdown' }
        }
      }
    });

    return () => {
      if (chartInstance?.current) chartInstance?.current.destroy();
    };
  }, [allData]);

  return (
    <div style={{ width: '400px', margin: 'auto' }}>
      {allData.length > 0 ? (
        <canvas ref={chartRef}></canvas>
      ) : (
        <p style={{ textAlign: 'center' }}>No data available to chart.</p>
      )}
    </div>
  )
}

export default ChartComponent