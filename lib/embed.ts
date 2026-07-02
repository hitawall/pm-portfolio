/** Converts a user-facing share URL into an embeddable iframe src. */
export function toVideoEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);

    // YouTube: youtu.be/ID or youtube.com/watch?v=ID or youtube.com/shorts/ID
    const ytMatch =
      u.hostname === "youtu.be"
        ? u.pathname.slice(1)
        : u.hostname.includes("youtube.com")
          ? u.searchParams.get("v") ?? u.pathname.split("/").pop()
          : null;
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch}?rel=0&modestbranding=1`;

    // Loom: loom.com/share/ID
    if (u.hostname.includes("loom.com")) {
      const id = u.pathname.split("/").pop();
      if (id) return `https://www.loom.com/embed/${id}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`;
    }

    // Vimeo: vimeo.com/ID
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").pop();
      if (id) return `https://player.vimeo.com/video/${id}?dnt=1`;
    }

    return null;
  } catch {
    return null;
  }
}
