<template>
  <div>
    <button class="primary-button" @click="prevPage" :disabled="currentPage === 1">Предыдущая</button>
    <button class="primary-button" @click="nextPage" :disabled="comments.length < 10">Следующая</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    hasMoreComments: {
      type: Boolean,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
  },
  methods: {
    prevPage() {
      this.$emit('prev-page');
    },
    nextPage() {
      this.$emit('next-page');
    },
  },
};
</script>
