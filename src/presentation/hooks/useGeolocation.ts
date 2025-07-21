import { useEffect, useState } from "react";

interface Coordinates {
  lat: number;
  lon: number;
}

interface LocationPermission {
  granted: boolean;
  denied: boolean;
  loading: boolean;
  error: string | null;
}

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
    requestPermission();
  }, []);

  return { location, permission, requestPermission };
}
