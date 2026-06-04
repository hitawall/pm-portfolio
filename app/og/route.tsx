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
          backgroundColor: "#09090b",
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
            background: "linear-gradient(90deg, #b45309 0%, #fbbf24 100%)",
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
                    color: "#fbbf24",
                  }}
                >
                  {type}
                </div>
              )}
              {type && sub && (
                <div style={{ color: "#3f3f46", fontSize: "13px" }}>·</div>
              )}
              {sub && (
                <div style={{ fontSize: "13px", color: "#71717a", letterSpacing: "0.03em" }}>
                  {sub}
                </div>
              )}
            </div>
          )}

          <div
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              color: "#fafafa",
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
            borderTop: "1px solid #27272a",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#fafafa",
                letterSpacing: "-0.01em",
              }}
            >
              {siteConfig.name}
            </div>
            <div style={{ fontSize: "13px", color: "#71717a", letterSpacing: "0.04em" }}>
              Engineer · Product · AI
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "linear-gradient(135deg, #b45309 0%, #fbbf24 100%)",
              borderRadius: "100px",
              padding: "12px 28px",
              fontSize: "15px",
              fontWeight: 700,
              color: "#1c1008",
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
