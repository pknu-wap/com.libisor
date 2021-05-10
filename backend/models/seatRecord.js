const Sequelize = require('sequelize');

module.exports = class SeatRecord extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      takeOrReturn: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()")
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
      engine: 'MYISAM'
    });
  }

  static associate(db) {
    db.SeatRecord.belongsTo(db.Seat);
  }
};