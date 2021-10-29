const Trie = require("../utils/trie");

function existingOrNew(byId, searchTerm) {
  searchTerm = searchTerm.toLowerCase();

  byId[searchTerm] = byId[searchTerm] || new Set();
  return byId[searchTerm];
}

function buildProductTrie(products) {
  return products.reduce(
    (searchData, item) => {
      item.name.split(" ").forEach((name) => {
        searchData.trie.addWordLowerCase(name);

        existingOrNew(searchData.idList, name.toLowerCase()).add(item._id);
      });
      item.tags.forEach((name) => {
        searchData.trie.addWordLowerCase(name);
        existingOrNew(searchData.idList, name).add(item._id);
      });
      item.about.split(" ").forEach((name) => {
        searchData.trie.addWordLowerCase(name);
        existingOrNew(searchData.idList, name).add(item._id);
      });
      return searchData;
    },
    { trie: new Trie(), idList: {} }
  );
}
module.exports = buildProductTrie;
