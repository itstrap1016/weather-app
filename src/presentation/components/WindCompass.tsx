import {
  convertWindSpeed,
  getWindSpeedSymbol,
} from "@/shared/utils/unit-converters";
import { UNIT_STORAGE_KEYS } from "@/shared/constants/unit-settings";
import { BOX } from "@/shared/constants/style";

interface WindCompassProps {
  speed: number;
  direction: string; // 0-360도
  deg: number;
}

export default function WindCompass({
  speed,
  direction,
  deg,
}: WindCompassProps) {
  const windUnit = localStorage.getItem(UNIT_STORAGE_KEYS.WIND_SPEED) || "kmh";
  const convertedSpeed = convertWindSpeed(speed, windUnit);
  const symbol = getWindSpeedSymbol(windUnit);

  return (
    <section
      className={`${BOX} flex h-[100px] justify-center items-center gap-3`}
    >
      <div className="basis-full flex justify-center">
        <div>
          <p className="text-sm mb-1">{direction}</p>
          <p className="text-sm font-medium">
            {convertedSpeed}
            {symbol}
          </p>
        </div>
      </div>
      <div className="basis-full flex justify-center">
        <svg width={80} height={80} viewBox="0 0 80 80">
          <circle
            cx={40}
            cy={40}
            r={40}
            fill="white"
            stroke="#dbdbdb"
            strokeWidth={1}
          />
          <text
            x={40}
            y={15}
            textAnchor="middle"
            fontSize={10}
            fill="#666666"
            fontWeight="bold"
          >
            북
          </text>
          <text
            x={40}
            y={70}
            textAnchor="middle"
            fontSize={10}
            fill="#666666"
            fontWeight="bold"
          >
            남
          </text>
          <text
            x={68}
            y={45}
            textAnchor="middle"
            fontSize={10}
            fill="#666666"
            fontWeight="bold"
          >
            동
          </text>
          <text
            x={12}
            y={45}
            textAnchor="middle"
            fontSize={10}
            fill="#666666"
            fontWeight="bold"
          >
            서
          </text>
          <g transform={`rotate(${(deg + 180) % 360} 40 40)`}>
            <line
              x1={40}
              y1={22}
              x2={40}
              y2={58}
              stroke="#666666"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <polygon points="40,16 37,24 43,24" fill="#666666" />
          </g>
        </svg>
      </div>
    </section>
  );
}
