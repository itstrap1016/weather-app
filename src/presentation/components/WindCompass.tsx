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
  return (
    <section
      className={`${BOX} flex h-[100px] justify-center items-center gap-3`}
    >
      <div className="basis-full flex justify-center">
        <div>
          <p className="text-sm mb-1">{direction}</p>
          <p className="text-sm font-medium">{speed}km/h</p>
        </div>
      </div>
      <div className="basis-full flex justify-center">
        <svg width={90} height={90} viewBox="0 0 80 80">
          {/* 외곽 원 */}
          <circle
            cx={40}
            cy={40}
            r={35}
            fill="white"
            stroke="#dbdbdb"
            strokeWidth={1}
          />

          {/* 방향 표시 (N, E, S, W) */}
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

          {/* 바람 화살표 (deg도 만큼 회전) */}
          <g transform={`rotate(${(deg + 180) % 360} 40 40)`}>
            {/* 화살표 몸통 */}
            <line
              x1={40}
              y1={20}
              x2={40}
              y2={60}
              stroke="#666666"
              strokeWidth={3}
              strokeLinecap="round"
            />
            {/* 화살표 머리 */}
            <polygon points="40,15 35,25 45,25" fill="#666666" />
          </g>
        </svg>
      </div>
    </section>
  );
}
