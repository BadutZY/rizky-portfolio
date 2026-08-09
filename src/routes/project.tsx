import { createFileRoute } from "@tanstack/react-router";
import ProjectPage from "@/pages/project/ProjectPage";

export const Route = createFileRoute("/project")({
  component: ProjectPage,
  head: () => ({
    meta: [
      { title: "Project BadutZY — Website, Mod & Game" },
      {
        name: "description",
        content:
          "Kumpulan project Rizky Maulana Putra (BadutZY): website portfolio & fan-made, mod Minecraft live dari Modrinth, dan game PvP co-op Box Siege.",
      },
      { property: "og:title", content: "Project BadutZY" },
      {
        property: "og:description",
        content: "Kumpulan website, mod, dan game yang pernah saya bangun.",
      },
    ],
  }),
});
