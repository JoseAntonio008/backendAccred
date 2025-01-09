"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JpiaFr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JpiaFr.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      fileName: { type: DataTypes.STRING, allowNull: false },
      mimeType: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.INTEGER, allowNull: false },
      fileData: DataTypes.BLOB("long"),
      status:{
        defaultValue:"pending",
        type:DataTypes.STRING
      },
      department:{type:DataTypes.STRING, allowNull:false}
    },
    {
      sequelize,
      modelName: "JpiaFr",
    }
  );
  return JpiaFr;
};
