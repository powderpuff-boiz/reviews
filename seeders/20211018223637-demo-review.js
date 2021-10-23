'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      product_id: "1",
      rating: 5,
      summary: "This product was great!",
      body: "I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",
      recommend: true,
      reported: false,
      reviewer_name: "Funtime",
      reviewer_email: "first.last@gmail.com",
      helpfulness: 8
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
