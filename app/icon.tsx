import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
          stroke="#b91c1c"
          strokeWidth="1.3"
          strokeLinecap="round"
        >
          <path d="M8 12.5 L3 2" />
          <path d="M8 12.5 L5.6 1.3" />
          <path d="M8 12.5 L8 1" />
          <path d="M8 12.5 L10.4 1.3" />
          <path d="M8 12.5 L13 2" />
          <circle cx="8" cy="13.3" r="1.6" fill="#e8bd45" stroke="none" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
