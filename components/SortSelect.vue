<template>
  <div>
    <label for="sortSelect">Сортировать по:</label>
    <select id="sortSelect" v-model="sortOrder" @change="onSortOrderChange">
      <option value="asc">По возрастанию</option>
      <option value="desc">По убыванию</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    sortOrder: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
  methods: {
    onSortOrderChange() {
      this.$emit('sort-order-change', this.sortOrder);
    },
  },
};
</script>
