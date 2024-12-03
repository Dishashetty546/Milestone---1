function searchArticles(articles, { keyword, tag, sortBy }) {
  let filtered = articles;

  // Filter by keyword
  if (keyword) {
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        article.content.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // Filter by tag
  if (tag) {
    filtered = filtered.filter((article) => article.tags.includes(tag));
  }

  // Sort results
  if (sortBy === "relevance" && keyword) {
    filtered = filtered.map((article) => ({
      ...article,
      relevance:
        (article.content.match(new RegExp(keyword, "gi")) || []).length +
        (article.title.match(new RegExp(keyword, "gi")) || []).length,
    }));
    filtered.sort((a, b) => b.relevance - a.relevance);
  } else if (sortBy === "date") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return filtered;
}

module.exports = { searchArticles };
