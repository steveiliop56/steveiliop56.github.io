import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.publishedOn.getTime() - a.data.publishedOn.getTime(),
  );
  return rss({
    title: "Doesmycodework",
    description: "My code doesn't work",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedOn,
      description: post.data.description,
      link: `/posts/${post.id.replace(/\.md?$/, "")}/`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    customData: `<language>en-us</language>`,
    stylesheet: "/rss/styles.xsl",
  });
}
