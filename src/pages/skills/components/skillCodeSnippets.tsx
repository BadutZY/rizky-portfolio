import type { ReactNode } from "react";
import { loaderIcons } from "@/data/image";

// ─── Per-skill "typed code" preview shown in the left panel of SkillPanel ──
export type CodeLine = { content: ReactNode; indent?: number };

const kw = "text-secondary";
const id = "text-foreground";
const str = "text-foreground/80";
const punc = "text-muted-foreground";
const brace = "text-secondary";

export const codeByKey: Record<string, () => CodeLine[]> = {
  "web-dev": () => [
    {
      content: (
        <>
          <span className={kw}>interface</span> <span className={id}>WebDev</span>{" "}
          <span className={brace}>{"{"}</span>
        </>
      ),
    },
    {
      content: (
        <>
          <span className={kw}>frameworks</span>
          <span className={punc}>:</span> <span className={str}>["React", "Tailwind"]</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    {
      content: (
        <>
          <span className={kw}>languages</span>
          <span className={punc}>:</span> <span className={str}>["HTML", "CSS", "JS"]</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    {
      content: (
        <>
          <span className={kw}>tools</span>
          <span className={punc}>:</span> <span className={str}>["VS Code"]</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    {
      content: (
        <>
          <span className={kw}>platform</span>
          <span className={punc}>:</span> <span className={str}>["GitHub"]</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    { content: <span className={brace}>{"}"}</span> },
  ],
  "mc-modding": () => [
    {
      content: (
        <>
          <span className={kw}>public class</span> <span className={id}>MinecraftMod</span>{" "}
          <span className={brace}>{"{"}</span>
        </>
      ),
    },
    {
      content: (
        <>
          <span className={kw}>String</span> <span className={id}>engine</span>{" "}
          <span className={punc}>=</span> <span className={str}>"Fabric", "Forge"</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    {
      content: (
        <>
          <span className={kw}>String</span> <span className={id}>language</span>{" "}
          <span className={punc}>=</span> <span className={str}>"Java"</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    {
      content: (
        <>
          <span className={kw}>String</span> <span className={id}>tools</span>{" "}
          <span className={punc}>=</span> <span className={str}>"Intellij IDEA"</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    {
      content: (
        <>
          <span className={kw}>String</span> <span className={id}>platform</span>{" "}
          <span className={punc}>=</span> <span className={str}>"Modrinth", "Curseforge"</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    { content: <span className={brace}>{"}"}</span> },
  ],
  "game-dev": () => [
    {
      content: (
        <>
          <span className={kw}>public class</span> <span className={id}>GameDev</span>{" "}
          <span className={punc}>:</span> <span className={brace}>MonoBehaviour</span>{" "}
          <span className={brace}>{"{"}</span>
        </>
      ),
    },
    {
      content: (
        <>
          <span className={kw}>private string</span> <span className={id}>engine</span>{" "}
          <span className={punc}>=</span> <span className={str}>"Unity"</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    {
      content: (
        <>
          <span className={kw}>private string</span> <span className={id}>language</span>{" "}
          <span className={punc}>=</span> <span className={str}>"C#"</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    {
      content: (
        <>
          <span className={kw}>private string</span> <span className={id}>tools</span>{" "}
          <span className={punc}>=</span> <span className={str}>"Visual Studio"</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    {
      content: (
        <>
          <span className={kw}>private string</span> <span className={id}>genre</span>{" "}
          <span className={punc}>=</span> <span className={str}>"PvP Co-op"</span>
          <span className={punc}>;</span>
        </>
      ),
      indent: 1,
    },
    { content: <span className={brace}>{"}"}</span> },
  ],
};

export function resolveTechLogo(logo: string) {
  if (logo === "fabric") return loaderIcons.fabric;
  if (logo === "forge") return loaderIcons.forge;
  return logo;
}
