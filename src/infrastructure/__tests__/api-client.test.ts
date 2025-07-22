import { WeatherApiClient } from "../api/api-client";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// MSW (Mock Service Worker): 실제 HTTP 요청을 가로채서 가짜 응답을 보내주는 라이브러리
// setupServer: 가짜 HTTP 서버 생성
const server = setupServer();

// 모든 테스트 시작 전에 가짜 서버 시작
beforeAll(() => server.listen());
// 각 테스트 후에 핸들러 초기화 (테스트 간 영향 방지)
afterEach(() => server.resetHandlers());
// 모든 테스트 완료 후 서버 종료
afterAll(() => server.close());

describe("WeatherApiClient", () => {
  let apiClient: WeatherApiClient;

  beforeEach(() => {
    apiClient = new WeatherApiClient();
  });

  describe("getCurrentWeather", () => {
    it("성공적으로 날씨 데이터를 가져와야 한다", async () => {
      // Given: 가짜 API 응답 데이터 준비
      const mockResponse = {
        main: {
          temp: 25.3,
          temp_max: 28.1,
          temp_min: 22.4,
        },
        weather: [
          {
            description: "맑음",
            icon: "01d",
          },
        ],
        name: "Seoul",
      };

      // server.use: 이 테스트에서만 사용할 임시 핸들러 추가
      server.use(
        // http.get: GET 요청을 가로채는 핸들러
        // '*/weather': weather로 끝나는 모든 URL 패턴
        http.get("*/weather", () => {
          // HttpResponse.json: JSON 응답 생성
          return HttpResponse.json(mockResponse);
        })
      );

      // When: 실제 API 클라이언트 메서드 호출
      const result = await apiClient.getCurrentWeather(37.5683, 126.9778);

      // Then: 응답이 예상과 같은지 확인
      expect(result).toEqual(mockResponse);
    });

    // 에러 응답 테스트
    it("API 에러 시 적절한 에러를 던져야 한다", async () => {
      // Given: 404 에러 응답 설정
      server.use(
        http.get("*/weather", () => {
          // HttpResponse.json에 status 옵션으로 HTTP 상태 코드 설정
          return new HttpResponse(null, { status: 404 });
        })
      );

      // When & Then: 에러가 발생하는지 확인
      await expect(
        apiClient.getCurrentWeather(37.5683, 126.9778)
      ).rejects.toThrow("Weather API Error: 404");
    });
  });

  describe("getAQI", () => {
    it("성공적으로 AQI 데이터를 가져와야 한다", async () => {
      // Given
      const mockResponse = {
        list: [
          {
            main: { aqi: 3 },
            components: {
              pm2_5: 8.47,
              pm10: 12.82,
            },
          },
        ],
      };

      server.use(
        http.get("*/air_pollution", () => {
          return HttpResponse.json(mockResponse);
        })
      );

      // When
      const result = await apiClient.getAQI(37.5683, 126.9778);

      // Then
      expect(result).toEqual(mockResponse);
    });
  });
});
