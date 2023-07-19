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
  }
}
</script>
