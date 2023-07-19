<template>
  <div>
    <h1>Тестовое задание</h1>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
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
    }
  },
  async fetch() {
    try {
      this.comments = await this.$axios.$get('comments');
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      this.comments = [];
    }
  },
  methods: {

  }
}
</script>
