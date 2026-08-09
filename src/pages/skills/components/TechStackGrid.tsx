import { techStackLogos } from "@/data/skills";
import { loaderIcons } from "@/data/image";

function resolveLogo(src: string) {
  if (src === "fabric") return loaderIcons.fabric;
  if (src === "forge") return loaderIcons.forge;
  return src;
}

export default function TechStackGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
      {techStackLogos.map((logo, i) => (
        <div
          key={logo.name}
          className="group pixel-inset anim-in relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16"
          style={{ ["--delay" as string]: `${i * 30}ms` }}
        >
          <img
            src={resolveLogo(logo.src)}
            alt={logo.name}
            className="h-8 w-8 object-contain sm:h-9 sm:w-9"
          />
          <span
            className="pixel-label pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary px-1.5 py-1 text-primary-foreground opacity-0 transition-opacity duration-100 group-hover:opacity-100"
            style={{ fontSize: 7 }}
          >
            {logo.name}
          </span>
        </div>
      ))}
    </div>
  );
}
