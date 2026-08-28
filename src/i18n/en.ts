// ─────────────────────────────────────────────────────────────────────────
// English translation dictionary — also the structural source of truth.
// `id.ts` is typed against this shape, so TypeScript will flag any missing
// or mistyped key over there.
// ─────────────────────────────────────────────────────────────────────────

const en = {
  common: {
    close: "Close",
    viewDetail: "View Detail",
    hideDetail: "Hide Detail",
    openChannel: "Open Channel",
    subscribe: "Subscribe",
    openNewTab: "Open in new tab",
    openSite: "Open",
    retry: "Retry",
    loading: "loading",
  },

  nav: {
    home: "Home",
    about: "About",
    skill: "Skill",
    project: "Project",
    equipment: "Equipment",
    wife: "Wife",
    contact: "Contact",
    homeAria: "Home",
    mainNavAria: "Main navigation",
    hideNav: "Hide navigation",
    showNav: "Show navigation",
  },

  theme: {
    enableLight: "Enable light mode",
    enableDark: "Enable dark mode",
  },

  language: {
    switchTo: "Switch to Bahasa Indonesia",
    current: "EN",
  },

  footer: {
    tagline: "Rizky Maulana Putra, a beginner programmer. Building websites, mods, and games.",
    copyright: "\u00A9 {{year}} Rizky (BadutZY) - all rights reserved",
    builtWith: "built with",
    forKimmy: "for My Wife",
  },

  loading: {
    subtitle: "portfolio \u00B7 press start",
    loading: "loading",
  },

  notFound: {
    title: "404",
    subtitle: "Game over \u2014 page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    continue: "Continue",
  },

  error: {
    title: "Something broke",
    description: "Try reloading the page or go back home.",
    retry: "Retry",
    home: "Home",
  },

  profile: {
    status: "Keep Learning",
    age: "17 Years",
    education: "SMK (Vocational High School)",
    major: "RPL (Rekayasa Perangkat Lunak / Software Engineering)",
    birthday: "March 6, 2009",
    aboutText:
      "I'm a beginner programmer learning programming languages. I strive to create engaging and functional websites, games, and mods. Every project is a new opportunity to learn and grow.",
    tagline:
      "A beginner programmer just starting out on my coding journey. I've created websites, mods, and released games. Every project is a new opportunity to learn and grow.",
    stats: {
      projects: "Projects",
      modsReleased: "Mods Released",
      gamesShipped: "Games Shipped",
      techStack: "Tech Stack",
    },
  },

  home: {
    hero: {
      viewProject: "View Project",
      aboutMe: "About Me",
      photoAlt: "Photo of {{name}}",
      level: "lvl 01",
    },
    about: {
      description: "A quick summary of who I am and how I work.",
      viewMore: "Learn More",
      values: {
        keepLearning: {
          title: "Keep Learning",
          desc: "Every project, no matter how small, is a new chance to learn and grow.",
        },
        randomQuotes: {
          title: "Random Quotes",
          desc: "\u201CDon't be afraid to fail. Be afraid not to try.\u201D",
        },
        shipIt: {
          title: "Ship It",
          desc: "A website, mod, or game is better shipped and used than kept forever unfinished.",
        },
      },
    },
    skill: {
      description: "Three fields I'm working on every day.",
      viewAll: "All Skills",
    },
    project: {
      description: "A few website, mod, and game projects. Take a look.",
      viewAll: "View All Projects",
      items: {
        game: {
          summary: "A game I made.",
        },
        mods: {
          summary: "A few Minecraft mods I made.",
        },
        website: {
          summary: "A few websites I made.",
        },
      },
    },
  },

  about: {
    kicker: "01 / about",
    title: "ABOUT ME",
    description:
      "A vocational high school student majoring in Software Engineering (RPL) in Bogor, Indonesia, who fell in love with websites, Minecraft mods, and homemade games.",
    photoAlt: "Photo of {{name}}",
    greeting: "Hi, I'm {{alias}} A.K.A {{name}}",
    paragraphEducation:
      "I'm currently pursuing vocational education with a focus on industry readiness and practical skills in the {{major}} program. I'm learning web development, programming language fundamentals, and web technologies.",
    paragraphHobby:
      "Outside of coding, I enjoy playing and modding Minecraft, and building simple PvP co-op games together with a small team, Equinox Interactive.",
    quoteLabel: "Quote",
    facts: {
      name: "Name",
      age: "Age",
      education: "Education",
      major: "Major",
      location: "Location",
      birthday: "Birthday",
    },
    playlists: {
      title: "MY PLAYLISTS",
      description: "Songs I keep replaying while coding, straight from YouTube Music and Spotify.",
    },
  },

  skill: {
    kicker: "02 / skill",
    title: "SKILL & TOOLS",
    description:
      "Three main fields I'm learning: building websites, modding Minecraft, and making simple PvP co-op games.",
    sections: {
      mySkills: {
        title: "MY SKILLS",
        description: "Here's what I've been learning and working with so far.",
      },
      techStack: {
        title: "TECH STACK",
        description: "Technologies I've worked with.",
      },
      githubActivity: {
        title: "GITHUB ACTIVITY",
        description: "Live data from my GitHub profile.",
      },
    },
    panel: {
      proficiency: "Proficiency",
      techStack: "Tech Stack",
    },
    categories: {
      "web-dev": {
        title: "Web Developer",
        description: "Create dynamic and interactive websites with HTML, CSS, and JavaScript.",
      },
      "mc-modding": {
        title: "Minecraft Modding",
        description:
          "Item stack size modification, unbreakable block override, uncraftable item crafting, etc with Java.",
      },
      "game-dev": {
        title: "Game Developer",
        description: "Create simple PvP Co-op games with Unity and C#.",
      },
    },
    tech: {
      HTML: "HyperText Markup Language (HTML) is the standard language for structuring the content of web pages.",
      CSS: "Cascading Style Sheets (CSS) is used to style and lay out web pages.",
      JavaScript:
        "JavaScript (JS) is a versatile programming language for adding interactivity to websites.",
      React: "React is Meta's popular JavaScript library for building component-based UIs.",
      Tailwind:
        "Tailwind CSS is a utility-first CSS framework for building custom designs quickly.",
      Java: "Java is an object-oriented programming language widely used for Minecraft modding.",
      Fabric:
        "Fabric is a lightweight Minecraft modding toolchain, known for fast updates and good performance.",
      Forge:
        "Forge is a well-established Minecraft modding API with a large community and broad mod support.",
      Unity: "Unity is a powerful cross-platform game engine for building 2D and 3D games.",
      "C#": "C# is Microsoft's modern object-oriented language, commonly used together with Unity.",
    },
    github: {
      loadingChart: "loading contribution chart",
      chartError: "failed to load contribution chart",
      loadingData: "loading data from github.com",
      statsError: "Failed to load GitHub stats",
      genericError: "Something went wrong.",
      rateLimitNote: "GitHub API limit: 60 requests/hour",
      tryAgain: "Try Again",
      refreshAria: "Refresh GitHub data",
      profile: "Profile",
      since: "Since {{year}}",
      live: "Live",
      contributionActivity: "Contribution Activity",
      viewOnGithub: "View on GitHub",
      repos: "Repos",
      stars: "Stars",
      forks: "Forks",
      followers: "Followers",
      activeRepos: "Active Repos",
      topLanguage: "Top Language",
      publicRepos: "Public Repos",
      starredRepositories: "Starred Repositories",
      viewAll: "View all",
      languageBreakdown: "Language Breakdown",
      noLanguageData: "No language data yet.",
      updated: "Updated {{time}}",
    },
  },

  project: {
    kicker: "03 / project",
    title: "ALL PROJECTS",
    description:
      "Work I've built, from fan-made websites and Minecraft mods (live from Modrinth), to a PvP co-op game with a team. Click a card to see the details.",
    filterLabel: "ALL PROJECTS",
    categories: {
      all: "All Projects",
      Website: "Website",
      Mod: "Mod",
      Game: "Game",
    },
    sections: {
      websites: "WEBSITES",
      contributionWebsites: "CONTRIBUTION WEBSITES",
      mods: "MODS",
      games: "GAMES",
      contributionGames: "CONTRIBUTION GAMES",
    },
    collabCount: "{{count}} collab",
    gameCount: "{{count}} game",
    syncingModrinth: "Syncing from Modrinth",
    syncFailed: "Failed to sync \u2014 retry",
    loadingMods: "loading mods from modrinth",
    livePreview: {
      title: "LIVE PREVIEW",
      description: "Browse the websites I've built, live.",
    },
    getToKnowMe: "Get to Know Me First",
    modal: {
      close: "Close",
      contribution: "Contribution",
      contributor: "Contributor",
      viewProject: "View Project",
      viewOn: "View on {{site}}",
      description: "Description",
      download: "Download",
      allVersions: "All Versions",
      supportedVersions: "Supported Versions",
      techStack: "Tech Stack",
      downloads: "downloads",
      followers: "followers",
      updated: "Updated {{time}}",
      filter: "Filter",
      reset: "Reset {{label}}",
      noVersionsMatch: "No versions match the filter.",
      noVersionsYet: "No versions released yet.",
      loadingVersions: "loading versions from modrinth",
      versionsError: "failed to load versions",
      noFilesYet: "No files for this mod yet \u2014 check out the repository on GitHub.",
      developerTeam: "Developer Team",
      teamSite: "Team Site",
      role: "Role",
      teamMembers: "team members",
      teamMembersLabel: "Team Members",
      membersSuffix: "members",
      visitWebsite: "Visit Website",
      engine: "Engine",
      version: "Version",
      platform: "Platform",
      fileSize: "File Size",
      language: "Language",
      about: "About",
      minimumRequirements: "Minimum Requirements",
      features: "Features",
    },
    modrinth: {
      loading: "loading data from modrinth.com",
      error: "failed to load Modrinth data",
      empty: "no mods listed on Modrinth yet",
      openProfile: "Open Modrinth profile",
      downloads: "downloads",
      updated: "update {{time}}",
    },
    livePreviewWidget: {
      prev: "Previous",
      next: "Next",
      refresh: "Refresh",
      openNewTab: "Open in new tab",
      fullscreen: "Fullscreen",
      loading: "loading preview",
      closeFullscreen: "Close fullscreen",
      openNewTabLong: "Open in new tab",
      open: "Open",
      mobileOnlyNote: "Tablet & desktop views can only be selected on a wider screen",
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
    description: "The rig I use every day for coding, modding, and game development.",
    groups: {
      all: "All",
      core: "Core",
      storage: "Storage",
      power: "Power",
      peripheral: "Peripherals",
    },
    deskSetup: "Desk Setup",
    heading: "BUDGET RIG, MAXIMUM RESULTS",
    photoAlt: "Photo of BadutZY's desk setup",
    description2:
      "Most of this hardware is second-hand and affordable, but still enough for coding, modding Minecraft, and even developing games in Unity.",
    totalPrice: "Total Price of All Components",
    hideDetail: "Hide Detail",
    viewDetail: "View Detail",
    viewProject: "View Project",
  },

  wife: {
    kicker: "05 / wife",
    title: "Wifes",
    description: "{{name}} ({{alias}}) is Rizky's Wife.",
    photoAlt: "Photo of {{name}}",
    paragraph:
      "{{name}} is known by her stage name {{alias}}, a JKT48 member. A special part of {{who}}'s life journey.",
    bio: {
      name: "Name",
      birthday: "Birthday",
      hometown: "Hometown",
      bloodType: "Blood Type",
      zodiac: "Zodiac",
      height: "Height",
      status: "Status",
    },
    replaySection: {
      tag: "YouTube Replay",
      title: "LATEST REPLAY",
    },
    gallerySection: {
      tag: "GALLERY",
      title: "WIFES PHOTOS",
      photoAlt: "Photo of {{alias}} {{n}}",
    },
    aboutMe: "About Me",
    contactMe: "Contact Me",
    replayCard: {
      loading: "loading {{label}} replay",
      apiKeyMissing: "YouTube API key not set yet",
      noReplayYet: "no {{label}} replay yet",
      playAria: "Play {{title}}",
    },
    liveStatus: {
      checking: "checking",
      live: "LIVE",
      offline: "offline",
      connecting: "connecting to stream",
      unplayable: "stream can't be played here \u2014 open it directly on the platform",
      mute: "mute",
      unmute: "unmute",
      checkingStatus: "checking live status\u2026",
      notLive: "currently not live",
      openOn: "Open on {{label}}",
    },
    lightbox: {
      prev: "Previous photo",
      next: "Next photo",
      close: "Close",
    },
  },

  contact: {
    kicker: "06 / contact",
    title: "CONTACT ME",
    description: "Let's get to know each other through my social media",
    sections: {
      youtubeChannel: "YOUTUBE CHANNEL",
      socialMedia: "SOCIAL MEDIA",
    },
    channels: {
      video: "Latest Video",
      short: "Latest Short",
      stream: "Streams",
    },
    youtubeCard: {
      loadingStats: "loading channel stats",
      apiKeyMissing: "YouTube API key not set yet",
      statsUnavailable: "channel stats unavailable right now",
      openChannel: "Open Channel",
      subscribers: "Subscribers",
      videos: "Videos",
      totalViews: "Total Views",
      subscribe: "Subscribe",
    },
  },
};

export default en;
export type Dictionary = typeof en;
