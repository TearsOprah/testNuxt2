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

<style>

.comment {
  padding: 30px;
  background-color: white;
  border-radius: 10px;
}

</style>
