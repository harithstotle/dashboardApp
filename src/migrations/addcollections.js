module.exports = {
  async up(db) {
    await db.createCollection('');
  },

  async down(db) {
    await db.collection('').drop();
  },
};
