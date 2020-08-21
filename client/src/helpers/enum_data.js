export default {
  progressTransaction: {
    default: "waiting",
    list: ["waiting", "confirm", "completed", "cancel"]
  },

  progressVehicleBuy: {
    default: null,

    list: ["new", "normal", "old", "waiting"]
  }
};
