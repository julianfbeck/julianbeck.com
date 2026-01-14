import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

// Load a font for Satori
async function loadFont(): Promise<ArrayBuffer> {
  // Use Inter font from Google Fonts CDN
  const fontUrl =
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff";
  const response = await fetch(fontUrl);
  return await response.arrayBuffer();
}

// OG Image template component
interface OGTemplateProps {
  title: string;
  description: string;
  type?: "default" | "relay";
  appName?: string;
  tags?: string[];
}

function createOGTemplate({
  title,
  description,
  type = "default",
  appName,
  tags = [],
}: OGTemplateProps) {
  const isRelay = type === "relay";

  return {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px",
        background: isRelay
          ? "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)"
          : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        fontFamily: "Inter",
      },
      children: [
        // Top section with badge
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px",
            },
            children: [
              isRelay
                ? {
                    type: "div",
                    props: {
                      style: {
                        background:
                          "linear-gradient(90deg, #818cf8, #c084fc)",
                        color: "white",
                        padding: "8px 20px",
                        borderRadius: "24px",
                        fontSize: "20px",
                        fontWeight: 700,
                      },
                      children: appName ? `🚀 ${appName}` : "🚀 App Release",
                    },
                  }
                : {
                    type: "div",
                    props: {
                      style: {
                        color: "#38bdf8",
                        fontSize: "24px",
                        fontWeight: 700,
                      },
                      children: "julianbeck.com",
                    },
                  },
            ],
          },
        },

        // Middle section with title and description
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: title.length > 50 ? "48px" : "56px",
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1.2,
                    maxWidth: "1000px",
                  },
                  children: title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "24px",
                    color: "#94a3b8",
                    lineHeight: 1.5,
                    maxWidth: "900px",
                  },
                  children:
                    description.length > 150
                      ? description.substring(0, 147) + "..."
                      : description,
                },
              },
            ],
          },
        },

        // Bottom section with tags
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
            children: [
              tags.length > 0
                ? {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        gap: "12px",
                      },
                      children: tags.slice(0, 4).map((tag) => ({
                        type: "div",
                        props: {
                          style: {
                            background: isRelay ? "#4c1d95" : "#1e293b",
                            color: isRelay ? "#c4b5fd" : "#64748b",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            fontSize: "18px",
                          },
                          children: tag,
                        },
                      })),
                    },
                  }
                : null,
              {
                type: "div",
                props: {
                  style: {
                    color: "#64748b",
                    fontSize: "20px",
                  },
                  children: "Julian Beck",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: {
      title: post.data.title,
      description: post.data.description,
      type: post.data.type || "default",
      appName: post.data.appName,
      tags: post.data.tags,
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description, type, appName, tags } = props as OGTemplateProps;

  try {
    const fontData = await loadFont();

    const svg = await satori(
      createOGTemplate({ title, description, type, appName, tags }) as any,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );

    const resvg = new Resvg(svg, {
      fitTo: {
        mode: "width",
        value: 1200,
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new Response(new Uint8Array(pngBuffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Error generating image", { status: 500 });
  }
};
