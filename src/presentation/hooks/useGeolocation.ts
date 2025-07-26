import { useEffect, useState } from "react";
import type { SelectedCity } from "@/domain/weather";
import type { Coordinates } from "@/shared/types/common-types";
import { SELECTED_CITY } from "@/shared/constants/storage";

interface LocationPermission {
  granted: boolean;
  denied: boolean;
  loading: boolean;
  error: string | null;
}

const saveSelectedCity = (city: SelectedCity) => {
  localStorage.setItem(SELECTED_CITY, JSON.stringify(city));
};

const getSelectedCity = (): SelectedCity | null => {
  const stored = localStorage.getItem(SELECTED_CITY);
  return stored ? JSON.parse(stored) : null;
};

export function useGeolocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [permission, setPermission] = useState<LocationPermission>({
    granted: false,
    denied: false,
    loading: true,
    error: null,
  });

  const requestPermission = () => {
    setPermission((prev) => ({
      ...prev,
      loading: true,
      error: null,
      denied: false,
    }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        saveSelectedCity({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setPermission({
          granted: true,
          denied: false,
          loading: false,
          error: null,
        });
      },
      (err) => {
        console.log(err);
        setPermission({
          granted: false,
          denied: true,
          loading: false,
          error: "위치 권한이 허용되지 않아서 아무것도 나타나지 않습니다",
        });
      }
    );
  };

  useEffect(() => {
    const selectedCity = getSelectedCity();

    if (selectedCity) {
      setLocation({
        lat: selectedCity.lat,
        lon: selectedCity.lon,
      });
      setPermission({
        granted: true,
        denied: false,
        loading: false,
        error: null,
      });
    } else {
      requestPermission();
    }
  }, []);

  return { location, permission, requestPermission };
}
