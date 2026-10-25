import { writeFileSync } from "node:fs";
import { scenes } from "../src/content/locations";
writeFileSync(
  "../03-dokumen/panorama-inventory.json",
  JSON.stringify(
    {
      status: "planned",
      surveyed: false,
      note: "Final locations depend on field survey and permissions.",
      scenes,
    },
    null,
    2,
  ) + "\n",
  "utf8",
);
console.log(
  "Exported nine planned scenes to 03-dokumen/panorama-inventory.json",
);
