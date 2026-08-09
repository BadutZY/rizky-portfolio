import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/home/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Rizky Maulana Putra (BadutZY) - Pixel Portfolio" },
      {
        name: "description",
        content:
          "Portfolio pixel-art Rizky Maulana Putra (BadutZY), beginner programmer. Ringkasan profil, skill, dan project pilihan: website, mod, dan game.",
      },
      { property: "og:title", content: "BadutZY - Pixel Portfolio" },
      {
        property: "og:description",
        content: "Beginner programmer. Website, Minecraft mod, dan game PvP co-op.",
      },
    ],
  }),
});
