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
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { wifeNavOrder, wifeProfiles, wifeRoutes } from "@/data/wife";

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
  // Menu E/K/F "dipin" terbuka setelah ikon hati diklik (bukan hover),
  // sampai salah satu inisial dipilih atau user klik di luar menu.
  const [wifeMenuPinned, setWifeMenuPinned] = useState(false);
  const wifeItemRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { t } = useLanguage();

  // Klik di luar item "Wife" -> tutup menu yang lagi dipin.
  useEffect(() => {
    if (!wifeMenuPinned) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (wifeItemRef.current && !wifeItemRef.current.contains(e.target as Node)) {
        setWifeMenuPinned(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWifeMenuPinned(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [wifeMenuPinned]);

  // Ganti halaman (mis. abis pilih E/K/F) -> pin ikut tertutup.
  useEffect(() => {
    setWifeMenuPinned(false);
  }, [pathname]);

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
        {links.map((l, i) => {
          const delay = `${Math.abs(i - CENTER) * 45}ms`;

          // Item "Wife": hover ATAU klik ikon hati menampilkan 3 tombol
          // (E, K, F) di atasnya. Klik ikon hati sendiri tidak pindah
          // halaman -- cuma "mengunci" menu itu supaya tetap terbuka
          // (tidak hilang saat mouse dipindah) sampai salah satu
          // inisial dipilih, atau user klik di luar / tekan Escape.
          if (l.to === "/wife") {
            const isWifeSection = pathname === "/wife" || pathname.startsWith("/wife/");

            return (
              <div
                key={l.to}
                ref={wifeItemRef}
                className="dock-item dock-item-wife"
                data-active={isWifeSection}
                style={{ ["--dock-delay" as string]: delay }}
              >
                <div
                  className="dock-wife-flyout"
                  data-pinned={wifeMenuPinned}
                  role="menu"
                  aria-label={`${t(l.label)} menu`}
                >
                  {wifeNavOrder.map((personKey) => {
                    const profile = wifeProfiles[personKey];
                    const to = wifeRoutes[personKey];
                    return (
                      <Link
                        key={personKey}
                        to={to}
                        role="menuitem"
                        className="dock-wife-flyout-btn"
                        data-active={pathname === to}
                        aria-label={profile.alias}
                        onClick={() => setWifeMenuPinned(false)}
                      >
                        {profile.code}
                      </Link>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="dock-item-hit"
                  aria-label={t(l.label)}
                  aria-haspopup="menu"
                  aria-expanded={wifeMenuPinned}
                  onClick={() => setWifeMenuPinned((v) => !v)}
                >
                  <l.icon size={24} strokeWidth={2} />
                  <span className="dock-tooltip">{t(l.label)}</span>
                </button>
              </div>
            );
          }

          return (
            <Link
              key={l.to}
              to={l.to}
              className="dock-item"
              data-active={pathname === l.to}
              style={{ ["--dock-delay" as string]: delay }}
            >
              <l.icon size={24} strokeWidth={2} />
              <span className="dock-tooltip">{t(l.label)}</span>
            </Link>
          );
        })}

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