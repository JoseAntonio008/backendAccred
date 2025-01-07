const { Op, where } = require("sequelize");
const { Notifications } = require("../models");

const fetchNotifications = async ({ department }) => {
  try {
    const getNotif = await Notifications.findAll({
      where: {
        department: { [Op.in]: department },
      },
    });
    if (getNotif.length === 0) {
      return {
        message: "no Notifications Available",
        data: "no Notifications available",
      };
    }
    return {
      message: "success retrieving of notifications",
      data: getNotif,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};

const createNotif = async ({ title, message, department }) => {
  try {
    const createNotification = await Notifications.create({
      title,
      message,
      department,
    });
    return {
      message: "success creation",
      data: createNotification,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};

const deleteNotif = async ({ id }) => {
  try {
    const checkExist = await Notifications.findOne({
      where: {
        id,
      },
    });
    if (!checkExist) throw new Error("no notif id found");

    const deleteNotif = await Notifications.destroy({
      where: {
        id: id,
      },
    });
    return {
      message: "notif successfully deleted",
      data: deleteNotif,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const updateNotif = async ({ id, title, message, department }) => {
  try {
    const checkExist = await Notifications.findByPk(id);
    if (!checkExist) throw new Error("no id found");

    const toUpdate = await Notifications.update(
      {
        title,
        message,
        department,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return {
      message: "success update",
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
module.exports = {
  fetchNotifications,
  deleteNotif,
  createNotif,
  updateNotif,
};
