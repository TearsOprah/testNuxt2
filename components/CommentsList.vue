<template>

  <table class="comments-table">
    <thead>
    <tr>
      <th @click="sortById">
        ID
        <span v-if="store.sortOrder === 'asc'">▲</span>
        <span v-else>▼</span>
      </th>
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
import store from "@/store";

export default {
  computed: {
    store() {
      return store
    }
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

</style>
