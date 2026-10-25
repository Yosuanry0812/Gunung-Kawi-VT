import credits from "../../public/images/reference/attribution.json";
export const photography = credits;
export const photographByPath = new Map(
  photography.map((photo) => [photo.publicPath, photo]),
);
