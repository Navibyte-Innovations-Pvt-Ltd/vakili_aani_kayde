import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const OgImageSize = { width: 1200, height: 630 };

const loadFonts = async () => {
  const fontConfigs = [
    { path: "public/fonts/inter-700.woff", name: "Inter" },
    { path: "public/fonts/noto-sans-devanagari-700.woff", name: "Noto Sans Devanagari" },
  ];

  const fontResults = await Promise.allSettled(
    fontConfigs.map(async ({ path }) => {
      const absolutePath = join(process.cwd(), path);
      const buffer = await readFile(absolutePath);
      return new Uint8Array(buffer).buffer as ArrayBuffer;
    }),
  );

  const fonts: { name: string; data: ArrayBuffer; weight: 700; style: "normal" }[] = [];

  fontResults.forEach((result, i) => {
    if (result.status === "fulfilled") {
      fonts.push({ name: fontConfigs[i].name, data: result.value, weight: 700, style: "normal" });
    } else {
      console.warn(`[OG] Font "${fontConfigs[i].name}" failed:`, result.reason);
    }
  });

  return fonts;
};

export const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const type = res.headers.get("content-type") || "image/png";
      return `data:${type};base64,${base64}`;
    }
  } catch (e) {
    console.warn("[OG] Image fetch error:", e);
  }
  return null;
};

interface OgImageOptions {
  title: string;
  subtitle?: string;
  price?: number | string;
  coverImageUrl?: string | null;
  tag?: string;
}

export async function generateOgImage(options: OgImageOptions) {
  const { title, subtitle, price, coverImageUrl, tag } = options;

  const [fonts, coverImageBase64] = await Promise.all([
    loadFonts(),
    coverImageUrl ? fetchImageAsBase64(coverImageUrl) : Promise.resolve(null),
  ]);

  const displayTitle = title.length > 70 ? title.substring(0, 70) + "..." : title;
  const titleFontSize = displayTitle.length > 45 ? "46px" : displayTitle.length > 28 ? "56px" : "66px";

  const NAVY = "#5A1A2B";
  const GOLD = "#C79A3E";
  const GOLD_LIGHT = "#EBD9B8";

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "64px",
        backgroundColor: NAVY,
        backgroundImage: `linear-gradient(135deg, ${NAVY} 0%, #112a52 60%, #0c2547 100%)`,
        color: "white",
        fontFamily: "Noto Sans Devanagari, Inter",
        overflow: "hidden",
      }}
    >
      {/* Decorative gold glows */}
      <div
        style={{
          position: "absolute",
          top: "-160px",
          right: "-120px",
          width: "480px",
          height: "480px",
          borderRadius: "9999px",
          backgroundImage: `radial-gradient(circle, ${GOLD}33 0%, ${GOLD}00 70%)`,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          left: "200px",
          width: "520px",
          height: "520px",
          borderRadius: "9999px",
          backgroundImage: `radial-gradient(circle, ${GOLD}1f 0%, ${GOLD}00 70%)`,
          display: "flex",
        }}
      />
      {/* Top gold accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1200px",
          height: "8px",
          backgroundImage: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%)`,
          display: "flex",
        }}
      />

      {/* Book cover */}
      <div style={{ position: "relative", display: "flex", marginRight: "64px" }}>
        <div
          style={{
            width: "346px",
            height: "500px",
            backgroundColor: "#0d1b30",
            display: "flex",
            borderRadius: "20px",
            overflow: "hidden",
            border: `3px solid ${GOLD}`,
            boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {coverImageBase64 ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${coverImageBase64})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
              }}
            />
          ) : (
            <div
              style={{
                fontSize: "150px",
                fontWeight: 900,
                color: `${GOLD}55`,
                display: "flex",
              }}
            >
              वा
            </div>
          )}
        </div>
        {/* Tag ribbon on cover */}
        {tag ? (
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "-14px",
              backgroundColor: GOLD,
              color: NAVY,
              padding: "8px 18px",
              borderRadius: "8px",
              fontSize: "20px",
              fontWeight: 800,
              boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
              display: "flex",
            }}
          >
            {tag}
          </div>
        ) : null}
      </div>

      {/* Right content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {/* Brand lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              backgroundImage: `linear-gradient(135deg, ${GOLD} 0%, #b07f1f 100%)`,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: NAVY,
              fontWeight: 900,
              fontSize: "30px",
            }}
          >
            वा
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "30px", color: GOLD, fontWeight: 800, display: "flex" }}>
              वकिली आणि कायदे
            </div>
            <div
              style={{
                fontSize: "15px",
                color: "#94a3b8",
                fontWeight: 700,
                letterSpacing: "2px",
                display: "flex",
              }}
            >
              VAKILIANIKAYDE.IN
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: titleFontSize,
            fontWeight: 900,
            lineHeight: 1.12,
            marginBottom: "28px",
            display: "flex",
          }}
        >
          {displayTitle}
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "90px",
            height: "5px",
            backgroundColor: GOLD,
            borderRadius: "9999px",
            marginBottom: "32px",
            display: "flex",
          }}
        />

        {/* Price + subtitle */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {price ? (
            <div
              style={{
                backgroundImage: `linear-gradient(135deg, ${GOLD} 0%, #b07f1f 100%)`,
                color: NAVY,
                padding: "14px 32px",
                borderRadius: "16px",
                fontSize: "44px",
                fontWeight: 900,
                boxShadow: `0 12px 28px ${GOLD}44`,
                display: "flex",
              }}
            >
              ₹{price}
            </div>
          ) : null}

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "white",
                marginBottom: "4px",
                display: "flex",
              }}
            >
              {subtitle || "Premium Content"}
            </div>
            <div style={{ fontSize: "17px", color: "#94a3b8", fontWeight: 700, display: "flex" }}>
              Marathi Edition • Instant PDF Download
            </div>
          </div>
        </div>
      </div>
    </div>,
    {
      ...OgImageSize,
      ...(fonts.length > 0 ? { fonts } : {}),
    },
  );
}
