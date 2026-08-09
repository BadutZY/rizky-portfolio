import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "@/pages/about/AboutPage";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Rizky Maulana Putra (BadutZY) - Profil & Playlist" },
      {
        name: "description",
        content:
          "Kenali Rizky Maulana Putra (BadutZY) lebih dekat: siswa SMK RPL di Bogor, Indonesia, beserta playlist lagu favoritnya di YouTube Music dan Spotify.",
      },
      { property: "og:title", content: "About BadutZY" },
      {
        property: "og:description",
        content: "Latar belakang BadutZY dan playlist lagu favoritnya.",
      },
    ],
  }),
});
