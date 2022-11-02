declare module "*.module.scss" {
  const classes: { [key: string]: string }
  export default classes
}

// INDEX
declare interface UrlParams {
  code: string,
  from: string,
  to:   string,
}

declare interface DateRange {
  from: string | Date,
  to:   string | Date,
}


// CHARTS
declare interface BarChartProps {
  code:  string,
  label: string,
  range: DateRange
}

declare interface LineChartProps {
  code:  string,
  label: string,
  range: DateRange,
  scale: number
}

declare interface ChartingData {
  values: string[],
  dates:  string[],
  status: number[]
}