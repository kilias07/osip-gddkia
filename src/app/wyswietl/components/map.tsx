import { useLayoutEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useChartsData } from "@/lib/store-zustand";

interface MapProps {
  data: {
    [x: string]:
      | string
      | number
      | {
          long: number | undefined;
          lat: number | undefined;
        };
    station: number;
    originalName: string;
    gps: {
      long: number | undefined;
      lat: number | undefined;
    };
  }[];
  indicator: "BCI" | "SCI" | "BDI";
}
export default function Map({ data, indicator }: MapProps) {
  const { chartsData } = useChartsData((state) => state);
  const [unmountMap, setunmountMap] = useState(false);

  const flattedData = chartsData.flat()[0].GPS;
  const [geoData, setGeoData] = useState({
    lat: flattedData.lat,
    lng: flattedData.long,
  });

  useLayoutEffect(() => {
    setunmountMap(false);
    setGeoData({ lat: flattedData.long, lng: flattedData.lat });
    return () => {
      setunmountMap(true);
    };
  }, [flattedData]);

  if (unmountMap) return <p>Ładowanie mapy...</p>;

  return (
    <MapContainer
      className="h-[627px] shrink-0 w-[300px] mt-[5px]"
      center={[data[0].gps.long!, data[0].gps.lat!]}
      zoom={15}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData.lng && <Marker position={[geoData.lat!, geoData.lng!]} />}
      {data.map((el) => {
        const indicatorVal = Object.values(el)[1] as number;
        return (
          <Marker
            key={el.station}
            position={[el.gps.long!, el.gps.lat!]}
            title={el.originalName}
          >
            <Popup>
              <span className="block">stacja: {el.station}</span>
              <span className="block">nazwa: {el.originalName}</span>
              <span className="block">
                {indicator}: {indicatorVal}
              </span>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
