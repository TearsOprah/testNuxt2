<template>
  <div class="comments">
    <!-- Заголовок страницы -->
    <h1 class="comments__title">Тестовое задание</h1>

    <!-- Форма выбора сортировки -->
    <label for="sortSelect">Сортировать по:</label>
    <select id="sortSelect" v-model="store.sortOrder" @change="onSortOrderChange">
      <option value="asc">По возрастанию</option>
      <option value="desc">По убыванию</option>
    </select>

    <!-- Список комментариев -->
    <ul class="comments__list">
      <li class="comments__list-item" v-for="comment in comments" :key="comment.id" @click="goToComment(comment.id)">
        <p>{{ comment.name }}</p>
      </li>
    </ul>

    <!-- Навигация по станицам-->
    <Pagination :currentPage="store.currentPage" :hasMoreComments="comments.length >= 10" :comments="comments"
                @prev-page="prevPage" @next-page="nextPage" />
  </div>
</template>

<script>
import store from '@/store/index.js';
import Pagination from '../components/Pagination.vue';
export default {
  name: 'IndexPage',
  components: {
    Pagination,
  },
  computed: {
    store() {
      return store
    }
  },
  data() {
    return {
      comments: [],
      perPage: 10,
    };
  },

  async created() {
    await this.fetchComments(); // вызываем метод при создании компонента
  },

  methods: {
    // Переход к деталям комментария по его ID
    goToComment(commentId) {
      this.$router.push(`/comments/${commentId}`);
    },

    // Загрузка комментариев с сервера
    async fetchComments() {
      try {
        this.comments = await this.$axios.$get(`comments?_sort=id&_order=${this.store.sortOrder}&_page=${this.store.currentPage}&_limit=${this.perPage}`);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        this.comments = [];
      }
    },

    // Переход на предыдущую страницу комментариев
    async prevPage() {
      if (this.store.currentPage > 1) {
        this.store.currentPage--;
        await this.fetchComments();
      }
    },

    // Переход на следующую страницу комментариев
    async nextPage() {
      this.store.currentPage++;
      await this.fetchComments();
    },

    // Обработка изменения порядка сортировки
    onSortOrderChange() {
      this.store.currentPage = 1; // сбросить текущую страницу на 1 при изменении фильтра
      this.fetchComments();
    },
  },
};
</script>

<style>

</style>
