module.exports = {
  // 테스트 실행 환경을 브라우저와 유사하게 설정
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/setupPolyfills.ts"],
  // 모든 테스트 파일이 실행되기 전에 setupTests.ts를 먼저 실행
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  // TypeScript 파일을 JavaScript로 변환하는 방법 설정
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  // 테스트할 파일 확장자들
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  // 코드 커버리지 측정 대상 파일들
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/main.tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
