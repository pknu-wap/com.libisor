const Sequelize = require('sequelize');

module.exports = class TextLog extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      text: {
          type: Sequelize.TEXT,
          allowNull: false,
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'TextLog',
      tableName: 'textLogs',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      engine: 'MYISAM'
    });
  }

  static associate(db) {
    db.TextLog.belongsTo(db.ReadingRoom);
  }
};