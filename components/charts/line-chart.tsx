import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import ChartJS from 'chart.js/auto'

import { getNewEconData } from '../../lib/api-helpers'
import { getMonthName } from '../../lib/date-helpers'

export const LineChart = ({ code, label, range, scale }: LineChartProps) => {
  const [chartData, setChartData] = useState<ChartingData>({
    values: [],
    dates: [],
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
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          boxWidth: 5,
          boxHeight: 5,
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
        label: code,
        data: labels?.map((_, idx) => chartData?.values[idx]),
        borderColor: 'deepskyblue',
      },
      {
        label: `${code} x${scale}`,
        data: labels?.map((_, idx) =>
          (Number(chartData?.values[idx]) * scale).toString()
        ),
        borderColor: 'goldenrod',
      },
    ],
  }

  return (
    <>
      {chartData?.values && (
        <Line redraw={false} options={options} data={data} />
      )}
    </>
  )
}
