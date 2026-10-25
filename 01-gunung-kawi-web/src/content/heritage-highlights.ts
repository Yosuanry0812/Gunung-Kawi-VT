import type { MediaKey } from "./media";
export const highlights: {
  media: MediaKey;
  scene: string;
  id: { title: string; text: string };
  en: { title: string; text: string };
}[] = [
  {
    media: "east",
    scene: "P05",
    id: {
      title: "Kompleks Candi Timur",
      text: "Kelompok candi tebing di sisi timur Sungai Pakerisan.",
    },
    en: {
      title: "Eastern Shrines",
      text: "Rock-cut shrines on the eastern side of the Pakerisan River.",
    },
  },
  {
    media: "west",
    scene: "P04",
    id: {
      title: "Kompleks Candi Barat",
      text: "Bagian kompleks candi pada sisi barat sungai.",
    },
    en: {
      title: "Western Shrines",
      text: "A group of shrines on the western side of the river.",
    },
  },
  {
    media: "river",
    scene: "P03",
    id: {
      title: "Sungai Pakerisan",
      text: "Aliran sungai yang membentuk lanskap kawasan.",
    },
    en: {
      title: "Pakerisan River",
      text: "The river at the heart of the site's landscape.",
    },
  },
  {
    media: "hermitage",
    scene: "P06",
    id: {
      title: "Wihara / Pertapaan",
      text: "Ceruk pertapaan sebagai bagian dari tinggalan situs.",
    },
    en: {
      title: "Hermitage",
      text: "Meditation niches forming part of the archaeological site.",
    },
  },
  {
    media: "rice",
    scene: "P08",
    id: {
      title: "Area Persawahan",
      text: "Lingkungan agraris dalam rencana dokumentasi kawasan.",
    },
    en: {
      title: "Rice Fields",
      text: "An agricultural setting included in the planned site documentation.",
    },
  },
];
