import { createFileRoute } from "@tanstack/react-router";
import WifePage from "@/pages/wife/WifePage";

export const Route = createFileRoute("/wife")({
  component: WifePage,
  head: () => ({
    meta: [
      { title: "Kimmy - BadutZY's Wife" },
      {
        name: "description",
        content:
          "Kenali Victoria Kimberly Lukitama (Kimmy), Rizky's Wife, profil singkat dan galeri foto.",
      },
      { property: "og:title", content: "Kimmy - BadutZY's Wife" },
      { property: "og:description", content: "Profil singkat dan galeri foto Kimmy." },
    ],
  }),
});
