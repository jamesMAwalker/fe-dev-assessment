import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import { formatToYM, formatToYMD } from '../lib/date-helpers'

import { CalendarIcon } from './svg/calendar-icon'
import { BarChart } from './charts/bar-chart'
import { LineChart } from './charts/line-chart'
import { NumberStat } from './number-stat'

import 'react-datepicker/dist/react-datepicker.css'
import {
  container,
  toolbar,
  tools,
  tool,
  datePicker,
  scaleContainer,
  chartsContainer,
  charts,
  chart,
  wBorder,
} from './dashboard.module.scss'

export const Dashboard = () => {
  const [scale, setScale] = useState(1)
  const [range, setRange] = useState<DateRange>({
    from: '2015-01-01',
    to: '2021-01-01',
  })

  const handleSetRange = (id: string, date: Date) => {
    const formattedDate = formatToYMD(date)

    setRange((prv) => {
      return {
        ...prv,
        [id.toLowerCase()]: formattedDate,
      }
    })
  }

  const handleSetScale = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = (e.target as HTMLInputElement)

    setScale(Number(value))
  }

  const chartElements = [
    {
      code: 'CPIUS',
      label: 'Consumer price index',
      Component: LineChart,
    },
    {
      code: 'CONFUS',
      label: 'Consumer confidence index',
      Component: LineChart,
    },
    {
      code: 'RETAUS',
      label: 'Retail trade',
      Component: BarChart,
    },
  ]

  const numberElements = [
    {
      code: 'SENTUS',
      label: 'Average US Sentiment index (SENTUS)',
    },
    {
      code: 'POPUS',
      label: 'Population growth during selected period (POPUS)',
    },
  ]

  return (
    <div className={container}>
      <nav className={toolbar}>
        <h1>Economic Dashboard</h1>
        <ul className={tools}>
          
          {['From', 'To'].map((name) => {
            const limit =
              name === 'To'
                ? { minDate: new Date(range.from) }
                : { maxDate: new Date(range.to) }

            const keyName = name.toLowerCase() as string

            return (
              <li key={name} className={tool}>
                <label className={datePicker}>
                  <span>{name}</span>
                  <DatePicker
                    showMonthYearPicker
                    dateFormat={'yyyy/MM'}
                    selected={new Date(range[keyName as keyof typeof range])}
                    value={formatToYM(range[keyName as keyof typeof range])}
                    onChange={(d) => handleSetRange(name, d as Date)}
                    {...limit}
                  />
                  <CalendarIcon />
                </label>
              </li>
            )
          })}

          <li className={`${tool} ${scale}`}>
            <label>Scale</label>
            <span className={scaleContainer}>
              <input
                type='range'
                value={scale}
                min={1}
                max={2}
                step={0.01}
                onChange={handleSetScale}
              />
              <datalist id='extent'>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </datalist>
            </span>
          </li>
        </ul>
      </nav>
      <div className={chartsContainer}>
        <div className={charts}>

          {chartElements.map(({ code, label, Component }) => {
            const chartProps = { code, label, range, scale }

            return (
              <div key={code} className={chart}>
                <Component {...chartProps} />
              </div>
            )
          })}

          <div className={`${chart} ${wBorder}`}>
            {numberElements.map((el) => {
              return <NumberStat key={el.code} {...el} range={range} />
            })}
          </div>

        </div>
      </div>
    </div>
  )
}
