import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";

const CountryLabels = ({ geojson, hard }) => {
  const map = useMap();

  useEffect(() => {
    if (hard) return; 

    const labels = [];

    geojson.features.forEach((feature) => {
      try {
        if (feature.properties?.name) {
          const center = turf.pointOnFeature(feature);
          const [lng, lat] = center.geometry.coordinates;

          const label = L.marker([lat, lng], {
            interactive: false,
            opacity: 0,
          }).bindTooltip(feature.properties.name, {
            permanent: true,
            direction: "center",
            className: "country-label",
          }).openTooltip();

          label.addTo(map);
          labels.push(label);
        }
      } catch (err) {
        console.warn("Label placement error for", feature.properties?.name, err);
      }
    });

    return () => {
      labels.forEach((lbl) => map.removeLayer(lbl));
    };
  }, [geojson, hard, map]);

  return null;
};
export default CountryLabels;