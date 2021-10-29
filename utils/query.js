function extractSearch(url) {
  const query = url.slice(1).match(/search\?name\=(?<searchQuery>[\w]+)/);

  if (query) {
    const {
      groups: { searchQuery },
    } = query;
    return searchQuery;
  }
  return null;
}

module.exports = extractSearch;
