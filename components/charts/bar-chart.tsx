import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import ChartJS from 'chart.js/auto'

import { getNewEconData } from '../../lib/api-helpers'
import { getMonthName } from '../../lib/date-helpers'

export const BarChart = ({ code, label, range }: BarChartProps) => {
  
  const [chartData, setChartData] = useState<ChartingData>({
    values: [],
    dates:  [],
    status: [],
  })

  useEffect(() => {
    const { from, to } = range
    const getData = async () => {
      const { data } = await getNewEconData({ code, from, to } as UrlParams)
      if (data.values) {
        setChartData(data)
      }
    }
    getData()
  }, [code, range])

  const labels = chartData?.dates?.map((d) => {
    return `${d.slice(0, 4)} ${getMonthName(d)}`
  })

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          boxWidth: 2,
        },
      },
      title: {
        display: true,
        text: `${code} - United States - ${label}`,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label,
        data: labels?.map((_, idx) => chartData?.values[idx]),
        borderColor: 'deepskyblue',
      },
    ],
  }

  return (
    <>
      {chartData?.values && (
        <Bar redraw={false} options={options} data={data} />
      )}
    </>
  )
}
