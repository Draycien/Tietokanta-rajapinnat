const db = require('../database');

const opintojakso = {
  getAll: function(callback) {
    return db.query('select * from opintojakso', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from opintojakso where idopintojakso=?', [id], callback);
  },
  add: function(opintojakso, callback) {
    return db.query(
      'insert into opintojakso (koodi,Laajuus,Nimi) values(?,?,?)',
      [opintojakso.koodi, opintojakso.Laajuus, opintojakso.Nimi],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from opintojakso where idopintojakso=?', [id], callback);
  },
  update: function(id, opintojakso, callback) {
    return db.query(
      'update opintojakso set koodi=?,Laajuus=?, Nimi=? where idopintojakso=?',
      [opintojakso.koodi, opintojakso.Laajuus, opintojakso.Nimi, id],
      callback
    );
  }
};
module.exports = opintojakso;