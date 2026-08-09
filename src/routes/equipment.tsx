import { createFileRoute } from "@tanstack/react-router";
import EquipmentPage from "@/pages/equipment/EquipmentPage";

export const Route = createFileRoute("/equipment")({
  component: EquipmentPage,
  head: () => ({
    meta: [
      { title: "Equipment BadutZY — Setup PC & Peripheral" },
      {
        name: "description",
        content:
          "Spesifikasi lengkap setup PC dan peripheral yang dipakai Rizky Maulana Putra (BadutZY) untuk coding, modding, dan development game.",
      },
      { property: "og:title", content: "Equipment BadutZY" },
      {
        property: "og:description",
        content: "Spesifikasi CPU, GPU, RAM, storage, dan peripheral setup.",
      },
    ],
  }),
});
