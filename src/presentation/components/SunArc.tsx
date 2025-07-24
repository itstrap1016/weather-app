import { BOX } from "@/shared/constants/style";

interface SunArcProps {
  sunrise: string;
  sunset: string;
  isDaytime: boolean;
  progress: number;
}

export default function SunArc({
  sunrise,
  sunset,
  isDaytime,
  progress,
}: SunArcProps) {
  // SVG 설정
  const width = 80;
  const height = 160;
  const centerX = width / 2;
  const centerY = height / 2; // 박스의 중간 높이로 변경

  // Quadratic curve의 제어점을 이용한 해의 위치 계산
  const startX = 0;
  const endX = width;
  const controlX = centerX;
  const controlY = centerY - 80; // 곡선의 최고점

  // Quadratic Bezier curve 위의 점 계산
  const t = progress; // 0~1
  const sunX =
    (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
  const sunY =
    (1 - t) * (1 - t) * centerY + 2 * (1 - t) * t * controlY + t * t * centerY;

  return (
    <section className={`${BOX} h-[120px] relative overflow-hidden flex gap-3`}>
      <h2 className="sr-only">일출 일몰 시간</h2>

      {/* 텍스트 영역 - 50% */}
      <div className="basis-full flex flex-col justify-center items-center gap-1">
        <p className="mb-1 flex gap-0.5 text-sm">
          <span className="font-medium">{sunrise}</span>
          <span>일출</span>
        </p>
        <p className="flex gap-0.5 text-sm">
          <span>{sunset}</span>
          <span>일몰</span>
        </p>
      </div>

      {/* SVG 영역 - 50% */}
      <div className="basis-full relative">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="absolute -top-2 right-1/2 translate-x-1/2"
        >
          {/* 곡선 (Quadratic curve로 더 자연스러운 호) */}
          <path
            d={`M ${startX} ${centerY} Q ${controlX} ${controlY} ${endX} ${centerY}`}
            stroke="#dbdbdb"
            strokeWidth={2}
            fill="none"
          />

          {/* 해 (원) - 낮 시간에만 표시 */}
          {isDaytime && (
            <circle
              cx={sunX}
              cy={sunY}
              r={6}
              fill="#ff7300"
              filter="drop-shadow(0 0 8px rgba(255,179,0,0.6))"
            />
          )}

          {/* 밤일 때 달 표시 (선택사항) */}
          {!isDaytime && (
            <circle
              cx={endX}
              cy={centerY - 10}
              r={4}
              fill="#ffe9a7"
              filter="drop-shadow(0 0 6px #ffe9a7)"
            />
          )}
        </svg>
      </div>
    </section>
  );
}
