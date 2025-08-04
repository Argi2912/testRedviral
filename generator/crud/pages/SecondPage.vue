<template>
  <div>
    <button @click="goToPage('#list')">back</button>
    <pre>{{ store }}</pre>

    <button
      @click="openModal"
      data-bs-toggle="modal"
      data-bs-target="#static-modal"
    >
      modal
    </button>
    <div
      class="modal fade"
      id="static-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticModalLabel">
              {{ __name__(snakeCase)_store.modal_title }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">content</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {use__name__(pascalCase)Store} from "../stores/index.js";
const __name__(snakeCase)_store = use__name__(pascalCase)Store();

const openModal = () => {
  __name__(snakeCase)_store.setModal("moidal_name");
  __name__(snakeCase)_store.setModalTitle("Titulo del modal");
  //__name__(snakeCase)_store.setFormMode("create_update__", "create");
};


const emit = defineEmits(["onDisplayPage"]);
const goToPage = (page) => {
  emit("onDisplayPage", {
    page_to_show: page,
  });
};
</script>
<script>
export default {
  name: "SecondPage",
};
</script>
