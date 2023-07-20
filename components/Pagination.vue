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

<style>

.primary-button {
  background: #5357B6;
  color: white;
  padding: 10px;
  border-radius: 8px;
  border: none;
  transition: all .5s ease;
}

.primary-button:hover {
  cursor: pointer;
  opacity: .8;
}

.primary-button:disabled {
  opacity: 0.5;
}

</style>
