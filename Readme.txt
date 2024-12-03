Mini Search Engine for Articles

Overview
This is a simple backend search engine built with Node.js and Express.js. It allows users to upload articles with a title, content, and tags, and then search through the articles using keywords and tags. The search results can be sorted by relevance (based on keyword frequency) or by date.

Features
Add Articles: Add articles with title, content, and tags.
Search Articles: Search articles by keywords in the title or content. You can also filter by tag.
Sort Search Results: Sort search results by relevance or date.
Get Article by ID: Retrieve full article details by ID.
Requirements
Node.js: Version 14.x or higher.
Express: A minimal web framework for Node.js.
body-parser: Middleware to parse incoming request bodies in JSON format.
fs (File System): For reading and writing articles to a file.
Setup Instructions
1. Clone the Repository
Clone this repository to your local machine:

bash
Copy code
git clone <repository-url>
cd MINI-SEARCH_ENGINE
2. Install Dependencies
Install the required dependencies using npm:

bash
Copy code
npm install
3. Running the Application
Start the server using Node.js:

bash
Copy code
node index.js
The application will run on http://localhost:3000.

4. API Endpoints
POST /articles
Add a new article.

Request Body:

json
Copy code
{
  "title": "Article Title",
  "content": "Article content goes here.",
  "tags": ["tag1", "tag2"],
  "date": "2024-12-03T00:00:00Z"
}
Response:

json
Copy code
{
  "message": "Article added successfully.",
  "article": {
    "id": 1,
    "title": "Article Title",
    "content": "Article content goes here.",
    "tags": ["tag1", "tag2"],
    "date": "2024-12-03T00:00:00Z"
  }
}
GET /articles/search
Search articles by keyword or tag.

Query Parameters:

keyword: A keyword to search for in the title or content.
tag: A tag to search for in the article tags.
sortBy: Sorting criteria (relevance or date).
Example:

bash
Copy code
GET http://localhost:3000/articles/search?keyword=test&sortBy=relevance
Response:

json
Copy code
[
  {
    "id": 1,
    "title": "Test Article",
    "content": "This is a test article.",
    "tags": ["test", "article"],
    "date": "2024-12-03T00:00:00Z"
  }
]
GET /articles/:id
Get an article by its ID.

Example:

bash
Copy code
GET http://localhost:3000/articles/1
Response:

json
Copy code
{
  "id": 1,
  "title": "Test Article",
  "content": "This is a test article.",
  "tags": ["test", "article"],
  "date": "2024-12-03T00:00:00Z"
}
File Structure
bash
Copy code
MINI-SEARCH_ENGINE/
│
├── index.js            # Main server file
├── utils/
│   └── search.js       # Search logic for handling keyword/tag matching
├── articles.json       # File to persist articles data (if it doesn't exist, it'll be created)
├── package.json        # Project metadata and dependencies
└── README.txt          # Project documentation
