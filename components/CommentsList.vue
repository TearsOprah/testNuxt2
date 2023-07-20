<template>
  <ul class="comments__list">
    <li class="comments__list-item" v-for="comment in comments" :key="comment.id" @click="goToComment(comment.id)">
      <p>{{ comment.name }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToComment(commentId) {
      this.$router.push(`/comments/${commentId}`);
    },
  },
};
</script>
