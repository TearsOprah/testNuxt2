<template>
  <li class="comment" @click="goToComment">
    <p>{{ comment.name }}</p>
  </li>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToComment() {
      this.$router.push(`/comments/${this.comment.id}`);
    },
  },
};
</script>
