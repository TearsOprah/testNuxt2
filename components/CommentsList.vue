<template>

  <table class="comments-table">
    <thead>
    <tr>
      <th @click="sortById">ID</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="comment in comments" :key="comment.id" @click="goToComment(comment.id)">
      <td>{{ comment.id }}</td>
      <td>{{ comment.name }}</td>
      <td>{{ comment.email }}</td>
    </tr>
    </tbody>
  </table>

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
    sortById() {
      this.$emit('sort-by-id')
    }
  },
};
</script>

<style>

.comments-list {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  list-style-type: none;
}

</style>
