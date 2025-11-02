import Parser from "rss-parser";

interface FeedItem {
  feed?: string;
  title?: string;
  link?: string;
  date?: Date;
}

const parser = new Parser();
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() - 7);

/**
 * Récupère les articles récents d'une catégorie de flux.
 * @param feedName Nom de la catégorie 
 * @param feedUrls Liste des URLs des RSS
**/
export async function getFeedItems(feedName: string, feedUrls: string[]): Promise<FeedItem[]> {
  const feedItems: FeedItem[] = [];

  await Promise.allSettled(
    feedUrls.map(async (url) => {
      try {
        const feed = await parser.parseURL(url);
        feed.items.forEach((item) => {

          const date = item.pubDate ? new Date(item.pubDate) : undefined;
          if (date && date >= maxDate) {
            feedItems.push({
              feed: feed.title,
              title: item.title ?? "Sans titre",
              link: item.link,
              date,
            });
          }
        });
      } catch (error) {
        console.error(`Erreur lors du chargement du flux ${url}:`, error);
      }
    })
  );

  return feedItems.sort(
    (a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)
  );
}