const Trie = require("../utils/trie");
const data = require("../data");
const buildProductTrie = require("../utils/trieBuilder");
it("should create a trie", () => {
  const products = data.filter((item) => item.isActive !== "false");
  const { trie, idList } = buildProductTrie(products);
  const results = trie.searchLowerCase("sh");
  expect(results[0]).toContain("shamp");
  expect([...idList["shampoo"].values()].length).toEqual(5);
  console.log(results);
});
