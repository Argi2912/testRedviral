<template>
  <div class="selectpicker-container">
    <div class="selectpicker-input">
      <input
        type="text"
        v-model="searchQuery"
        @focus="showDropdown = true"
        @input="filterOptions"
        @keydown.enter="selectOption(filteredOptions[0])"
        :placeholder="placeholder"
      />
      <button
        v-if="selectedOption"
        class="btn-close"
        @click="resetSelection"
      ></button>
    </div>
    <ul v-show="showDropdown" class="selectpicker-dropdown">
      <li
        v-for="option in filteredOptions"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.text }}
        <button
          class="btn-close"
          @click.stop="resetSelection(option)"
          v-if="option === selectedOption"
        ></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Seleccione una opción",
    },
  },
  data() {
    return {
      searchQuery: "",
      filteredOptions: this.options,
      selectedOption: null,
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    filterOptions() {
      this.filteredOptions = this.options.filter((option) =>
        option.text.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      if (this.filteredOptions.length > 0) {
        this.showDropdown = true;
      } else {
        this.showDropdown = false;
      }
    },
    selectOption(option) {
      this.selectedOption = option;
      this.searchQuery = option.text;
      this.showDropdown = false;
    },
    resetSelection() {
      this.selectedOption = null;
      this.searchQuery = "";
      this.showDropdown = false;
    },
  },
};
</script>

<style>
.selectpicker-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.selectpicker-input {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
  width: 100%;
}

.selectpicker-input input {
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
}
.selectpicker-input button {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23b6c2c9' viewBox='0 0 16 16'%3e%3cpath d='M8 7.5L1.5 1 0 2.5l6.5 6.5L0 15 1.5 16.5l6.5-6.5 6.5 6.5 1.5-1.5-6.5-6.5 6.5-6.5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center right 0.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  display: none;
}

.selectpicker-input button:hover {
  background-color: #f0f0f0;
}

.selectpicker-input input:focus + button {
  display: block;
}

.selectpicker-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
}

.selectpicker-dropdown li {
  padding: 0.25rem 0.75rem;
  cursor: pointer;
}

.selectpicker-dropdown li:hover {
  background-color: #f0f0f0;
}

.selectpicker-dropdown li:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>
