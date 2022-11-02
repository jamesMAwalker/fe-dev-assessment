
export const genApiUrl = ({ code, from, to }: UrlParams): string => {
  return `https://www.econdb.com/api/series/${code}/?from=${from}
&to=${to}&format=json`
}

export const getNewEconData = async ({ code, from, to }: UrlParams) => {
  const data = await fetch('/api/econ-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, from, to }),
  })

  const newChartData = await data.json()

  return newChartData
}
