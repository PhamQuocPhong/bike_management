export default {
  defaultString(val) {
    return !val ? "" : val;
  },

  defaultNumber(val) {
    return !val ? 0 : parseInt(val);
  },

  colorStatusBike(value) {
    switch (value) {
      case "new":
        return "red";

      case "normal":
        return "green";

      case "old":
        return "orange";
      default:
        return "grey";
    }
  },

  colorStatusTransaction(item) {
    if (item.status === "completed") {
      return "blue";
    }

    if (typeof item.vehicleTests !== "undefined") {
      if (
        Object.keys(item.vehicleTests).length === 0 ||
        item.vehicleTests.some(
          obj => obj.bikeStatus == null || obj.bikeStatus === "waiting"
        )
      ) {
        item.status = "waiting";
      } else {
        item.status = "confirm";
      }
    }

    switch (item.status) {
      case "waiting":
        return "grey";

      case "confirm":
        return "green";

      case "cancel":
        return "red";
    }
  },

  colorStatusContact(val) {
    switch (val) {
      case 1:
        return "blue";

      default:
        return "grey";
    }
  },

  colorStatusFixing(val) {
    switch (val) {
      case 1:
        return "blue";

      default:
        return "grey";
    }
  },

  colorStatusVehicle(val) {
    switch (val) {
      case 0:
        return "blue";

      default:
        return "grey";
    }
  },

  indexColumn(item, arrItem) {
    return arrItem.indexOf(item) + 1;
  },

  formatDate(date) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  },

  parseDate(date) {
    if (!date) return null;

    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  },

  convertTzTo(date){
    var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

    return [year, month, day].join('/')
  },

  // 2 color (condtion === 1 ? blue : grey )
  colorStatusFinish(condition) {
    return condition === 1 ? "blue" : "grey";
  },

  totalItem(arr, key) {
    return arr.reduce((acc, item) => {
      return acc + item[key];
    }, 0);
  },

  showVehicleType(vehicleType) {
    if (!vehicleType) {
      return;
    }

    switch (vehicleType.id) {
      case 1:
        return "mdi-moped";

      case 2:
        return "mdi-car-side";
    }
  },

  calcPagination(currentPage, itemsPerPage){
    var offset;
    if (currentPage == 1) {
        offset = 0;
    } else {
        offset = (currentPage - 1) * itemsPerPage;
    }
    return offset
  },

  showIndex(index, page, itemsPerPage) {
    index++
    if(page === 1){
      return index
    }

    return index + ( (page - 1) * itemsPerPage)
  }

};
