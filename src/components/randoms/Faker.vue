<template>
  <Badge v-if="is_badge" :text="value" :background="bagde_background" />
  <span v-else>{{ value }}</span>
</template>
<script setup>
import { onMounted, ref } from "vue-demi";
import "moment";
let value = ref("");
let bagde_background = ref("");
let is_badge = ref(false);
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  cutText: {
    type: Number,
    default: -1,
  },
});
const names = [
  "Hugo",
  "Martín",
  "Lucas",
  "Mateo",
  "Leo",
  "Daniel",
  "Alejandro",
  "Pablo",
  "Manuel",
  "Álvaro",
  "Adrián",
  "David",
  "Mario",
  "Enzo",
  "Diego",
  "Marcos",
  "Izan",
  "Javier",
  "Marco",
  "Álex",
  "Bruno",
  "Oliver",
  "Miguel",
  "Thiago",
  "Antonio",
];
const last_names = [
  "Rodriguez",
  "Martinez",
  "Garcia",
  "Gomez",
  "Lopez",
  "Gonzalez",
  "Hernandez",
  "Sanchez",
  "Perez",
  "Ramirez",
  "Diaz",
  "Torres",
  "Muñoz",
  "Rojas",
  "Moreno",
  "Vargas",
  "Ortiz",
  "Jimenez",
  "Castro",
  "Gutierrez",
  "Alvarez",
  "Valencia",
  "Ruiz",
  "Suarez",
  "Herrera",
];
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const cutText = (text, max) => {
  let result = text.substring(0, max);

  if (text.length > max) result += "...";
  return result;
};
onMounted(() => {
  switch (props.type) {
    case "name": {
      let text = names[rand(0, names.length - 1)];

      value.value =
        props.cutText == -1 ? text : cutText(text + "", props.cutText);
      break;
    }
    case "last_name": {
      let text = last_names[rand(0, last_names.length - 1)];
      value.value =
        props.cutText == -1 ? text : cutText(text + "", props.cutText);
      break;
    }
    case "full_name": {
      let text =
        names[rand(0, names.length - 1)] +
        " " +
        last_names[rand(0, last_names.length - 1)];

      value.value =
        props.cutText == -1 ? text : cutText(text + "", props.cutText);
      break;
    }
    case "email": {
      let text = (
        names[rand(0, names.length - 1)] +
        last_names[rand(0, last_names.length - 1)] +
        "." +
        rand(1000, 9999) +
        "@gmail.com"
      ).toLowerCase();
      value.value =
        props.cutText == -1 ? text : cutText(text + "", props.cutText);
      break;
    }
    case "status": {
      is_badge.value = true;
      let _rand = rand(0, 1);
      if (_rand % 2 == 0) {
        value.value = "Activo";
        bagde_background.value = "green";
      } else {
        value.value = "Inactivo";
        bagde_background.value = "red";
      }
      break;
    }
    case "number": {
      let text = rand(10000000, 99999999);
      value.value =
        props.cutText == -1 ? text : cutText(text + "", props.cutText);
      break;
    }
    case "date": {
      let text = moment().format("YYYY MM DD, hh:mm:ss");
      value.value =
        props.cutText == -1 ? text : cutText(text + "", props.cutText);
      break;
    }
    case "code": {
      let code = "";
      for (let i = 0; i < 8; i++) {
        let helper = rand(0, 1);
        if (helper % 2 == 0) {
          code += String.fromCharCode(rand(97, 122));
        } else {
          code += rand(0, 9);
        }
      }
      value.value =
        props.cutText == -1 ? code : cutText(code + "", props.cutText);
      break;
    }
    case "phone": {
      let phone = "+";
      let helper = rand(0, 1);
      phone +=
        rand(51, 58) +
        " " +
        rand(100, 999) +
        " " +
        rand(100, 999) +
        " " +
        rand(1000, 9999);

      value.value =
        props.cutText == -1 ? phone : cutText(phone + "", props.cutText);
      break;
    }
    case "text": {
      let text =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum sed enim faucibus imperdiet. Nulla metus est, semper sed placerat in, accumsan tincidunt tellus. Phasellus urna erat, auctor in commodo.";
      value.value =
        props.cutText == -1 ? text : cutText(text + "", props.cutText);
      break;
    }
    case "badge": {
      is_badge.value = true;
      value.value =
        props.cutText == -1
          ? props.text
          : cutText(props.text + "", props.cutText);
      bagde_background.value = "blue";
      break;
    }
    case "url": {
      let text =
        "https://www." +
        names[rand(0, names.length - 1)].toLowerCase() +
        rand(1000, 9999) +
        ".com";
      value.value =
        props.cutText == -1 ? text : cutText(text + "", props.cutText);
      break;
    }
  }
});
</script>

<style>
</style>



