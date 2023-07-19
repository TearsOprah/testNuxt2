<template>
  <div>
    <h1>Тестовое задание</h1>

    <label for="sortSelect">Сортировать по:</label>
    <select id="sortSelect" v-model="sortOrder" @change="onSortOrderChange">
      <option value="asc">По возрастанию</option>
      <option value="desc">По убыванию</option>
    </select>

    <ul>
      <li v-for="comment in comments" :key="comment.id" @click="goToComment(comment.id)">
        <p>{{ comment.name }}</p>
      </li>
    </ul>

    <button @click="prevPage" :disabled="currentPage === 1">Предыдущая</button>
    <button @click="nextPage" :disabled="comments.length < 10">Следующая</button>

  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      comments: [],
      sortOrder: 'asc',
      currentPage: 1,
      perPage: 10,
    };
  },

  async created() {
    await this.fetchComments(); // вызываем метод при создании компонента
  },

  methods: {

    goToComment(commentId) {
      this.$router.push(`/comments/${commentId}`);
    },

    async fetchComments() {
      try {
        this.comments = await this.$axios.$get(`comments?_sort=id&_order=${this.sortOrder}&_page=${this.currentPage}&_limit=${this.perPage}`);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        this.comments = [];
      }
    },

    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchComments();
      }
    },

    async nextPage() {
      this.currentPage++;
      await this.fetchComments();
    },

    onSortOrderChange() {
      this.currentPage = 1; // сбросить текущую страницу на 1 при изменении фильтра
      this.fetchComments();
    },
  },
};
</script>
