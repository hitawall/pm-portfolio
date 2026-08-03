import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/lib/config";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.title;
  const type = searchParams.get("type") ?? null;
  const sub = searchParams.get("sub") ?? null;

  const titleSize = title.length > 60 ? "44px" : title.length > 40 ? "54px" : "64px";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070b14",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #b91c1c 0%, #e8bd45 100%)",
          }}
        />

        {/* Radial glow — echoes the hero backdrop */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(239,68,68,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1, justifyContent: "center" }}>
          {(type || sub) && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {type && (
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#e8bd45",
                  }}
                >
                  {type}
                </div>
              )}
              {type && sub && (
                <div style={{ color: "#8b93a8", fontSize: "13px" }}>·</div>
              )}
              {sub && (
                <div style={{ fontSize: "13px", color: "#8b93a8", letterSpacing: "0.03em" }}>
                  {sub}
                </div>
              )}
            </div>
          )}

          <div
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              color: "#eef1f6",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              maxWidth: "960px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "40px",
            borderTop: "1px solid rgba(238,241,246,0.16)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#eef1f6",
                letterSpacing: "-0.01em",
              }}
            >
              {siteConfig.name}
            </div>
            <div style={{ fontSize: "13px", color: "#9b9ba4", letterSpacing: "0.04em" }}>
              Backend Engineer · GenAI
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#b91c1c",
              borderRadius: "100px",
              padding: "12px 28px",
              fontSize: "15px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            View Portfolio →
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
