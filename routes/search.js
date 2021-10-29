const router = require("express").Router();
const buildProductTrie = require("../utils/trieBuilder");
const activeProductSet = require("./products");
const extractSearch = require("../utils/query");
const VALID_SEARCH_REGEX = /^\w+$/;

const availableProductsById = activeProductSet(require("../data"));
const products = Object.values(availableProductsById);
const { trie, idList } = initializeSearchData(products);

router.get("/search", (req, res) => {
  const query = extractSearch(req.url);

  if (query && VALID_SEARCH_REGEX.test(query)) {
    let response = [
      ...trie
        .searchLowerCase(query)
        .reduce((noDupes, product) => {
          [...(idList[product] || []).values()].forEach(noDupes.add, noDupes);
          return noDupes;
        }, new Set())
        .values(),
    ].map((id) => {
      return availableProductsById[id];
    });

    res.end(JSON.stringify(response));
  } else {
    res.end(generateError("Invalid Search Query"));
  }
});

function initializeSearchData(productList) {
  return buildProductTrie(productList);
}

function generateError(error) {
  return {
    error,
  };
}

module.exports = router;
