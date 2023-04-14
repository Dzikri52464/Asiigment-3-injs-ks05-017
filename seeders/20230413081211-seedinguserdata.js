
module.exports = {
  up: async (QueryInterface, Sequelize)=>{
    await QueryInterface.bulkInsert('Users',[{
      username: 'Dzikri',
      email:'dzikri!@mail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});
  },
};
