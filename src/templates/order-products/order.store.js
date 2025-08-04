import { defineStore } from "pinia";
export const useOrderStore = defineStore({
  id: "order-store",
  state: () => ({
    parsed_products: [],
    original_products: [],
    labels: {
      title: "Nombre",
      subtitle: "Precio",
      description: "Código",
    },
  }),

  actions: {
    /**
     * Receive a product an add it to #original_products
     * Also parse it according to parse_type parameter and
     * add it to corresponding attribute
     *
     * @param {Object} product
     * @param {Stging} parse_type
     */
    addProduct(product, parse_type) {
      this.original_products.push(product);
      let _parsedProduct;
      _parsedProduct = this.parseProduct(product, parse_type);
      this.parsed_products.push(_parsedProduct);
    },
    /**
     * Receive a parse type parameter and return the array list
     * according to that parse type.
     *
     * @param {String} type
     * @returns {Array}
     */
    getProductsList(type) {
      if (type == "original") return this.original_products;
      else return this.parsed_products;
    },
    removeProduct(property) {
      let i = this.findIndexByProperty(property, "original");
      this.parsed_products.splice(i, 1);
      this.original_products.splice(i, 1);
    },
    findIndexByProperty(property, parse_type) {
      let _aux_array = this.getProductsList(parse_type);
      for (let i = 0; i < _aux_array.length; i++) {
        console.log(_aux_array[i]);
        if (_aux_array[i][property.index] == property.value) return i;
      }
    },
    updateItem(i, data) {
      console.log(data);
      for (let p in data) {
        this.parsed_products[i][p] = data[p];
      }
    },
    getProduct(i, type) {
      if (type == "original") return this.original_products;
      else return this.parsed_products;
    },
    getLabel(name) {
      return this.labels[name];
    },
    /**
     * If you need to calculate the price in another way, yo
     * can modify this function
     */
    getTotal() {
      let price = 0;
      this.parsed_products.map((product) => {
        price += product.price * product.quantity;
      });
      return price;
    },
    /**
     * In this function you parse the incoming product to the
     * store product structure
     */
    parseProduct(product, parse_type) {
      console.log(product);
      if (parse_type == "service") {
        return {
          title: product.name,
          image: product.photo,
          subtitle: "$" + product.price,
          description: product.code,
          price: product.price,
          quantity: 1,
        };
      }
    },
    parseList(products, parse_type) {
      let _list = [];
      products.map((product) => {
        _list.push(this.parseProduct(product, parse_type));
      });
      return _list;
    },
    setList(products, parse_type) {
      let _list = this.parseList(products, parse_type);
      this.parsed_products = _list;
      this.original_products = products;
    },
    validateCeroQuantity() {
      let _products_list = this.getProductsList();
      for (let i = 0; i < _products_list.length; i++) {
        if (_products_list[i].quantity == 0) return true;
      }
      return false;
    },
    emptyProducts() {
      this.setList([], "service");
    },
  },
});
