interface SunArcProps {
  sunrise: number; // Unix timestamp
  sunset: number; // Unix timestamp
}

function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function SunArc({ sunrise, sunset }: SunArcProps) {
  const now = Math.floor(Date.now() / 1000);

  // 일출~일몰 구간에서 현재 시간의 비율 계산 (0~1)
  const progress = Math.max(
    0,
    Math.min(1, (now - sunrise) / (sunset - sunrise))
  );

  // 현재 시간이 일출 전이거나 일몰 후인지 확인
  const isDaytime = now >= sunrise && now <= sunset;

  // SVG 설정
  const width = 220;
  const height = 120;
  const arcRadius = 90;

  // 해의 위치 계산 (아치 위의 점)
  const angle = Math.PI * progress;
  const sunX = 20 + arcRadius * Math.cos(Math.PI - angle);
  const sunY = height - 20 - arcRadius * Math.sin(angle);

  return (
    <section className="rounded-2xl p-4 border-line-gray border-[1px] h-[120px] relative overflow-hidden">
      <h2 className="sr-only">일출 일몰 시간</h2>
      <div className="absolute inset-0">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* 아치 곡선 */}
          <path
            d={`M 20 ${height - 20} A ${arcRadius} ${arcRadius} 0 0 1 ${
              width - 20
            } ${height - 20}`}
            stroke="#dbdbdb"
            strokeWidth={2}
            fill="none"
          />

          {/* 해 (원) - 낮 시간에만 표시 */}
          {isDaytime && (
            <circle
              cx={sunX}
              cy={sunY}
              r={8}
              fill="#ff7300"
              filter="drop-shadow(0 0 12px rgba(255,255,255,0.8))"
            />
          )}
        </svg>
      </div>

      {/* 텍스트 */}
      <div className="relative z-10">
        <div className="text-lg font-medium mb-1">
          {formatTime(sunrise)} 일출
        </div>
        <div className="text-lg font-medium">{formatTime(sunset)} 일몰</div>
      </div>
    </section>
  );
}
