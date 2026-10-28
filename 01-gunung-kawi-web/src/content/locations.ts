// Verified against the Gunung Kawi Tampaksiring listing on Google Maps, 2026-10-28.
const placeId = "ChIJDYFDg0kZ0i0ReamnFXB97-E";
const query = "Gunung Kawi Tampaksiring, Gianyar, Bali";
export const locationConfig = {
  query,
  placeId,
  coordinates: { latitude: -8.4235384, longitude: 115.3105687 },
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&query_place_id=${placeId}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}&destination_place_id=${placeId}`,
  embedUrl:
    "https://www.google.com/maps?cid=16280369098320750969&z=17&output=embed",
};
export const sceneNames = [
  ["P01", "Gerbang Masuk", "Entrance Gate", "access"],
  ["P02", "Anak Tangga", "Steps", "access"],
  ["P03", "Sungai Pakerisan", "Pakerisan River", "landscape"],
  ["P04", "Kompleks Candi Barat", "Western Shrines", "heritage"],
  ["P05", "Kompleks Candi Timur", "Eastern Shrines", "heritage"],
  ["P06", "Wihara / Pertapaan", "Hermitage", "heritage"],
  ["P07", "Pancuran Air", "Water Spout", "landscape"],
  ["P08", "Area Persawahan", "Rice Fields", "landscape"],
  ["P09", "Tempat Persembahyangan", "Worship Area", "sacred"],
] as const;
export const scenes = sceneNames.map(([sceneId, nameId, nameEn, category]) => ({
  sceneId,
  nameId,
  nameEn,
  category,
  assetStatus: "planned" as const,
  description: {
    id: `Rencana dokumentasi ${nameId.toLowerCase()}; titik kamera ditentukan setelah survei.`,
    en: `Planned documentation of ${nameEn.toLowerCase()}; camera position subject to field survey.`,
  },
  permissionNotes:
    "Obtain management permission; confirm access and photography restrictions before capture.",
  hotspotPlan:
    "Link only to surveyed adjacent scenes; add verified object information.",
  narrationPlan:
    "Prepare Indonesian and English narration after academic review.",
  quizPlan: "Review relevant educational questions after content approval.",
}));
