import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout, { NotFoundPage } from "@/RootLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import ScrollToTop from "@/components/common/ScrollToTop";

import HomePage from "@/pages/home/HomePage";
import AboutPage from "@/pages/about/AboutPage";
import SkillPage from "@/pages/skills/SkillPage";
import ProjectPage from "@/pages/project/ProjectPage";
import EquipmentPage from "@/pages/equipment/EquipmentPage";
import WifePage from "@/pages/wife/WifePage";
import ContactPage from "@/pages/contact/ContactPage";

const queryClient = new QueryClient();

function WifeErinePage() {
  return <WifePage person="erine" />;
}
function WifeKimmyPage() {
  return <WifePage person="kimmy" />;
}
function WifeFritzyPage() {
  return <WifePage person="fritzy" />;
}

function Page({
  title,
  description,
  ogTitle,
  ogDescription,
  Component,
}: {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  Component: React.ComponentType;
}) {
  usePageMeta({ title, description, ogTitle, ogDescription });
  return <Component />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<RootLayout />}>
            <Route
              index
              element={
                <Page
                  title="Rizky (BadutZY) - Official Website"
                  description="Official Website Portfolio Rizky Maulana Putra (BadutZY), beginner programmer. Ringkasan profil, skill, dan project pilihan: website, mod, dan game."
                  ogTitle="BadutZY - Official Website"
                  ogDescription="Beginner programmer. Website, Minecraft mod, dan game PvP co-op."
                  Component={HomePage}
                />
              }
            />
            <Route
              path="about"
              element={
                <Page
                  title="About - Rizky (BadutZY)"
                  description="Kenali Rizky Maulana Putra (BadutZY) lebih dekat: siswa SMK RPL di Bogor, Indonesia, beserta playlist lagu favoritnya di YouTube Music dan Spotify."
                  ogTitle="About BadutZY"
                  ogDescription="Latar belakang BadutZY dan playlist lagu favoritnya."
                  Component={AboutPage}
                />
              }
            />
            <Route
              path="skill"
              element={
                <Page
                  title="Skill - Rizky (BadutZY)"
                  description="Skill Rizky Maulana Putra (BadutZY): Web Developer, Minecraft Modding dengan Java/Fabric/Forge, dan Game Developer dengan Unity & C#."
                  ogTitle="Skill BadutZY"
                  ogDescription="Web Developer, Minecraft Modding, dan Game Developer."
                  Component={SkillPage}
                />
              }
            />
            <Route
              path="project"
              element={
                <Page
                  title="Project - Rizky (BadutZY)"
                  description="Kumpulan project Rizky Maulana Putra (BadutZY): website portfolio & fan-made, mod Minecraft live dari Modrinth, dan game PvP co-op Box Siege."
                  ogTitle="Project BadutZY"
                  ogDescription="Kumpulan website, mod, dan game yang pernah saya bangun."
                  Component={ProjectPage}
                />
              }
            />
            <Route
              path="equipment"
              element={
                <Page
                  title="Equipment - Rizky (BadutZY)"
                  description="Spesifikasi lengkap setup PC dan peripheral yang dipakai Rizky Maulana Putra (BadutZY) untuk coding, modding, dan development game."
                  ogTitle="Equipment BadutZY"
                  ogDescription="Spesifikasi CPU, GPU, RAM, storage, dan peripheral setup."
                  Component={EquipmentPage}
                />
              }
            />
            <Route
              path="wife"
              element={
                <Page
                  title="Wife (K) - Rizky (BadutZY)"
                  description="Kenali Kimmy."
                  ogTitle="Kimmy - BadutZY's Wife"
                  ogDescription="Profil singkat dan galeri foto Kimmy."
                  Component={WifeKimmyPage}
                />
              }
            />
            <Route
              path="wife/erine"
              element={
                <Page
                  title="Wife (E) - Rizky (BadutZY)"
                  description="Kenali Erine."
                  ogTitle="Erine"
                  ogDescription="Profil singkat dan galeri foto Erine."
                  Component={WifeErinePage}
                />
              }
            />
            <Route
              path="wife/fritzy"
              element={
                <Page
                  title="Wife (F) - Rizky (BadutZY)"
                  description="Kenali Fritzy."
                  ogTitle="Fritzy"
                  ogDescription="Profil singkat dan galeri foto Fritzy."
                  Component={WifeFritzyPage}
                />
              }
            />
            <Route
              path="contact"
              element={
                <Page
                  title="Contact - Rizky (BadutZY)"
                  description="Hubungi Rizky Maulana Putra (BadutZY) untuk kolaborasi project, atau ikuti channel YouTube dan sosial medianya."
                  ogTitle="Contact BadutZY"
                  ogDescription="Kolaborasi, YouTube, dan sosial media BadutZY."
                  Component={ContactPage}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}