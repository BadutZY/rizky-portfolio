import type { Dictionary } from "./en";

const id: Dictionary = {
  common: {
    close: "Tutup",
    viewDetail: "Lihat Detail",
    hideDetail: "Tutup Detail",
    openChannel: "Buka Channel",
    subscribe: "Subscribe",
    openNewTab: "Buka di tab baru",
    openSite: "Buka",
    retry: "Coba Lagi",
    loading: "memuat",
  },

  nav: {
    home: "Beranda",
    about: "Tentang",
    skill: "Skill",
    project: "Proyek",
    equipment: "Perangkat",
    wife: "Istri",
    contact: "Kontak",
    homeAria: "Beranda",
    mainNavAria: "Navigasi utama",
    hideNav: "Sembunyikan navigasi",
    showNav: "Tampilkan navigasi",
  },

  theme: {
    enableLight: "Aktifkan mode terang",
    enableDark: "Aktifkan mode gelap",
  },

  language: {
    switchTo: "Ganti ke Bahasa Inggris",
    current: "ID",
  },

  footer: {
    tagline: "Rizky Maulana Putra, seorang programmer pemula. Membuat website, mod, dan game.",
    copyright: "\u00A9 {{year}} Rizky (BadutZY) - hak cipta dilindungi",
    builtWith: "dibuat dengan",
    forKimmy: "Untuk Istriku",
  },

  loading: {
    subtitle: "portfolio \u00B7 tekan mulai",
    loading: "memuat",
  },

  notFound: {
    title: "404",
    subtitle: "Game over \u2014 halaman tidak ditemukan",
    description: "Halaman yang kamu cari tidak ada atau sudah dipindahkan.",
    continue: "Lanjutkan",
  },

  error: {
    title: "Terjadi kesalahan",
    description: "Coba muat ulang halaman atau kembali ke beranda.",
    retry: "Coba Lagi",
    home: "Beranda",
  },

  profile: {
    status: "Terus Belajar",
    age: "17 Tahun",
    education: "SMK (Sekolah Menengah Kejuruan)",
    major: "RPL (Rekayasa Perangkat Lunak)",
    birthday: "6 Maret 2009",
    aboutText:
      "Saya seorang programmer pemula yang sedang belajar bahasa pemrograman. Saya berusaha membuat website, game, dan mod yang menarik sekaligus fungsional. Setiap project adalah kesempatan baru untuk belajar dan berkembang.",
    tagline:
      "Programmer pemula yang baru memulai perjalanan coding. Saya sudah membuat website, mod, dan merilis game. Setiap project adalah kesempatan baru untuk belajar dan berkembang.",
    stats: {
      projects: "Project",
      modsReleased: "Mod Dirilis",
      gamesShipped: "Game Dirilis",
      techStack: "Tech Stack",
    },
  },

  home: {
    hero: {
      viewProject: "Lihat Project",
      aboutMe: "Tentang Saya",
      photoAlt: "Foto {{name}}",
      level: "lvl 01",
    },
    about: {
      description: "Ringkasan singkat tentang siapa saya dan cara saya bekerja.",
      viewMore: "Selengkapnya",
      values: {
        keepLearning: {
          title: "Keep Learning",
          desc: "Setiap project, sekecil apapun, adalah kesempatan baru untuk belajar dan berkembang.",
        },
        randomQuotes: {
          title: "Random Quotes",
          desc: "\u201CDon't be afraid to fail. Be afraid not to try.\u201D",
        },
        shipIt: {
          title: "Ship It",
          desc: "Website, mod, atau game lebih baik dirilis dan dipakai daripada disimpan tanpa akhir.",
        },
      },
    },
    skill: {
      description: "Tiga bidang yang sedang saya dalami sehari-hari.",
      viewAll: "Semua Skill",
    },
    project: {
      description: "Beberapa project website, mod, dan game. Lihat lebih lanjut.",
      viewAll: "Lihat Semua Project",
      items: {
        game: {
          summary: "Game yang saya buat.",
        },
        mods: {
          summary: "Beberapa Minecraft mod yang saya buat.",
        },
        website: {
          summary: "Beberapa website yang saya buat.",
        },
      },
    },
  },

  about: {
    kicker: "01 / about",
    title: "TENTANG SAYA",
    description:
      "Siswa SMK jurusan RPL (Rekayasa Perangkat Lunak) di Bogor, Indonesia yang jatuh cinta pada website, mod Minecraft, dan game buatan sendiri.",
    photoAlt: "Foto {{name}}",
    greeting: "Halo, saya {{alias}} A.K.A {{name}}",
    paragraphEducation:
      "Saat ini saya sedang menempuh pendidikan vokasi dengan fokus pada kesiapan industri dan keterampilan praktis di jurusan {{major}}. Saya belajar pengembangan web, dasar-dasar bahasa pemrograman, dan teknologi web.",
    paragraphHobby:
      "Di luar coding, saya suka bermain dan memodifikasi Minecraft, serta membangun game PvP co-op sederhana bersama tim kecil, Equinox Interactive.",
    quoteLabel: "Quote",
    facts: {
      name: "Nama",
      age: "Usia",
      education: "Pendidikan",
      major: "Jurusan",
      location: "Lokasi",
      birthday: "Ulang Tahun",
    },
    playlists: {
      title: "PLAYLIST SAYA",
      description:
        "Lagu-lagu yang selalu saya putar ulang ketika sedang coding, langsung dari YouTube Music dan Spotify.",
    },
  },

  skill: {
    kicker: "02 / skill",
    title: "SKILL & TOOLS",
    description:
      "Tiga bidang utama yang saya pelajari: membangun website, memodifikasi Minecraft, dan membuat game PvP co-op sederhana.",
    sections: {
      mySkills: {
        title: "SKILL SAYA",
        description: "Berikut yang sedang saya pelajari dan kerjakan sejauh ini.",
      },
      techStack: {
        title: "TECH STACK",
        description: "Teknologi yang pernah saya gunakan.",
      },
      githubActivity: {
        title: "AKTIVITAS GITHUB",
        description: "Data langsung dari profil GitHub saya.",
      },
    },
    panel: {
      proficiency: "Kemahiran",
      techStack: "Tech Stack",
    },
    categories: {
      "web-dev": {
        title: "Web Developer",
        description:
          "Membuat website yang dinamis dan interaktif dengan HTML, CSS, dan JavaScript.",
      },
      "mc-modding": {
        title: "Minecraft Modding",
        description:
          "Modifikasi ukuran stack item, override block anti-hancur, crafting item yang tidak bisa dibuat, dll dengan Java.",
      },
      "game-dev": {
        title: "Game Developer",
        description: "Membuat game PvP Co-op sederhana dengan Unity dan C#.",
      },
    },
    tech: {
      HTML: "HyperText Markup Language (HTML) adalah bahasa standar untuk menyusun struktur dan konten halaman web.",
      CSS: "Cascading Style Sheets (CSS) dipakai untuk mengatur tampilan dan layout halaman web.",
      JavaScript:
        "JavaScript (JS) adalah bahasa pemrograman serbaguna untuk menambahkan interaktivitas pada website.",
      React:
        "React adalah library JavaScript populer dari Meta untuk membangun UI berbasis komponen.",
      Tailwind:
        "Tailwind CSS adalah framework CSS utility-first untuk membangun desain custom dengan cepat.",
      Java: "Java adalah bahasa pemrograman berorientasi objek yang banyak dipakai untuk modding Minecraft.",
      Fabric:
        "Fabric adalah toolchain modding Minecraft yang ringan, dikenal cepat update dan performanya bagus.",
      Forge:
        "Forge adalah API modding Minecraft yang sudah mapan dengan komunitas besar dan dukungan mod luas.",
      Unity: "Unity adalah game engine cross-platform yang kuat untuk membuat game 2D maupun 3D.",
      "C#": "C# adalah bahasa modern berorientasi objek dari Microsoft, umum dipakai bersama Unity.",
    },
    github: {
      loadingChart: "memuat grafik kontribusi",
      chartError: "gagal memuat grafik kontribusi",
      loadingData: "memuat data dari github.com",
      statsError: "Gagal memuat statistik GitHub",
      genericError: "Terjadi kesalahan.",
      rateLimitNote: "Batas GitHub API: 60 request/jam",
      tryAgain: "Coba Lagi",
      refreshAria: "Refresh data GitHub",
      profile: "Profil",
      since: "Sejak {{year}}",
      live: "Live",
      contributionActivity: "Aktivitas Kontribusi",
      viewOnGithub: "Lihat di GitHub",
      repos: "Repo",
      stars: "Bintang",
      forks: "Fork",
      followers: "Pengikut",
      activeRepos: "Repo Aktif",
      topLanguage: "Bahasa Teratas",
      publicRepos: "Repo Publik",
      starredRepositories: "Repositori Berbintang",
      viewAll: "Lihat semua",
      languageBreakdown: "Rincian Bahasa",
      noLanguageData: "Belum ada data bahasa.",
      updated: "Diperbarui {{time}}",
    },
  },

  project: {
    kicker: "03 / project",
    title: "SEMUA PROJECT",
    description:
      "Karya yang pernah saya bangun, dari website fan-made, mod Minecraft (live dari Modrinth), sampai game PvP co-op bersama tim. Klik satu kartu untuk melihat detailnya.",
    filterLabel: "SEMUA PROJECT",
    categories: {
      all: "Semua Project",
      Website: "Website",
      Mod: "Mod",
      Game: "Game",
    },
    sections: {
      websites: "WEBSITE",
      contributionWebsites: "WEBSITE KONTRIBUSI",
      mods: "MOD",
      games: "GAME",
      contributionGames: "GAME KONTRIBUSI",
    },
    collabCount: "{{count}} kolaborasi",
    gameCount: "{{count}} game",
    syncingModrinth: "Menyinkronkan dari Modrinth",
    syncFailed: "Gagal sinkron \u2014 coba lagi",
    loadingMods: "memuat mod dari modrinth",
    livePreview: {
      title: "LIVE PREVIEW",
      description: "Browse langsung website yang sudah saya buat.",
    },
    getToKnowMe: "Kenali Saya Dulu",
    modal: {
      close: "Tutup",
      contribution: "Kontribusi",
      contributor: "Kontributor",
      viewProject: "Lihat Project",
      viewOn: "Lihat di {{site}}",
      description: "Deskripsi",
      download: "Download",
      allVersions: "Semua Versi",
      supportedVersions: "Versi yang Didukung",
      techStack: "Tech Stack",
      downloads: "downloads",
      followers: "followers",
      updated: "Diperbarui {{time}}",
      filter: "Filter",
      reset: "Reset {{label}}",
      noVersionsMatch: "Tidak ada versi yang cocok dengan filter.",
      noVersionsYet: "Belum ada versi yang dirilis.",
      loadingVersions: "memuat versi dari modrinth",
      versionsError: "gagal memuat versi",
      noFilesYet: "Belum ada file untuk mod ini \u2014 lihat repositorinya di GitHub.",
      developerTeam: "Developer Team",
      teamSite: "Situs Tim",
      role: "Peran",
      teamMembers: "anggota tim",
      teamMembersLabel: "Anggota Tim",
      membersSuffix: "anggota",
      visitWebsite: "Kunjungi Website",
      engine: "Engine",
      version: "Versi",
      platform: "Platform",
      fileSize: "Ukuran File",
      language: "Bahasa",
      about: "Tentang",
      minimumRequirements: "Spesifikasi Minimum",
      features: "Fitur",
    },
    modrinth: {
      loading: "memuat data dari modrinth.com",
      error: "gagal memuat data modrinth",
      empty: "belum ada mod yang terdaftar di modrinth",
      openProfile: "Buka profil Modrinth",
      downloads: "downloads",
      updated: "update {{time}}",
    },
    livePreviewWidget: {
      prev: "Sebelumnya",
      next: "Berikutnya",
      refresh: "Refresh",
      openNewTab: "Buka tab baru",
      fullscreen: "Fullscreen",
      loading: "memuat preview",
      closeFullscreen: "Tutup fullscreen",
      openNewTabLong: "Buka tab baru",
      open: "Buka",
      mobileOnlyNote: "Tampilan tablet & desktop hanya bisa dipilih di layar yang lebih lebar",
      viewport: {
        desktop: "Desktop",
        tablet: "Tablet",
        mobile: "Mobile",
      },
    },
  },

  equipment: {
    kicker: "04 / equipment",
    title: "SETUP & EQUIPMENT",
    description: "Rig yang dipakai sehari-hari untuk coding, modding, dan development game.",
    groups: {
      all: "Semua",
      core: "Inti",
      storage: "Storage",
      power: "Daya",
      peripheral: "Peripheral",
    },
    deskSetup: "Desk Setup",
    heading: "RIG BUDGET, HASIL MAKSIMAL",
    photoAlt: "Foto setup meja BadutZY",
    description2:
      "Sebagian besar hardware ini second-hand dengan harga terjangkau, tapi tetap cukup untuk ngoding, modding Minecraft, sampai development game di Unity.",
    totalPrice: "Total Harga Semua Komponen",
    hideDetail: "Tutup Detail",
    viewDetail: "Lihat Detail",
    viewProject: "Lihat Project",
  },

  wife: {
    kicker: "05 / wife",
    title: "ISTRI",
    description: "{{name}} ({{alias}}) adalah Istri Rizky.",
    photoAlt: "Foto {{name}}",
    paragraph:
      "{{name}} dikenal dengan nama panggung {{alias}}, member JKT48. Bagian spesial dari perjalanan hidup {{who}}.",
    bio: {
      name: "Nama",
      birthday: "Ulang Tahun",
      hometown: "Kota Asal",
      bloodType: "Golongan Darah",
      zodiac: "Zodiak",
      height: "Tinggi",
      status: "Status",
    },
    replaySection: {
      tag: "Replay YouTube",
      title: "REPLAY TERBARU",
    },
    gallerySection: {
      tag: "GALERI",
      title: "FOTO ISTRI",
      photoAlt: "Foto {{alias}} {{n}}",
    },
    aboutMe: "Tentang Saya",
    contactMe: "Hubungi Saya",
    replayCard: {
      loading: "memuat replay {{label}}",
      apiKeyMissing: "YouTube API key belum diset",
      noReplayYet: "belum ada replay {{label}}",
      playAria: "Putar {{title}}",
    },
    liveStatus: {
      checking: "checking",
      live: "LIVE",
      offline: "offline",
      connecting: "menyambungkan stream",
      unplayable: "stream tidak bisa diputar di sini \u2014 buka langsung di platform",
      mute: "mute",
      unmute: "unmute",
      checkingStatus: "mengecek status live\u2026",
      notLive: "sedang tidak live",
      openOn: "Buka di {{label}}",
    },
    lightbox: {
      prev: "Foto sebelumnya",
      next: "Foto berikutnya",
      close: "Tutup",
    },
  },

  contact: {
    kicker: "06 / contact",
    title: "HUBUNGI SAYA",
    description: "Mari berkenalan melalui social media saya",
    sections: {
      youtubeChannel: "YOUTUBE CHANNEL",
      socialMedia: "SOSIAL MEDIA",
    },
    channels: {
      video: "Video Terbaru",
      short: "Short Terbaru",
      stream: "Siaran",
    },
    youtubeCard: {
      loadingStats: "memuat statistik channel",
      apiKeyMissing: "YouTube API key belum diset",
      statsUnavailable: "statistik channel tidak tersedia saat ini",
      openChannel: "Buka Channel",
      subscribers: "Subscriber",
      videos: "Video",
      totalViews: "Total Tayangan",
      subscribe: "Subscribe",
    },
  },
};

export default id;
