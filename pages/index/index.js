Page({
  data: {
    totalItems: 50,
    itemsPerPage: 15,
    currentPage: 1,
    dataset: [],
    navigationButtons: []
  },

  onLoad(query) {
    console.info(`Página cargada con consulta: ${JSON.stringify(query)}`);
    this.generateDataset();
    this.generateNavigationButtons();
    this.showItems(this.data.currentPage);
    this.checkPaginatorFilled();
  },

  generateDataset() {
    const startIndex = (this.data.currentPage - 1) * this.data.itemsPerPage;
    const endIndex = startIndex + this.data.itemsPerPage;
    const dataset = Array.from(
      { length: this.data.totalItems },
      (_, index) => `Elemento ${index + 1}`
    );
    this.setData({
      dataset: dataset.slice(startIndex, endIndex)
    });
  },

  generateNavigationButtons() {
    const totalPages = Math.ceil(this.data.totalItems / this.data.itemsPerPage);
    const navigationButtons = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
    this.setData({
      navigationButtons: navigationButtons
    });
  },

  showItems(page) {
    const startIndex = (page - 1) * this.data.itemsPerPage;
    const endIndex = startIndex + this.data.itemsPerPage;
    const itemsToShow = this.data.dataset.slice(startIndex, endIndex);

    this.setData({
      itemContainer: itemsToShow
    });
  },

  changePage(e) {
    const page = e.currentTarget.dataset.page;
    this.setData({
      currentPage: page
    });
    this.generateDataset();
    this.showItems(this.data.currentPage);
    this.checkPaginatorFilled();
  },

  checkPaginatorFilled() {
    const totalPages = Math.ceil(this.data.totalItems / this.data.itemsPerPage);
    const paginatorFilled = this.data.currentPage >= totalPages;
    console.log("Paginador lleno:", paginatorFilled);
  }
});
