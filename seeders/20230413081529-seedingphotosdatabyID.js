'use strict';
module.exports = {
  up: async (QueryInterface, Sequelize)=>{
    await QueryInterface.bulkInsert('Photos', [
      {
        title: "Photo 1 milik UserId 1",
        caption: "Caption photo 1",
        image_url: "https://picsum.photos/id/1/200/300",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Photo 2 milik UserId 1",
        caption: "Caption photo 2",
        image_url: "https://picsum.photos/id/2/200/300",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  }
};
