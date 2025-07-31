// src/shared/constants/unit-settings.ts

// 온도 단위 (API 지원)
export const TEMPERATURE_UNITS = {
  CELSIUS: "metric",
  FAHRENHEIT: "imperial",
} as const;

// 풍속 단위 (클라이언트 변환)
export const WIND_SPEED_UNITS = {
  KMH: "kmh", // 시간당 킬로미터
  MS: "ms", // 초당 미터 (API 기본값)
  MPH: "mph", // 시간당 마일
  KNOTS: "knots", // 노트
} as const;

// 기압 단위 (클라이언트 변환)
export const PRESSURE_UNITS = {
  MBAR: "mbar", // 밀리바 (API 기본값)
  MMHG: "mmHg", // 밀리미터 수은주
  INHG: "inHg", // 수은주 인치
  ATM: "atm", // 표준 대기
} as const;

export type TemperatureUnit =
  (typeof TEMPERATURE_UNITS)[keyof typeof TEMPERATURE_UNITS];
export type WindSpeedUnit =
  (typeof WIND_SPEED_UNITS)[keyof typeof WIND_SPEED_UNITS];
export type PressureUnit = (typeof PRESSURE_UNITS)[keyof typeof PRESSURE_UNITS];

// 라벨
export const UNIT_LABELS = {
  temperature: {
    metric: "섭씨 (°C)",
    imperial: "화씨 (°F)",
  },
  windSpeed: {
    kmh: "시간당 킬로미터 (km/h)",
    ms: "초당 미터 (m/s)",
    mph: "시간당 마일 (mph)",
    knots: "노트 (kn)",
  },
  pressure: {
    mbar: "밀리바 (mbar)",
    mmHg: "밀리미터 수은주 (mmHg)",
    inHg: "수은주 인치 (inHg)",
    atm: "표준 대기 (atm)",
  },
} as const;

// 로컬스토리지 키
export const UNIT_STORAGE_KEYS = {
  TEMPERATURE: "temperatureUnit",
  WIND_SPEED: "windSpeedUnit",
  PRESSURE: "pressureUnit",
} as const;
