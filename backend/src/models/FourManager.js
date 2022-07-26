const AbstractManager = require('./AbstractManager');
class FourManager extends AbstractManager {
  static table = 'player_stats';
  insert(player) {
    return this.connection.query(
      `insert into ${FourManager.table} (
        name,
        wins,
        losses,
        draws
      ) values (?,?,?,?)`,
      [player.name, player.wins, player.losses, player.draws]
    );
  }
  static table = 'player_stats';
  insertName(player) {
    return this.connection.query(
      `insert into ${FourManager.table} (
        name,
      ) values (?)`,
      [player.name]
    );
  }
}
module.exports = ItemManager;
