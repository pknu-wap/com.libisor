const Sequelize = require('sequelize');

module.exports = class Seat extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      seatNumber: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Seat',
      tableName: 'seats',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Seat.belongsTo(db.ReadingRoom);

    db.Seat.hasMany(db.SeatRecord);
  }
};