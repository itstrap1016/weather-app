import { WeatherApiRepository } from "../repositories";
import { WeatherApiClient } from "../api/api-client";

// jest.mock: 특정 모듈을 가짜로 만드는 함수
// '../api/api-client' 모듈의 모든 export를 가짜로 대체
jest.mock("../api/api-client");

describe("WeatherApiRepository", () => {
  let repository: WeatherApiRepository;
  let mockApiClient: jest.Mocked<WeatherApiClient>;

  beforeEach(() => {
    // mocked된 WeatherApiClient 인스턴스 생성
    mockApiClient = new WeatherApiClient() as jest.Mocked<WeatherApiClient>;
    mockApiClient.getCurrentWeather = jest.fn();
    mockApiClient.getAQI = jest.fn();

    repository = new WeatherApiRepository();
    // private 필드에 접근하기 위한 타입 캐스팅
    // 실제 apiClient를 mock으로 교체
    (repository as any).apiClient = mockApiClient;
  });

  describe("getCurrentWeather", () => {
    it("API 응답을 Weather 도메인 모델로 변환해야 한다", async () => {
      // Given: OpenWeatherMap API의 실제 응답 형태
      const apiResponse = {
        main: {
          temp: 25.3, // 소수점 포함
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

      mockApiClient.getCurrentWeather.mockResolvedValue(apiResponse);

      // When: Repository 메서드 실행
      const result = await repository.getCurrentWeather(37.5683, 126.9778);

      // Then: 도메인 모델로 올바르게 변환되었는지 확인
      expect(result).toEqual({
        temperature: 25, // Math.round(25.3) = 25
        description: "맑음",
        icon: "01d",
        city: "Seoul",
        temp_max: 28, // Math.round(28.1) = 28
        temp_min: 22, // Math.round(22.4) = 22
      });

      // API 클라이언트가 올바른 인자로 호출되었는지 확인
      expect(mockApiClient.getCurrentWeather).toHaveBeenCalledWith(
        37.5683,
        126.9778
      );
    });

    // it("API 클라이언트에서 에러가 발생하면 에러를 전파해야 한다", async () => {
    //   // Given
    //   mockApiClient.getCurrentWeather.mockRejectedValue(
    //     new Error("Network Error")
    //   );

    //   // When & Then
    //   await expect(
    //     repository.getCurrentWeather(37.5683, 126.9778)
    //   ).rejects.toThrow("Network Error");
    // });
  });

  describe("getAQI", () => {
    it("API 응답을 AQI 도메인 모델로 변환해야 한다", async () => {
      // Given
      const apiResponse = {
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

      mockApiClient.getAQI.mockResolvedValue(apiResponse);

      // When
      const result = await repository.getAQI(37.5683, 126.9778);

      // Then: getAQILevel 함수가 올바르게 적용되었는지 확인
      expect(result).toEqual({
        aqi: 3,
        level: "보통", // getAQILevel(3)의 결과
      });
    });

    it("API 클라이언트에서 에러가 발생하면 에러를 전파 가능", async () => {
      // Given
      mockApiClient.getAQI.mockRejectedValue(new Error("AQI Network Error"));

      // When & Then
      await expect(repository.getAQI(37.5683, 126.9778)).rejects.toThrow(
        "AQI Network Error"
      );
    });
  });
});
