"use client";
import { useEffect, useState } from "react";
import { World } from "./globe";

const GLOBE_CONFIG = {
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  globeColor: "#000000",
  emissive: "#000000",
  emissiveIntensity: 0.05,
  shininess: 0.9,
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
};

const GLOBE_DATA = [
  {
    order: 1,
    startLat: 19.0759837,
    startLng: 72.8776559,
    endLat: 28.7041,
    endLng: 77.1025,
    arcAlt: 0.3,
    color: "#0066FF",
  },
  {
    order: 2,
    startLat: 28.7041,
    startLng: 77.1025,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.5,
    color: "#0066FF",
  },
  {
    order: 3,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.2,
    color: "#0066FF",
  },
  {
    order: 4,
    startLat: 37.7749,
    startLng: -122.4194,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.4,
    color: "#0066FF",
  },
  {
    order: 5,
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 51.5074,
    endLng: -0.1278,
    arcAlt: 0.5,
    color: "#0066FF",
  },
  {
    order: 6,
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.1,
    color: "#0066FF",
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: 2.3522,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.2,
    color: "#0066FF",
  },
  {
    order: 8,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 55.7558,
    endLng: 37.6173,
    arcAlt: 0.3,
    color: "#0066FF",
  },
  {
    order: 9,
    startLat: 55.7558,
    startLng: 37.6173,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.5,
    color: "#0066FF",
  },
  {
    order: 10,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: "#0066FF",
  },
  {
    order: 11,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 19.0759837,
    endLng: 72.8776559,
    arcAlt: 0.5,
    color: "#0066FF",
  },
];

export default function GlobeDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[400px] w-full bg-black"></div>;
  }

  return (
    <div className="h-[400px] w-full">
      <World globeConfig={GLOBE_CONFIG} data={GLOBE_DATA} />
    </div>
  );
} 