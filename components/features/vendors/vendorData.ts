import {FeatureCollection, GeoJsonObject} from "geojson";
import {Vendor} from "@/models";
import {featureCollection, point} from "@turf/turf";

const vendorLocations: FeatureCollection<GeoJsonObject, Vendor> = featureCollection([
  point([-76.812076, 18.035770], {
    id: '1',
    name: 'Irie Pots',
    openingHour: 10,
    closingHour: 22,
    rating: 3,
  }),
  point([-76.812215, 18.036226], {
    id: '2',
    name: 'Jerk Pork Primer',
    openingHour: 9,
    closingHour: 21,
    rating: 4,
  }),
  point([-76.811950, 18.036050], {
    id: '3',
    name: 'Spice Haven',
    openingHour: 11,
    closingHour: 23,
    rating: 5,
  }),
  point([-76.812500, 18.035900], {
    id: '4',
    name: 'Reggae Bites',
    openingHour: 8,
    closingHour: 20,
    rating: 1,
  }),
  point([-76.812800, 18.036100], {
    id: '5',
    name: 'Yaad Vibes',
    openingHour: 12,
    closingHour: 24,
    rating: 3,
  }),
  point([-76.811700, 18.036300], {
    id: '6',
    name: 'Tropical Twist',
    openingHour: 10,
    closingHour: 22,
    rating: 4,
  }),
]);

export default vendorLocations;