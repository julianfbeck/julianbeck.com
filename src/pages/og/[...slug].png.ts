import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import sharp from "sharp";

// Load font - we'll use a system font approach
async function loadGoogleFont(font: string, text: string) {
  const API = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(API, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  })).text();

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (!resource) return null;

  const fontData = await fetch(resource[1]).then(res => res.arrayBuffer());
  return fontData;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      params: { slug: post.slug },
      props: { post },
    }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getCollection<"blog">>>[0] };
  const { title, description, type, release, tags } = post.data;

  const isRelease = type === "release";

  // Prepare text for font loading
  const textContent = `${title}${description}${release?.appName || ""}${release?.tagline || ""}Julian Beck`;

  // Load fonts
  const [fontRegular, fontBold] = await Promise.all([
    loadGoogleFont("Inter:wght@400", textContent),
    loadGoogleFont("Inter:wght@700", textContent),
  ]);

  const fonts: any[] = [];
  if (fontRegular) {
    fonts.push({ name: "Inter", data: fontRegular, weight: 400, style: "normal" });
  }
  if (fontBold) {
    fonts.push({ name: "Inter", data: fontBold, weight: 700, style: "normal" });
  }

  // Generate SVG with Satori
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f172a",
          padding: "60px",
          fontFamily: "Inter",
        },
        children: isRelease
          ? [
              // Release post layout
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "30px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          backgroundColor: "#0ea5e9",
                          color: "white",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "20px",
                          fontWeight: 700,
                        },
                        children: "NEW RELEASE",
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    flex: 1,
                  },
                  children: [
                    release?.appIcon ? {
                      type: "img",
                      props: {
                        src: release.appIcon.startsWith("http") ? release.appIcon : `https://julianbeck.com${release.appIcon}`,
                        width: 150,
                        height: 150,
                        style: {
                          borderRadius: "30px",
                        },
                      },
                    } : null,
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        },
                        children: [
                          {
                            type: "div",
                            props: {
                              style: {
                                fontSize: "52px",
                                fontWeight: 700,
                                color: "white",
                                lineHeight: 1.2,
                              },
                              children: release?.appName || title,
                            },
                          },
                          release?.tagline ? {
                            type: "div",
                            props: {
                              style: {
                                fontSize: "28px",
                                color: "#94a3b8",
                                marginTop: "10px",
                              },
                              children: release.tagline,
                            },
                          } : null,
                        ].filter(Boolean),
                      },
                    },
                  ].filter(Boolean),
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "24px",
                    color: "#64748b",
                    marginTop: "auto",
                  },
                  children: "julianbeck.com",
                },
              },
            ]
          : [
              // Regular post layout
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "20px",
                  },
                  children: tags.slice(0, 3).map((tag: string) => ({
                    type: "div",
                    props: {
                      style: {
                        backgroundColor: "#1e293b",
                        color: "#94a3b8",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        fontSize: "18px",
                      },
                      children: tag,
                    },
                  })),
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "56px",
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1.2,
                    flex: 1,
                  },
                  children: title.length > 60 ? title.substring(0, 60) + "..." : title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "26px",
                    color: "#94a3b8",
                    marginTop: "20px",
                    lineHeight: 1.4,
                  },
                  children: description.length > 120 ? description.substring(0, 120) + "..." : description,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto",
                    paddingTop: "30px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "24px",
                          color: "#64748b",
                        },
                        children: "Julian Beck",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "24px",
                          color: "#0ea5e9",
                        },
                        children: "julianbeck.com/blog",
                      },
                    },
                  ],
                },
              },
            ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );

  // Convert SVG to PNG using Sharp
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
