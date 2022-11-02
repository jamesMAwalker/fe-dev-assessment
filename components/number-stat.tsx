import React, { useEffect, useState } from 'react'

import { getNewEconData } from '../lib/api-helpers'

import { numBlock } from './number-stat.module.scss'

export const NumberStat = ({ label, code, range }) => {
  const [displayStat, setDisplayStat] = useState(0)

  useEffect(() => {
    const { from, to } = range
    const getData = async () => {
      const {
        data: { values },
      } = await getNewEconData({ code, from, to })

      if (values) {
        const avg = Math.floor(
          values.reduce((a, c) => {
            return a + c
          }, 0) / values.length
        )
        setDisplayStat(avg)
      }
    }
    getData()
  }, [code, range])

  return (
    <div className={numBlock}>
      <p>{label}</p>
      <span>{displayStat.toLocaleString('en-US')}</span>
    </div>
  )
}
