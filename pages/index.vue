<template>
  <div class="comments">
    <!-- Заголовок страницы -->
    <h1 class="comments__title">Тестовое задание</h1>

    <!-- Форма выбора сортировки -->
    <SortSelect v-model="store.sortOrder" @sort-order-change="onSortOrderChange" />

    <!-- Список комментариев -->
    <CommentsList :comments="comments" />

    <!-- Навигация по станицам-->
    <Pagination :currentPage="store.currentPage" :hasMoreComments="comments.length >= 10" :comments="comments"
                @prev-page="prevPage" @next-page="nextPage" />
  </div>
</template>

<script>
import store from '@/store/index.js';
import Pagination from '../components/Pagination.vue';
import CommentsList from "@/components/CommentsList.vue";
import SortSelect from "@/components/SortSelect.vue";
export default {
  name: 'IndexPage',
  components: {
    Pagination,
    CommentsList,
    SortSelect,
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
