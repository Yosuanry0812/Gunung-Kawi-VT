export const locationConfig = {
  query: "Gunung Kawi Tampaksiring Banjar Penaka Gianyar Bali",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Gunung%20Kawi%20Tampaksiring%20Banjar%20Penaka%20Gianyar%20Bali",
  embedUrl:
    "https://maps.google.com/maps?q=Gunung%20Kawi%20Tampaksiring%20Banjar%20Penaka%20Gianyar%20Bali&output=embed",
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
