import { useEffect, useState } from "react";
import { PixelChevronRight, PixelClose } from "@/components/common/PixelIcon";
import { useLanguage } from "@/lib/i18n";

export function PhotoLightbox({
  photos,
  altPrefix,
  index,
  onClose,
}: {
  photos: string[];
  altPrefix: string;
  index: number;
  onClose: () => void;
}) {
  const [lightbox, setLightbox] = useState<number | null>(index);
  const { t } = useLanguage();
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [photoDirection, setPhotoDirection] = useState<"next" | "prev">("next");
  const total = photos.length;

  const closeLightbox = () => {
    setLightboxVisible(false);
    setTimeout(() => {
      setLightbox(null);
      onClose();
    }, 200);
  };

  const showPrev = () => {
    setPhotoDirection("prev");
    setLightbox((idx) => (idx === null ? null : (idx - 1 + total) % total));
  };
  const showNext = () => {
    setPhotoDirection("next");
    setLightbox((idx) => (idx === null ? null : (idx + 1) % total));
  };

  const isOpen = lightbox !== null;

  // Mount animation + body scroll lock, mirroring the project modals.
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      requestAnimationFrame(() => requestAnimationFrame(() => setLightboxVisible(true)));
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  if (lightbox === null) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-6"
      style={{
        opacity: lightboxVisible ? 1 : 0,
        transition: "opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onClick={closeLightbox}
    >
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            showPrev();
          }}
          aria-label={t("wife.lightbox.prev")}
          className="pixel-btn pixel-btn-ghost absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 p-0 sm:left-6 sm:h-12 sm:w-12"
        >
          <PixelChevronRight size={16} className="rotate-180 sm:hidden" />
          <PixelChevronRight size={18} className="hidden sm:block" />
        </button>
      )}

      <div
        className="pixel-panel relative w-full max-w-xl p-2.5 sm:p-3"
        style={{
          opacity: lightboxVisible ? 1 : 0,
          transform: lightboxVisible ? "scale(1) translateY(0)" : "scale(0.92) translateY(16px)",
          transition:
            "opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden">
          <img
            key={lightbox}
            src={photos[lightbox]}
            alt={`${altPrefix} ${lightbox + 1}`}
            className={`block max-h-[70vh] w-full object-contain sm:max-h-[75vh] ${
              photoDirection === "next" ? "anim-photo-next" : "anim-photo-prev"
            }`}
          />
        </div>
        <button
          type="button"
          onClick={closeLightbox}
          aria-label={t("wife.lightbox.close")}
          className="pixel-btn pixel-btn-ghost absolute -right-3 -top-3 h-9 w-9 p-0 sm:-right-4 sm:-top-4 sm:h-11 sm:w-11"
        >
          <PixelClose size={16} />
        </button>
        {total > 1 && (
          <span
            className="pixel-label absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background px-3 py-1 text-muted-foreground"
            style={{ fontSize: 9 }}
          >
            {lightbox + 1} / {total}
          </span>
        )}
      </div>

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            showNext();
          }}
          aria-label={t("wife.lightbox.next")}
          className="pixel-btn pixel-btn-ghost absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 p-0 sm:right-6 sm:h-12 sm:w-12"
        >
          <PixelChevronRight size={16} className="sm:hidden" />
          <PixelChevronRight size={18} className="hidden sm:block" />
        </button>
      )}
    </div>
  );
}
