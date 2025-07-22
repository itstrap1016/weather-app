import { UseCases } from "../use-cases";
import type { WeatherRepository } from "../repositories";
import type { Weather, AQI } from "@/domain/weather";

// describe로 테스트 그룹 생성
describe("UseCases", () => {
  let useCases: UseCases;
  let mockRepository: jest.Mocked<WeatherRepository>;

  // beforeEach: 각 테스트 실행 전에 매번 실행되는 함수
  // 테스트 간 독립성을 보장하기 위해 초기화 작업 수행
  beforeEach(() => {
    // jest.Mocked: TypeScript에서 Mock 객체의 타입을 정의
    // 실제 WeatherRepository의 모든 메서드를 가짜 함수로 만듦
    mockRepository = {
      getCurrentWeather: jest.fn(), // jest.fn(): 가짜 함수 생성
      getAQI: jest.fn(),
    };

    // 실제 UseCases에 가짜 Repository 주입
    useCases = new UseCases(mockRepository);
  });

  describe("getCurrentWeather", () => {
    it("Repository의 getCurrentWeather를 호출하고 결과를 반환해야 한다", async () => {
      // Given (준비): 테스트에 필요한 데이터 준비
      const mockWeather: Weather = {
        temperature: 25,
        description: "맑음",
        icon: "01d",
        city: "Seoul",
        temp_max: 28,
        temp_min: 22,
      };

      // mockResolvedValue: 가짜 함수가 Promise.resolve(값)을 반환하도록 설정
      mockRepository.getCurrentWeather.mockResolvedValue(mockWeather);

      // When (실행): 실제 테스트할 기능 실행
      const result = await useCases.getCurrentWeather(37.5683, 126.9778);

      // Then (검증): 결과가 예상과 맞는지 확인
      // toEqual: 객체의 내용이 같은지 깊은 비교 (toBe는 참조 비교)
      expect(result).toEqual(mockWeather);

      // toHaveBeenCalledWith: 함수가 특정 인자로 호출되었는지 확인
      expect(mockRepository.getCurrentWeather).toHaveBeenCalledWith(
        37.5683,
        126.9778
      );

      // toHaveBeenCalledTimes: 함수가 몇 번 호출되었는지 확인
      expect(mockRepository.getCurrentWeather).toHaveBeenCalledTimes(1);
    });

    // 에러 케이스 테스트: 예외 상황 처리 확인
    it("Repository에서 에러가 발생하면 에러를 전파해야 한다", async () => {
      // Given: 가짜 함수가 에러를 던지도록 설정
      const errorMessage = "API 호출 실패";
      mockRepository.getCurrentWeather.mockRejectedValue(
        new Error(errorMessage)
      );

      // When & Then: 에러가 발생하는지 확인
      // rejects.toThrow: async 함수에서 에러가 발생하는지 확인
      await expect(
        useCases.getCurrentWeather(37.5683, 126.9778)
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("getAQI", () => {
    it("Repository의 getAQI를 호출하고 결과를 반환해야 한다", async () => {
      // Given
      const mockAQI: AQI = {
        aqi: 3,
        level: "보통",
      };
      mockRepository.getAQI.mockResolvedValue(mockAQI);

      // When
      const result = await useCases.getAQI(37.5683, 126.9778);

      // Then
      expect(result).toEqual(mockAQI);
      expect(mockRepository.getAQI).toHaveBeenCalledWith(37.5683, 126.9778);
    });

    it("Repository에서 에러가 발생하면 에러를 전파해야 한다", async () => {
      // Given
      const errorMessage = "AQI API 호출 실패";
      mockRepository.getAQI.mockRejectedValue(new Error(errorMessage));

      // When & Then
      await expect(useCases.getAQI(37.5683, 126.9778)).rejects.toThrow(
        errorMessage
      );
    });
  });
});
