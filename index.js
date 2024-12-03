const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 6000;

app.use(bodyParser.json());
const persistFile = "./articles.json";
let articles = fs.existsSync(persistFile)
  ? JSON.parse(fs.readFileSync(persistFile, "utf-8"))
  : [];

// POST: Add new article
app.post("/articles", (req, res) => {
  const { title, content, tags = [], date = new Date() } = req.body;
  if (!title || !content)
    return res.status(400).send("Title and content are required.");

  const article = { id: articles.length + 1, title, content, tags, date };
  articles.push(article);
  fs.writeFileSync(persistFile, JSON.stringify(articles, null, 2));
  res.status(201).send({ message: "Article added successfully.", article });
});

// PUT: Update an article
app.put("/articles/:id", (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).send("Article not found.");

  const { title, content, tags = [] } = req.body;
  article.title = title || article.title;
  article.content = content || article.content;
  article.tags = tags.length ? tags : article.tags;
  fs.writeFileSync(persistFile, JSON.stringify(articles, null, 2));
  res.status(200).send({ message: "Article updated successfully.", article });
});

// DELETE: Delete an article
app.delete("/articles/:id", (req, res) => {
  const index = articles.findIndex((a) => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Article not found.");

  articles.splice(index, 1);
  fs.writeFileSync(persistFile, JSON.stringify(articles, null, 2));
  res.status(200).send({ message: "Article deleted successfully." });
});

// GET: Get article by ID
app.get("/articles/:id", (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).send("Article not found.");
  res.status(200).send(article);
});

// GET: Search articles
app.get("/articles/search", (req, res) => {
  const { keyword, tag, sortBy = "relevance" } = req.query;
  if (!keyword && !tag)
    return res.status(400).send("Provide a keyword or tag for searching.");

  let results = articles.filter(
    (a) =>
      (keyword && (a.title.includes(keyword) || a.content.includes(keyword))) ||
      (tag && a.tags.includes(tag))
  );

  if (sortBy === "date")
    results.sort((a, b) => new Date(b.date) - new Date(a.date));
  else
    results.sort(
      (a, b) =>
        (a.title.match(new RegExp(keyword, "gi")) || []).length -
        (b.title.match(new RegExp(keyword, "gi")) || []).length
    );

  res.status(200).send(results);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
