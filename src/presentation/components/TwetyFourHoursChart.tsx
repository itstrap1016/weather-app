import type { TwentyFourHoursWeather } from "@/domain/weather";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import type { DotProps } from "recharts";
import { SECTION_LAYOUT } from "@/shared/constants/style";

interface TwentyFourHoursChartProps {
  data: TwentyFourHoursWeather[];
}

interface CustomTickProps {
  x?: number;
  y?: number;
  payload: { value: string };
}

const CustomDot = (props: DotProps & { payload?: TwentyFourHoursWeather }) => {
  const { cx, cy, payload } = props;

  return (
    <g>
      {/* 동그라미 */}
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#ff7300"
        stroke="#fff"
        strokeWidth={2}
      />
      {/* 온도 텍스트 */}
      <text
        x={cx}
        y={cy ? cy - 10 : 0}
        textAnchor="middle"
        className="text-sm font-medium"
      >
        {payload?.temparature}°
      </text>
    </g>
  );
};

function TwentyFourHoursChart({ data }: TwentyFourHoursChartProps) {
  const CustomXAxisTick = (props: CustomTickProps) => {
    const { x = 0, y = 0, payload } = props;
    const item = data.find((d) => d.time === payload.value);

    return (
      <g transform={`translate(${x},${y})`}>
        <image
          x={-15}
          y={-30}
          width={30}
          height={30}
          href={`https://openweathermap.org/img/wn/${item?.icon}@2x.png`}
        />
        <text x={0} y={15} textAnchor="middle" className="text-sm">
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <section className={`${SECTION_LAYOUT} mt-10`}>
      <h2 className="font-medium">24시간 일기예보</h2>
      <div className="w-full mt-5 h-[150px]">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, left: 20, right: 20 }}>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={CustomXAxisTick}
            />
            <YAxis hide={true} />
            <Line
              type="monotone"
              dataKey="temparature"
              stroke="rgba(255, 115, 0, 0.8)"
              strokeWidth={2}
              dot={<CustomDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default TwentyFourHoursChart;
