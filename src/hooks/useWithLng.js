import { useMemo } from "react";
import { useParams } from "react-router-dom";

export default function useWithLng(defaultLng = "en") {
  const { lng } = useParams();
  const currentLng = lng || defaultLng;

  const withLng = useMemo(
    () => (path = "") => `/${currentLng}${path}`,
    [currentLng],
  );

  return { withLng, lng: currentLng };
}
