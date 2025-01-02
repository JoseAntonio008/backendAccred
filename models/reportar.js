"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReportAr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReportAr.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false, // Make this field required
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // Optional: Store file content as BLOB
      fileData: {
        type: DataTypes.BLOB("long"),
        allowNull: true, // Use this only if you want to store the file directly
      },
      description:DataTypes.STRING,
      status:{
        type:DataTypes.STRING,
        defaultValue:"pending"
      },
      department:{
        type:DataTypes.STRING,
        allowNull:false
      }
    },
    {
      sequelize,
      modelName: "ReportAr",
    }
  );
  return ReportAr;
};
