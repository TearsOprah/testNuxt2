<template>
  <div>
    <h1>Тестовое задание</h1>

    <label for="sortSelect">Сортировать по:</label>
    <select id="sortSelect" v-model="sortOrder" @change="fetchComments">
      <option value="asc">По возрастанию</option>
      <option value="desc">По убыванию</option>
    </select>

    <ul>
      <li v-for="comment in comments" :key="comment.id" @click="goToComment(comment.id)">
        <p>{{ comment.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      comments: [],
      sortOrder: 'asc',
    }
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('comments');
      return { comments: response };
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return { comments: [] };
    }
  },
  methods: {
    goToComment(commentId) {
      this.$router.push(`/comments/${commentId}`);
    },
    async fetchComments() {
      try {
        const response = await this.$axios.$get(`comments?_sort=id&_order=${this.sortOrder}`);
        this.comments = response;
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        this.comments = [];
      }
    },
  }
}
</script>
