<template>

  <table class="comments-table">
    <thead>
    <tr>
      <th class="sortable-column column-title" @click="sortById">
        ID
        <span v-if="store.sortOrder === 'asc'" class="sort-icon">▲</span>
        <span v-else class="sort-icon">▼</span>
      </th>
      <th class="column-title">Name</th>
      <th class="column-title">Email</th>
    </tr>
    </thead>
    <tbody>
    <tr class="comment-row" v-for="comment in comments" :key="comment.id" @click="goToComment(comment.id)">
      <td class="comment-cell">{{ comment.id }}</td>
      <td class="comment-cell">{{ comment.name }}</td>
      <td class="comment-cell">{{ comment.email }}</td>
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
.comments-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.column-title {
  padding: 10px;
}

.comment-cell {
  padding: 10px;
  border: 1px solid #C5C6EF;
  word-break: break-all;
}

.sortable-column {
  cursor: pointer;
}

.sort-icon {
  margin-left: 5px;
}

.comment-row {
  transition: all ease .5s;
}

.comment-row:hover {
  background-color: #C5C6EF;
  cursor: pointer;
}

</style>

