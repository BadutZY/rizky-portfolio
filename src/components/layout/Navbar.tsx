import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Code2,
  FolderCode,
  Cpu,
  Heart,
  Mail,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

const links = [
  { to: "/", label: "nav.home", icon: Home },
  { to: "/about", label: "nav.about", icon: User },
  { to: "/skill", label: "nav.skill", icon: Code2 },
  { to: "/project", label: "nav.project", icon: FolderCode },
  { to: "/equipment", label: "nav.equipment", icon: Cpu },
  { to: "/wife", label: "nav.wife", icon: Heart },
  { to: "/contact", label: "nav.contact", icon: Mail },
] as const;

// nav links yang ikut collapse/expand
const ITEM_COUNT = links.length;
const CENTER = (ITEM_COUNT - 1) / 2;

export default function Navbar() {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  const { t } = useLanguage();

  return (
    <>
      <Link to="/" className="dock-brand" aria-label={t("nav.homeAria")}>
        <img
          src="/icon.png"
          alt={t("nav.homeAria")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Link>

      <nav className="dock-pill" data-open={open} aria-label={t("nav.mainNavAria")}>
        {links.map((l, i) => (
          <Link
            key={l.to}
            to={l.to}
            className="dock-item"
            data-active={pathname === l.to}
            style={{ ["--dock-delay" as string]: `${Math.abs(i - CENTER) * 45}ms` }}
          >
            <l.icon size={24} strokeWidth={2} />
            <span className="dock-tooltip">{t(l.label)}</span>
          </Link>
        ))}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("nav.hideNav") : t("nav.showNav")}
          aria-expanded={open}
          className="dock-toggle"
        >
          {open ? (
            <ChevronDown size={24} strokeWidth={2} />
          ) : (
            <ChevronRight size={24} strokeWidth={2} />
          )}
        </button>
      </nav>
    </>
  );
}