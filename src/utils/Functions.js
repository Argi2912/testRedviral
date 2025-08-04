import useNotyf from "@/composables/useNotyf.js";
export const parseToFormData = (fields) => {
  let form_data = new FormData();

  for (let i in fields) {
    form_data.append(i, fields[i]);
  }
  return form_data;
};

export const objectToQuery = (object) => {
  let query = "?";
  for (let i in object) {
    query += i + "=" + object[i] + "&";
  }
  return query;
};

export const extractFile = (id) => {
  let _input_file = document.querySelector("#" + id);
  return _input_file && _input_file.files ? _input_file.files[0] : {};
};

export const changeArrayItemPosition = (
  last_index,
  new_index,
  array,
  callBack
) => {
  let aux_item = array[last_index];
  let aux_array = [...array];
  aux_array.splice(last_index, 1);
  aux_array.splice(new_index, 0, aux_item);
  if (callBack) callBack();
  return aux_array;
};
export const fadeIn = (element_to_show) => {
  element_to_show.style.opacity = 0;
  element_to_show.style.display = "block";

  const show_interval = setInterval(() => {
    element_to_show.style.opacity = +element_to_show.style.opacity + 0.1;

    if (element_to_show.style.opacity == 1) {
      clearInterval(show_interval);
    }
  }, 20);
};
export const fadeOut = (element_to_hide) => {
  element_to_hide.style.opacity = 1;
  const hide_interval = setInterval(() => {
    element_to_hide.style.opacity -= 0.1;
    if (element_to_hide.style.opacity == 0) {
      element_to_hide.style.display = "none";
      clearInterval(hide_interval);
    }
  }, 20);
};
export const fade = (hide, show, callBack) => {
  let element_to_hide = document.querySelector(hide);
  let element_to_show = document.querySelector(show);
  fadeOut(element_to_hide);
  setTimeout(() => {
    fadeIn(element_to_show);
  }, 200);
  setTimeout(() => {
    if (callBack != undefined) callBack();
  }, 400);
};

export const initials = (first_word, last_word) => {
  let first;
  if (first_word) first = first_word[0].toUpperCase();
  else first = "[]";

  let last;
  if (last_word) last = last_word[0].toUpperCase();
  else last = "[]";

  return first + last;
};

export const cutText = (text, max) => {
  if (typeof text != "string") return "invalid data";
  if (text) {
    let result = text.substring(0, max);

    if (text.length > max) result += "...";
    return result;
  } else {
    return "";
  }
};

export const validateRequestStatus = (response) => {
  if (response.data.status != "Success") {
    let notyf = useNotyf();
    notyf.error(response.data.message);
    throw (
      "AppServices has been stoped. Server Message: " + response.data.message
    );
  }
  return response;
};

export const getApiUrl = () => {
  return import.meta.env.DEV
    ? import.meta.env.VITE_LOCALHOST
    : import.meta.env.VITE_API_URL;
};

const currency_langages = {
  COP: "es-CO",
};
export const numberToCurrency = (currency, amount) => {
  const NF = new Intl.NumberFormat(currency_langages[currency], {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  });
  return NF.format(amount);
};
//Begin::front core to work with Miguel

export const parseDate = (date) => {
  return date.split(".")[0].replace("T", " ");
};

export const validatePermission = (tag, user_permissions) => {
  let _has_permission = user_permissions.find((permission) => {
    return permission.tag == tag;
  });
  return _has_permission != undefined;
};
export const validateManyPermissions = (tags, user_permissions) => {
  let _has_permission = user_permissions.find((permission) => {
    for (let i = 0; i < tags.length; i++) {
      if (permission.tag == tags[i]) return true;
    }
    return false;
  });
  return _has_permission != undefined;
};

export const validatePermissionByGroup = (group, user_permissions) => {
  let has_permission = user_permissions.find((permission) => {
    return permission.group == group;
  });
  return has_permission != undefined;
};

export const loadCurrentUserPermissions = async (auth) => {
  await auth.loadMyRole();
};

//End::front core to work with Miguel
//Begin::Keen bootstrap functions
export const initializeTooltips = () => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
};
//End::Keen bootstrap functions
