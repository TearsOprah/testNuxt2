<template>
  <ul class="comments-list">
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </ul>
</template>

<script>
import Comment from "@/components/Comment.vue";
export default {
  components: {
    Comment,
  },
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
