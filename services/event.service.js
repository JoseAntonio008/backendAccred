const { isBefore, format } = require("date-fns");
const { Events } = require("../models");
const { Op } = require("sequelize");

const addEvent = async ({
  title,
  department,
  info,
  venue,
  startDate,
  endDate,
}) => {
  try {
    const formatOptions = "MMMM dd, yyyy hh:mm a";
    let isOverlapping = false;
    console.log("Receive from req:", {
      title,
      department,
      info,
      venue,
      startDate,
      endDate,
    });

    // Parse incoming dates
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    console.log(`startData: ${format(parsedStartDate, formatOptions)}`);
    console.log(`endData: ${format(parsedEndDate, formatOptions)}`);

    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
      throw new Error("Invalid date format for startDate or endDate");
    }

    // Check for overlapping events
    const overlappingEvent = await Events.findOne({
      where: {
        venue, // Same venue
        startDate: {
          [Op.lte]: parsedEndDate, // Existing startDate is before or during the requested endDate
        },
        endDate: {
          [Op.gte]: parsedStartDate, // Existing endDate is after or during the requested startDate
        },
      },
    });

    if (overlappingEvent) {
      const message = `Schedule conflict with Event: ${
        overlappingEvent.title
      } by ${overlappingEvent.department} Start time:${format(
        overlappingEvent.startDate,
        formatOptions
      )} end time:${format(overlappingEvent.endDate, formatOptions)}`;
      throw new Error(message);
    }

    console.log("Saving to DB:", {
      title,
      department,
      info,
      venue,
      startDate,
      endDate,
    });

    // Create new event if no conflicts
    const createEvent = await Events.create({
      title,
      department: department,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      info: info,
      venue,
    });

    return {
      message: "no conflict",
      data: createEvent,
    };
  } catch (error) {
    return {
      message: "Conflict occurred",
      error: error.message,
    };
  }
};
const fetchEvents = async ({ department }) => {
  try {
    const whereCondition =
      department && department.length > 0
        ? { department: { [Op.in]: department } } // Filter by department array
        : {}; // No condition, fetch all
    const checkExist = await Events.findAll({
      where: whereCondition,
    });
    if (checkExist.length == 0) {
      return {
        message: "no event exist",
      };
    }
    return {
      message: "event list retrieved",
      data: checkExist,
    };
  } catch (error) {
    return {
      message: "error occured",
      error: error,
    };
  }
};
const removeEvent = async ({ id }) => {
  try {
    const eventId = await Events.findOne({
      where: {
        id: id,
      },
    });
    if (!eventId) throw new Error("no id found");
    const removeEvent = await Events.destroy({
      where: {
        id: id,
      },
    });
    return {
      message: `id: ${eventId.id},${eventId.title} has been deleted`,
      data: removeEvent,
    };
  } catch (error) {
    return {
      message: "error occured",
      error: error.message,
    };
  }
};

const updateEvent = async ({
  id,
  title,
  department,
  info,
  venue,
  startDate,
  endDate,
}) => {
  try {
    const formatOptions = "MMMM dd, yyyy hh:mm a";
    let isOverlapping = false;
    const toUpdate = await Events.findOne({
      where: {
        id: id,
      },
    });
    if (!toUpdate) throw new Error("no user id match");
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    console.log(`startData: ${format(parsedStartDate, formatOptions)}`);
    console.log(`endData: ${format(parsedEndDate, formatOptions)}`);

    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
      throw new Error("Invalid date format for startDate or endDate");
    }

    // Check for overlapping events
    const overlappingEvent = await Events.findOne({
      where: {
        id: { [Op.ne]: id },
        venue, // Same venue
        startDate: {
          [Op.lte]: parsedEndDate, // Existing startDate is before or during the requested endDate
        },
        endDate: {
          [Op.gte]: parsedStartDate, // Existing endDate is after or during the requested startDate
        },
      },
    });

    if (overlappingEvent) {
      const message = `Schedule conflict with Event: ${
        overlappingEvent.title
      } by ${overlappingEvent.department} Start time:${format(
        overlappingEvent.startDate,
        formatOptions
      )} end time:${format(overlappingEvent.endDate, formatOptions)}`;
      throw new Error(message);
    }

    const updateEvent = await toUpdate.update({
      title: title,
      department: department,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      info: info,
      venue: venue,
    });
    return {
      message: "updated successfully",
      data: updateEvent,
    };
  } catch (error) {
    return {
      message: "error occured",
      error: error.message,
    };
  }
};
module.exports = {
  addEvent,
  fetchEvents,
  removeEvent,
  updateEvent,
};
