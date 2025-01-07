const { Op, where } = require("sequelize");
const { Announcement } = require("../models");

const fetchAnnouncement = async ({ department }) => {
  try {
    const getNotif = await Announcement.findAll({
      where: {
        department: { [Op.in]: department },
      },
    });
    if (getNotif.length === 0) {
      return {
        message: "no Announcement Available",
        data: "no Announcement available",
      };
    }
    return {
      message: "success retrieving of Announcement",
      data: getNotif,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};

const createNotif = async ({ title, description, department }) => {
  try {
    const createNotification = await Announcement.create({
      title,
      description,
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
    const checkExist = await Announcement.findOne({
      where: {
        id,
      },
    });
    if (!checkExist) throw new Error("no notif id found");

    const deleteNotif = await Announcement.destroy({
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
const updateNotif = async ({ id, title, description, department }) => {
  try {
    const checkExist = await Announcement.findByPk(id);
    if (!checkExist) throw new Error("no id found");

    const toUpdate = await Announcement.update(
      {
        title,
        description,
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
