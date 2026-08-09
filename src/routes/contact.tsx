import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "@/pages/contact/ContactPage";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact BadutZY — Kolaborasi & Sosial Media" },
      {
        name: "description",
        content:
          "Hubungi Rizky Maulana Putra (BadutZY) untuk kolaborasi project, atau ikuti channel YouTube dan sosial medianya.",
      },
      { property: "og:title", content: "Contact BadutZY" },
      { property: "og:description", content: "Kolaborasi, YouTube, dan sosial media BadutZY." },
    ],
  }),
});
