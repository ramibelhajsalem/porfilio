"use client";

export default function BackgroundWaves() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 25px 25px rgba(15, 92, 63, 0.15))", opacity: 0.92 }}
      >
        {/* Layer 1: Thick soft glass base wave */}
        {/* <path
          className="wave-layer"
          d="M0 520 C 120 410 240 290 360 430 C 480 570 600 650 720 490 C 840 330 960 210 1080 370 C 1200 530 1320 610 1440 460"
          stroke="#ffffff"
          strokeWidth="68"
          strokeOpacity="0.22"
          strokeLinecap="round"
        /> */}

        {/* Layer 2: Medium glass highlight wave */}
        <path
          className="wave-layer-reverse"
          d="M0 505 C 130 395 250 275 370 415 C 490 555 610 635 730 475 C 850 315 970 195 1090 355 C 1210 515 1330 595 1440 445"
          stroke="#f0f8f4"
          strokeWidth="34"
          strokeOpacity="0.38"
          strokeLinecap="round"
        />

        {/* Layer 3: Thin shiny glass edge */}
        <path
          className="wave-layer"
          d="M0 495 C 140 385 260 265 380 405 C 500 545 620 625 740 465 C 860 305 980 185 1100 345 C 1220 505 1340 585 1440 435"
          stroke="#ffffff"
          strokeWidth="11"
          strokeOpacity="0.65"
          strokeLinecap="round"
        />

        {/* Extra small accent wave */}
        {/* <path
          className="wave-layer-reverse"
          d="M920 280 C 980 210 1040 180 1100 255 C 1160 330 1220 370 1290 295"
          stroke="#e8f4ee"
          strokeWidth="22"
          strokeOpacity="0.25"
          strokeLinecap="round"
        /> */}
      </svg>

      {/* Soft glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10" />
    </div>
  );
}
