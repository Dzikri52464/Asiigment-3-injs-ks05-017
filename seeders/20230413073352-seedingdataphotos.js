module.exports = {
  up: async (queryInterface, Sequelize)=>{
    await queryInterface.bulkInsert('Photos', [
      {
        title: "Photo 1",
        caption: "Caption photo 1",
        image_url: "https://picsum.photos/id/1/200/300",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Photo 2",
        caption: "Caption photo 2",
        image_url: "https://picsum.photos/id/2/200/300",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  }

};