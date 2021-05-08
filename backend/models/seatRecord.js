const Sequelize = require('sequelize');

module.exports = class SeatRecord extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      takeOrReturn: {
        type: Sequelize.TINYINT,
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'SeatRecord',
      tableName: 'seatRecords',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.SeatRecord.belongsTo(db.Seat);
  }
};