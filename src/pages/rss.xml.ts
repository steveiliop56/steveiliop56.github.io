import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

// Should implement just enough to make typescript happy
type Context = {
  site: URL;
};

export async function GET(context: Context) {
  const blog = await getCollection("blog");
  return rss({
    title: "Stavros' Blog",
    description: "Just Stavros ranting about web development and other stuff",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedOn,
      description: post.data.description,
      author: post.data.author,
      commentsUrl: `${context.site.origin}/posts/${post.id}#comments`,
      link: `/posts/${post.id}`,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: `${context.site.origin}/rss/styles.xsl`,
  });
}
