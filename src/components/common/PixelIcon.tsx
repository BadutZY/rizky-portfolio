type IconProps = { size?: number; className?: string };

const px = (x: number, y: number, w = 1, h = 1, key?: string) => (
  <rect key={key ?? `${x}-${y}`} x={x} y={y} width={w} height={h} fill="currentColor" />
);

function Frame({ size = 16, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const PixelSun = (p: IconProps) => (
  <Frame {...p}>
    {px(6, 6, 4, 4)}
    {px(5, 5, 1, 1)}
    {px(10, 5, 1, 1)}
    {px(5, 10, 1, 1)}
    {px(10, 10, 1, 1)}
    {px(7, 1, 2, 2)}
    {px(7, 13, 2, 2)}
    {px(1, 7, 2, 2)}
    {px(13, 7, 2, 2)}
    {px(3, 3, 1, 1)}
    {px(12, 3, 1, 1)}
    {px(3, 12, 1, 1)}
    {px(12, 12, 1, 1)}
  </Frame>
);

export const PixelMoon = (p: IconProps) => (
  <Frame {...p}>
    {px(6, 2, 5, 1)}
    {px(4, 3, 3, 1)}
    {px(3, 4, 2, 2)}
    {px(2, 6, 2, 4)}
    {px(3, 10, 2, 2)}
    {px(4, 12, 3, 1)}
    {px(6, 13, 5, 1)}
    {px(9, 12, 3, 1)}
    {px(8, 3, 2, 2)}
    {px(11, 6, 2, 2)}
    {px(9, 9, 2, 2)}
  </Frame>
);

export const PixelMenu = (p: IconProps) => (
  <Frame {...p}>
    {px(2, 3, 12, 2)}
    {px(2, 7, 12, 2)}
    {px(2, 11, 12, 2)}
  </Frame>
);

export const PixelClose = (p: IconProps) => (
  <Frame {...p}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => px(3 + i, 3 + i, 1, 1, `a${i}`))}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => px(11 - i, 3 + i, 1, 1, `b${i}`))}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => px(4 + i, 3 + i, 1, 1, `c${i}`))}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => px(10 - i, 3 + i, 1, 1, `d${i}`))}
  </Frame>
);

export const PixelArrowRight = (p: IconProps) => (
  <Frame {...p}>
    {px(2, 7, 9, 2)}
    {px(9, 5, 2, 2)}
    {px(9, 9, 2, 2)}
    {px(11, 6, 2, 4)}
  </Frame>
);

export const PixelArrowDown = (p: IconProps) => (
  <Frame {...p}>
    {px(7, 2, 2, 9)}
    {px(5, 9, 2, 2)}
    {px(9, 9, 2, 2)}
    {px(6, 11, 4, 2)}
  </Frame>
);

export const PixelStar = (p: IconProps) => (
  <Frame {...p}>
    {px(7, 2, 2, 12)}
    {px(2, 7, 12, 2)}
    {px(4, 4, 2, 2)}
    {px(10, 4, 2, 2)}
    {px(4, 10, 2, 2)}
    {px(10, 10, 2, 2)}
  </Frame>
);

export const PixelHeart = (p: IconProps) => (
  <Frame {...p}>
    {px(3, 3, 3, 2)}
    {px(10, 3, 3, 2)}
    {px(2, 5, 12, 3)}
    {px(3, 8, 10, 2)}
    {px(5, 10, 6, 2)}
    {px(7, 12, 2, 2)}
  </Frame>
);

export const PixelCode = (p: IconProps) => (
  <Frame {...p}>
    {px(4, 6, 2, 1)}
    {px(3, 7, 2, 2)}
    {px(4, 9, 2, 1)}
    {px(5, 4, 2, 2)}
    {px(5, 10, 2, 2)}
    {px(10, 6, 2, 1)}
    {px(11, 7, 2, 2)}
    {px(10, 9, 2, 1)}
    {px(9, 4, 2, 2)}
    {px(9, 10, 2, 2)}
  </Frame>
);

export const PixelUser = (p: IconProps) => (
  <Frame {...p}>
    {px(5, 2, 6, 5)}
    {px(4, 3, 1, 3)}
    {px(11, 3, 1, 3)}
    {px(3, 9, 10, 5)}
    {px(2, 11, 1, 3)}
    {px(13, 11, 1, 3)}
  </Frame>
);

export const PixelFolder = (p: IconProps) => (
  <Frame {...p}>
    {px(1, 3, 6, 2)}
    {px(1, 5, 14, 8)}
  </Frame>
);

export const PixelMail = (p: IconProps) => (
  <Frame {...p}>
    {px(2, 4, 12, 8)}
    {px(2, 4, 1, 1)}
    {px(13, 4, 1, 1)}
    {px(3, 5, 1, 1)}
    {px(12, 5, 1, 1)}
    {px(4, 6, 1, 1)}
    {px(11, 6, 1, 1)}
    {px(5, 7, 1, 1)}
    {px(10, 7, 1, 1)}
    {px(6, 8, 4, 1)}
  </Frame>
);

export const PixelCpu = (p: IconProps) => (
  <Frame {...p}>
    {px(5, 5, 6, 6)}
    {px(6, 1, 1, 3)}
    {px(9, 1, 1, 3)}
    {px(6, 12, 1, 3)}
    {px(9, 12, 1, 3)}
    {px(1, 6, 3, 1)}
    {px(1, 9, 3, 1)}
    {px(12, 6, 3, 1)}
    {px(12, 9, 3, 1)}
  </Frame>
);

export const PixelGamepad = (p: IconProps) => (
  <Frame {...p}>
    {px(3, 5, 10, 6)}
    {px(1, 6, 2, 4)}
    {px(13, 6, 2, 4)}
    {px(4, 7, 1, 3)}
    {px(3, 8, 3, 1)}
    {px(10, 7, 1, 1)}
    {px(12, 9, 1, 1)}
  </Frame>
);

export const PixelExternal = (p: IconProps) => (
  <Frame {...p}>
    {px(7, 2, 7, 2)}
    {px(12, 2, 2, 5)}
    {px(3, 7, 2, 2)}
    {px(5, 9, 2, 2)}
    {px(7, 7, 2, 2)}
    {px(9, 5, 2, 2)}
    {px(2, 9, 2, 5)}
    {px(2, 12, 5, 2)}
  </Frame>
);

export const PixelCpuChip = PixelCpu;

export const PixelGithub = (p: IconProps) => (
  <Frame {...p}>
    {px(6, 1, 4, 1)}
    {px(4, 2, 2, 1)}
    {px(10, 2, 2, 1)}
    {px(3, 3, 10, 6)}
    {px(2, 4, 1, 4)}
    {px(13, 4, 1, 4)}
    {px(5, 9, 2, 2)}
    {px(9, 9, 2, 2)}
    {px(4, 11, 2, 2)}
    {px(10, 11, 2, 2)}
    {px(6, 5, 1, 1)}
    {px(9, 5, 1, 1)}
  </Frame>
);

export const PixelFork = (p: IconProps) => (
  <Frame {...p}>
    {px(3, 2, 2, 2)}
    {px(11, 2, 2, 2)}
    {px(7, 9, 2, 2)}
    {px(4, 4, 1, 3)}
    {px(11, 4, 1, 3)}
    {px(4, 6, 8, 1)}
    {px(7, 7, 2, 3)}
  </Frame>
);

export const PixelUsers = (p: IconProps) => (
  <Frame {...p}>
    {px(3, 3, 4, 3)}
    {px(2, 7, 6, 4)}
    {px(9, 4, 3, 3)}
    {px(8, 8, 7, 3)}
  </Frame>
);

export const PixelBook = (p: IconProps) => (
  <Frame {...p}>
    {px(2, 2, 5, 12)}
    {px(9, 2, 5, 12)}
    {px(7, 3, 2, 10)}
    {px(3, 4, 3, 1)}
    {px(3, 6, 3, 1)}
    {px(10, 4, 3, 1)}
    {px(10, 6, 3, 1)}
  </Frame>
);

export const PixelRefresh = (p: IconProps) => (
  <Frame {...p}>
    {px(3, 3, 8, 2)}
    {px(11, 3, 2, 2)}
    {px(9, 1, 2, 2)}
    {px(5, 11, 8, 2)}
    {px(3, 11, 2, 2)}
    {px(5, 13, 2, 2)}
    {px(2, 5, 2, 4)}
    {px(12, 7, 2, 4)}
  </Frame>
);

export const PixelCalendar = (p: IconProps) => (
  <Frame {...p}>
    {px(2, 3, 12, 11)}
    {px(4, 1, 1, 3)}
    {px(11, 1, 1, 3)}
    {px(2, 6, 12, 1)}
    {px(4, 8, 2, 2)}
    {px(7, 8, 2, 2)}
    {px(10, 8, 2, 2)}
    {px(4, 11, 2, 2)}
    {px(7, 11, 2, 2)}
  </Frame>
);

export const PixelTrending = (p: IconProps) => (
  <Frame {...p}>
    {px(2, 11, 2, 2)}
    {px(4, 9, 2, 2)}
    {px(6, 10, 2, 2)}
    {px(8, 6, 2, 2)}
    {px(10, 4, 2, 2)}
    {px(12, 2, 2, 2)}
    {px(9, 2, 2, 1)}
    {px(12, 2, 1, 3)}
  </Frame>
);

export const PixelPin = (p: IconProps) => (
  <Frame {...p}>
    {px(6, 2, 4, 2)}
    {px(5, 4, 6, 4)}
    {px(6, 8, 4, 2)}
    {px(7, 10, 2, 4)}
  </Frame>
);

export const PixelChevronRight = (p: IconProps) => (
  <Frame {...p}>
    {px(6, 3, 1, 1)}
    {px(7, 4, 1, 1)}
    {px(8, 5, 1, 1)}
    {px(9, 6, 1, 1)}
    {px(9, 7, 1, 1)}
    {px(9, 8, 1, 1)}
    {px(8, 9, 1, 1)}
    {px(7, 10, 1, 1)}
    {px(6, 11, 1, 1)}
  </Frame>
);

export const PixelChevronDown = (p: IconProps) => (
  <Frame {...p}>
    {px(3, 6, 1, 1)}
    {px(4, 7, 1, 1)}
    {px(5, 8, 1, 1)}
    {px(6, 9, 1, 1)}
    {px(7, 9, 1, 1)}
    {px(8, 9, 1, 1)}
    {px(9, 8, 1, 1)}
    {px(10, 7, 1, 1)}
    {px(11, 6, 1, 1)}
  </Frame>
);

export const PixelDownload = (p: IconProps) => (
  <Frame {...p}>
    {px(7, 2, 2, 6)}
    {px(4, 6, 1, 1)}
    {px(5, 7, 1, 1)}
    {px(6, 8, 1, 1)}
    {px(9, 8, 1, 1)}
    {px(10, 7, 1, 1)}
    {px(11, 6, 1, 1)}
    {px(7, 8, 2, 1)}
    {px(2, 12, 12, 2)}
  </Frame>
);

export const PixelClock = (p: IconProps) => (
  <Frame {...p}>
    {px(5, 2, 6, 2)}
    {px(3, 4, 2, 2)}
    {px(11, 4, 2, 2)}
    {px(2, 6, 2, 4)}
    {px(12, 6, 2, 4)}
    {px(3, 10, 2, 2)}
    {px(11, 10, 2, 2)}
    {px(5, 12, 6, 2)}
    {px(7, 5, 1, 4)}
    {px(7, 8, 3, 1)}
  </Frame>
);

export const PixelPackage = (p: IconProps) => (
  <Frame {...p}>
    {px(2, 4, 12, 2)}
    {px(2, 6, 12, 8)}
    {px(6, 8, 4, 1)}
  </Frame>
);

export const PixelFilter = (p: IconProps) => (
  <Frame {...p}>
    {px(2, 3, 12, 2)}
    {px(4, 7, 8, 2)}
    {px(6, 11, 4, 2)}
  </Frame>
);

export const PixelCheck = (p: IconProps) => (
  <Frame {...p}>
    {px(3, 8, 1, 1)}
    {px(4, 9, 1, 1)}
    {px(5, 10, 1, 1)}
    {px(6, 11, 1, 1)}
    {px(7, 10, 1, 1)}
    {px(8, 9, 1, 1)}
    {px(9, 8, 1, 1)}
    {px(10, 7, 1, 1)}
    {px(11, 6, 1, 1)}
    {px(12, 5, 1, 1)}
  </Frame>
);

export const PixelMonitor = (p: IconProps) => (
  <Frame {...p}>
    {px(2, 3, 12, 8)}
    {px(6, 12, 4, 1)}
    {px(5, 13, 6, 1)}
  </Frame>
);

export const PixelTablet = (p: IconProps) => (
  <Frame {...p}>
    {px(4, 1, 8, 14)}
    {px(7, 13, 2, 1)}
  </Frame>
);

export const PixelSmartphone = (p: IconProps) => (
  <Frame {...p}>
    {px(5, 1, 6, 14)}
    {px(7, 12, 2, 1)}
  </Frame>
);

export const PixelGlobe = (p: IconProps) => (
  <Frame {...p}>
    {px(5, 2, 6, 1)}
    {px(3, 3, 2, 1)}
    {px(11, 3, 2, 1)}
    {px(2, 4, 12, 8)}
    {px(3, 12, 2, 1)}
    {px(11, 12, 2, 1)}
    {px(5, 13, 6, 1)}
    {px(7, 2, 2, 12)}
    {px(2, 7, 12, 2)}
  </Frame>
);

export const PixelMaximize = (p: IconProps) => (
  <Frame {...p}>
    {px(2, 2, 5, 2)}
    {px(2, 2, 2, 5)}
    {px(9, 2, 5, 2)}
    {px(12, 2, 2, 5)}
    {px(2, 12, 5, 2)}
    {px(2, 9, 2, 5)}
    {px(9, 12, 5, 2)}
    {px(12, 9, 2, 5)}
  </Frame>
);

export const PixelZap = (p: IconProps) => (
  <Frame {...p}>
    {px(8, 1, 3, 2)}
    {px(6, 3, 3, 2)}
    {px(4, 5, 3, 2)}
    {px(6, 7, 4, 2)}
    {px(9, 9, 3, 2)}
    {px(7, 9, 2, 2)}
    {px(5, 11, 3, 2)}
    {px(4, 13, 3, 2)}
  </Frame>
);

export const PixelLayers = (p: IconProps) => (
  <Frame {...p}>
    {px(8, 2, 2, 2)}
    {px(6, 4, 2, 2)}
    {px(10, 4, 2, 2)}
    {px(4, 6, 2, 2)}
    {px(12, 6, 2, 2)}
    {px(2, 8, 12, 2)}
    {px(4, 11, 8, 2)}
  </Frame>
);

export const PixelBuilding = (p: IconProps) => (
  <Frame {...p}>
    {px(3, 2, 8, 12)}
    {px(5, 4, 1, 1)}
    {px(8, 4, 1, 1)}
    {px(5, 7, 1, 1)}
    {px(8, 7, 1, 1)}
    {px(5, 10, 1, 1)}
    {px(8, 10, 1, 1)}
    {px(6, 14, 2, 0)}
  </Frame>
);

export const PixelFileText = (p: IconProps) => (
  <Frame {...p}>
    {px(3, 1, 8, 14)}
    {px(5, 4, 4, 1)}
    {px(5, 6, 4, 1)}
    {px(5, 8, 4, 1)}
    {px(5, 10, 2, 1)}
  </Frame>
);

export const PixelHome = (p: IconProps) => (
  <Frame {...p}>
    {px(7, 1, 2, 1)}
    {px(6, 2, 1, 1)}
    {px(9, 2, 1, 1)}
    {px(5, 3, 1, 1)}
    {px(10, 3, 1, 1)}
    {px(4, 4, 1, 1)}
    {px(11, 4, 1, 1)}
    {px(3, 5, 1, 1)}
    {px(12, 5, 1, 1)}
    {px(3, 6, 1, 7)}
    {px(12, 6, 1, 7)}
    {px(3, 12, 10, 1)}
    {px(7, 8, 2, 5)}
  </Frame>
);

export const PixelPlay = (p: IconProps) => (
  <Frame {...p}>
    {px(5, 3, 1, 1)}
    {px(5, 4, 2, 1)}
    {px(5, 5, 3, 1)}
    {px(5, 6, 4, 1)}
    {px(5, 7, 5, 1)}
    {px(5, 8, 5, 1)}
    {px(5, 9, 4, 1)}
    {px(5, 10, 3, 1)}
    {px(5, 11, 2, 1)}
    {px(5, 12, 1, 1)}
  </Frame>
);

export const PixelX = PixelClose;
