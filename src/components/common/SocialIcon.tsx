import { Youtube, Instagram, Github } from "lucide-react";
import { platformLogos } from "@/data/image";

interface IconProps {
  size?: number;
  className?: string;
}

function XIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function TikTokIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function ModrinthIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.252.004a11.78 11.768 0 0 0-8.92 3.73 11 10.999 0 0 0-2.17 3.11 11.37 11.359 0 0 0-1.16 5.169c0 1.42.17 2.5.6 3.77.24.759.77 1.899 1.17 2.529a12.3 12.298 0 0 0 8.85 5.639c.44.05 2.54.07 2.76.02.2-.04.22.1-.26-1.7l-.36-1.37-1.01-.06a8.5 8.489 0 0 1-5.18-1.8 5.34 5.34 0 0 1-1.3-1.26c0-.05.34-.28.74-.5a37.572 37.545 0 0 1 2.88-1.629c.03 0 .5.45 1.06.98l1 .97 2.07-.43 2.06-.43 1.47-1.47c.8-.8 1.48-1.5 1.48-1.52 0-.09-.42-1.63-.46-1.7-.04-.06-.2-.03-1.02.18-.53.13-1.2.3-1.45.4l-.48.15-.53.53-.53.53-.93.1-.93.07-.52-.5a2.7 2.7 0 0 1-.96-1.7l-.13-.6.43-.57c.68-.9.68-.9 1.46-1.1.4-.1.65-.2.83-.33.13-.099.65-.579 1.14-1.069l.9-.9-.7-.7-.7-.7-1.95.54c-1.07.3-1.96.53-1.97.53-.03 0-2.23 2.48-2.63 2.97l-.29.35.28 1.03c.16.56.3 1.16.31 1.34l.03.3-.34.23c-.37.23-2.22 1.3-2.84 1.63-.36.2-.37.2-.44.1-.08-.1-.23-.6-.32-1.03-.18-.86-.17-2.75.02-3.73a8.84 8.839 0 0 1 7.9-6.93c.43-.03.77-.08.78-.1.06-.17.5-2.999.47-3.039-.01-.02-.1-.02-.2-.03Zm3.68.67c-.2 0-.3.1-.37.38-.06.23-.46 2.42-.46 2.52 0 .04.1.11.22.16a8.51 8.499 0 0 1 2.99 2 8.38 8.379 0 0 1 2.16 3.449 6.9 6.9 0 0 1 .4 2.8c0 1.07 0 1.27-.1 1.73a9.37 9.369 0 0 1-1.76 3.769c-.32.4-.98 1.06-1.37 1.38-.38.32-1.54 1.1-1.7 1.14-.1.03-.1.06-.07.26.03.18.64 2.56.7 2.78l.06.06a12.07 12.058 0 0 0 7.27-9.4c.13-.77.13-2.58 0-3.4a11.96 11.948 0 0 0-5.73-8.578c-.7-.42-2.05-1.06-2.25-1.06Z" />
    </svg>
  );
}

function ThreadsIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 192 192"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M141.537 88.988a67.313 67.313 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1-.11 0-.219 0-.328 0-15.001 0-27.484 6.409-35.161 18.056l13.679 9.382c5.73-8.695 14.724-10.548 21.501-10.548.084 0 .167 0 .251.001 8.436.054 14.803 2.505 18.925 7.286 3.002 3.481 5.008 8.297 6.006 14.372-7.494-1.274-15.596-1.667-24.257-1.169-24.412 1.4-40.098 15.586-39.028 35.317.542 10.014 5.512 18.626 13.998 24.243 7.17 4.744 16.399 7.064 25.997 6.53 12.717-.706 22.688-5.463 29.639-14.143 5.288-6.606 8.626-15.161 10.099-25.909 6.045 3.649 10.52 8.452 12.987 14.216 4.184 9.767 4.42 25.828-8.717 38.955-11.505 11.494-25.328 16.464-46.238 16.617-23.176-.171-40.697-7.611-52.075-22.114-10.65-13.573-16.151-33.183-16.351-58.276.2-25.093 5.701-44.702 16.351-58.276 11.378-14.503 28.898-21.943 52.074-22.114 23.343.172 41.174 7.65 53.008 22.23 5.803 7.145 10.18 16.126 13.083 26.577l16.288-4.35c-3.483-12.784-8.914-23.798-16.288-32.847C130.313 12.542 108.354 3.238 82.99 3.05h-.088C57.593 3.239 35.851 12.578 20.649 30.001 6.687 45.995.077 68.144-.14 95.955v.09c.217 27.811 6.827 49.96 20.79 65.955 15.202 17.423 36.944 26.762 61.973 26.951h.088c25.129-.187 46.828-9.564 61.096-27.098 15.85-19.475 15.85-40.865 8.905-56.79-4.999-11.464-14.128-20.635-25.376-25.075Zm-40.376 47.847c-9.582.531-19.541-3.784-20.028-13.03-.36-6.847 4.862-14.492 20.622-15.393 1.809-.103 3.583-.154 5.325-.154 5.735 0 11.104.556 15.978 1.622-1.822 22.782-12.5 26.409-21.897 26.955Z" />
    </svg>
  );
}

function CurseForgeIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.326 9.2145S23.2261 8.4418 24 6.1882h-7.5066V4.4H0l2.0318 2.3576V9.173s5.1267-.2665 7.1098 1.2372c2.7146 2.516-3.053 5.917-3.053 5.917L5.0995 19.6c1.5465-1.4726 4.494-3.3775 9.8983-3.2857-2.0565.65-4.1245 1.6651-5.7344 3.2857h10.9248l-1.0288-3.2726s-7.918-4.6688-.8336-7.1127z" />
    </svg>
  );
}

function ImageIcon({
  src,
  alt,
  size = 18,
  className = "",
}: IconProps & { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`block shrink-0 rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

const ICONS: Record<string, (p: IconProps) => React.ReactNode> = {
  YouTube: (p) => <Youtube size={p.size ?? 18} className={p.className ?? ""} strokeWidth={2} />,
  Instagram: (p) => <Instagram size={p.size ?? 18} className={p.className ?? ""} strokeWidth={2} />,
  GitHub: (p) => <Github size={p.size ?? 18} className={p.className ?? ""} strokeWidth={2} />,
  X: XIcon,
  TikTok: TikTokIcon,
  Threads: ThreadsIcon,
  Modrinth: ModrinthIcon,
  CurseForge: CurseForgeIcon,
  "IDN Live": (p) => <ImageIcon src={platformLogos.idn} alt="IDN Live" {...p} />,
  Showroom: (p) => <ImageIcon src={platformLogos.showroom} alt="Showroom" {...p} />,
};

export default function SocialIcon({
  label,
  size = 18,
  className = "",
}: { label: string } & IconProps) {
  const Icon = ICONS[label];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}
