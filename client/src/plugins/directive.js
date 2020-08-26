import Vue from "vue";
import config from "@/config/config";

Vue.directive("can", {
  inserted(el, binding) {
    var currentUser = $cookies.get("dataUser");
    if (currentUser.roleId === 4 && currentUser.roleId === binding.value) {
      el.parentNode.removeChild(el);
    }
  }
});

Vue.directive("check-position", {
  inserted(el, binding) {

    var currentUser = $cookies.get("dataUser");
    var employeeInfo = currentUser.employee;

    if (!binding.value) {
      return;
    }

    if (currentUser.roleId === config.roles.GUEST || currentUser.roleId === config.roles.SUPER_ADMIN) {
      return;
    }

    if (employeeInfo.positionId !== binding.value) {
      el.parentNode.removeChild(el);
    }
  }
});

export default {};
