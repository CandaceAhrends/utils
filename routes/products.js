function activeProducts(data) {
  return data.filter((item) => item.isActive !== "false");
}

function activeProductSet(data) {
  return activeProducts(data).reduce((byId, product) => {
    byId[product._id] = product;
    return byId;
  }, {});
}

module.exports = activeProductSet;
