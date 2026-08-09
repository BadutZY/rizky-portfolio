import { createFileRoute } from "@tanstack/react-router";
import SkillPage from "@/pages/skills/SkillPage";

export const Route = createFileRoute("/skill")({
  component: SkillPage,
  head: () => ({
    meta: [
      { title: "Skill BadutZY — Web, Minecraft Modding & Game Dev" },
      {
        name: "description",
        content:
          "Skill Rizky Maulana Putra (BadutZY): Web Developer, Minecraft Modding dengan Java/Fabric/Forge, dan Game Developer dengan Unity & C#.",
      },
      { property: "og:title", content: "Skill BadutZY" },
      {
        property: "og:description",
        content: "Web Developer, Minecraft Modding, dan Game Developer.",
      },
    ],
  }),
});
