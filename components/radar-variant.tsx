import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from "recharts"

type Props = {
  data?: {
    name: string
    value: number
  }[]
}

export const RadarVariat = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <RadarChart
        cx={"50%"}
        cy={"50%"}
        outerRadius={"60%"}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: "12px" }} dataKey={"name"} />
        <PolarRadiusAxis style={{ fontSize: "12px" }} />
        <Radar dataKey={"value"} stroke="#17CF97" fill="#17CF97" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  )
}