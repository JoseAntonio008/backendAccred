const { Op, where } = require("sequelize");
const { Announcement } = require("../models");

const adminAnnouncement = async () => {
  try {
    const getAnnouncement = await Announcement.findAll();
    if (getAnnouncement.length === 0) {
      return {
        message: "no Announcement Available",
        data: "no Announcement available",
      };
    }
    return {
      message: "success retrieving of Announcement",
      data: getAnnouncement,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};

const fetchAnnouncement = async ({ department }) => {
  try {
    const getAnnouncement = await Announcement.findAll({
      where: {
        department: { [Op.in]: department },
      },
    });
    if (getAnnouncement.length === 0) {
      return {
        message: "no Announcement Available",
        data: "no Announcement available",
      };
    }
    return {
      message: "success retrieving of Announcement",
      data: getAnnouncement,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};

const createAnnouncement = async ({ title, description, department }) => {
  try {
    const createAnnouncement = await Announcement.create({
      title,
      description,
      department,
    });
    return {
      message: "success creation",
      data: createAnnouncement,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};

const deleteAnnouncement = async ({ id }) => {
  try {
    const checkExist = await Announcement.findOne({
      where: {
        id,
      },
    });
    if (!checkExist) throw new Error("no Announcement id found");

    const deleteAnnouncement = await Announcement.destroy({
      where: {
        id: id,
      },
    });
    return {
      message: "Announcement successfully deleted",
      data: deleteAnnouncement,
    };
  } catch (error) {
    return {
      message: "error occurred",
      error: error.message,
    };
  }
};
const updateAnnouncement = async ({ id, title, description, department }) => {
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
  adminAnnouncement,
  fetchAnnouncement,
  deleteAnnouncement,
  createAnnouncement,
  updateAnnouncement,
};
