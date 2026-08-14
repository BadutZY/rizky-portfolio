import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader, PageShell } from "@/components/layout/PageShell";
import { PixelArrowRight, PixelCpu } from "@/components/common/PixelIcon";
import { equipment } from "@/data/equipment";
import { equipmentImages, rizkyImages } from "@/data/image";
import { useLanguage } from "@/lib/i18n";

const groups = ["all", "core", "storage", "power", "peripheral"] as const;

// Jumlahkan seluruh harga komponen (Rp & USD) langsung dari data equipment,
// jadi otomatis ikut update kalau data equipment berubah.
function sumPrice(values: (string | undefined)[]): number {
  return values.reduce((total, raw) => {
    if (!raw) return total;
    const digits = raw.replace(/[^0-9]/g, "");
    return total + (digits ? parseInt(digits, 10) : 0);
  }, 0);
}

const totalPriceRp = sumPrice(equipment.map((e) => e.priceRp));
const totalPriceUsd = sumPrice(equipment.map((e) => e.priceUsd));
const totalPriceRpDisplay = `Rp ${totalPriceRp.toLocaleString("id-ID")}`;

export default function EquipmentPage() {
  const { t } = useLanguage();
  const [group, setGroup] = useState<(typeof groups)[number]>("all");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const list = equipment.filter((e) => group === "all" || e.group === group);

  return (
    <PageShell>
      <PageHeader
        kicker={t("equipment.kicker")}
        title={t("equipment.title")}
        description={t("equipment.description")}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
        <div className="pixel-panel anim-pop mb-14 grid gap-0 overflow-hidden md:grid-cols-[1fr_1.3fr]">
          <img
            src={rizkyImages.setup}
            alt={t("equipment.photoAlt")}
            loading="lazy"
            className="block h-full w-full object-cover"
          />
          <div className="p-7 sm:p-10">
            <span className="pixel-tag pixel-tag-secondary inline-block">
              {t("equipment.deskSetup")}
            </span>
            <h2
              className="pixel-title mt-5 text-foreground"
              style={{ fontSize: "clamp(15px, 3.5vw, 22px)" }}
            >
              {t("equipment.heading")}
            </h2>
            <p className="body-text mt-4 text-muted-foreground">{t("equipment.description2")}</p>

            <div className="pixel-inset mt-6 flex flex-wrap items-center justify-between gap-3 p-4">
              <span className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
                {t("equipment.totalPrice")}
              </span>
              <span className="pixel-label text-foreground" style={{ fontSize: 15 }}>
                {totalPriceRpDisplay}{" "}
                <span className="text-muted-foreground" style={{ fontSize: 10 }}>
                  (${totalPriceUsd})
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={`pixel-tag ${g === group ? "pixel-tag-secondary" : ""}`}
              style={{ cursor: "pointer" }}
              aria-pressed={g === group}
            >
              {t(`equipment.groups.${g}`)}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => {
            const open = openKey === item.key;
            const image = equipmentImages[item.key];
            return (
              <article
                key={item.key}
                className="pixel-card anim-in flex flex-col overflow-hidden"
                style={{ ["--delay" as string]: `${i * 60}ms` }}
              >
                {image && (
                  <div className="flex h-64 items-center justify-center border-b-4 border-border bg-muted sm:h-72">
                    <img
                      src={image}
                      alt={item.value}
                      loading="lazy"
                      className="block h-full w-full object-contain p-5"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <PixelCpu size={22} className="text-secondary" />
                    <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                      {item.priceRp ?? ""} {item.priceUsd ? `(${item.priceUsd})` : ""}
                    </span>
                  </div>
                  <h3 className="pixel-label mt-4 text-foreground" style={{ fontSize: 11 }}>
                    {item.label}
                  </h3>
                  <p className="body-text mt-2 text-foreground">{item.value}</p>
                  <p className="pixel-label mt-2 text-muted-foreground" style={{ fontSize: 8 }}>
                    {item.detail}
                  </p>

                  <div className="pixel-meter mt-4">
                    <i style={{ width: `${item.perf}%`, animationDelay: `${i * 40}ms` }} />
                  </div>

                  <div className="pixel-collapse mt-4" data-open={open}>
                    <ul className="space-y-2">
                      {item.specLines.map((line) => (
                        <li key={line} className="body-text text-muted-foreground">
                          &#9632; {line}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setOpenKey(open ? null : item.key)}
                      className={`pixel-btn ${open ? "pixel-btn-ghost" : "pixel-btn-alt"}`}
                      style={{ width: "100%" }}
                    >
                      {open ? t("equipment.hideDetail") : t("equipment.viewDetail")}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12">
          <Link to="/project" className="pixel-btn pixel-btn-ghost">
            {t("equipment.viewProject")} <PixelArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
