const url = 'https://newsapi.org/v2/everything?' +
            'q=Apple&' +
            'from=2025-01-26&' +
            'sortBy=popularity&' +
            'apiKey=b02331c5a6974b93a9aaeaa7ae186a17'; // Replace with your NewsAPI key

const newsContainer = document.getElementById('news-container');

// Fetch latest news from NewsAPI
async function fetchNews() {
  try {
    const response = await fetch(url);

    // If the response status is not OK (e.g., 400 or 500)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Check if the status is 'ok' from the API response
    if (data.status === 'ok') {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = `<p>Error fetching news: ${data.message}. Please try again later.</p>`;
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    newsContainer.innerHTML = `<p>Error fetching news. Please try again later.</p>`;
  }
}

// Display news articles on the page
function displayNews(articles) {
  newsContainer.innerHTML = '';

  if (articles.length === 0) {
    newsContainer.innerHTML = `<p>No articles found.</p>`;
    return;
  }

  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('news-item');

    articleElement.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    newsContainer.appendChild(articleElement);
  });
}

// Call the fetchNews function to load the news when the page loads
fetchNews();
