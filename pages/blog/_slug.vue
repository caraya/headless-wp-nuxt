<template>
  <main class="post individual">
    <h1>{{ post.title.rendered }}</h1>
    <small class="date">{{ post.date | dateformat }}</small>
    <section v-html="post.content.rendered"></section>
    <div class="footer-nav">
      <div class="nav-item next">
        <p class="next-item-title">
          <strong>Next:</strong>
        </p>
        <p><a :href="post.next.link">{{ post.next.title }}</a></p>
      </div>
      <div class="nav-item previous">
        <p class="previous-item-title">
          <strong>Previous</strong>
        </p>
        <p><a :href="post.previous.link">{{ post.previous.title }}</a></p>
      </div>
    </div>
  </main>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/themes/prism-solarizedlight.css'
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-scss'

export default {
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    post() {
      return this.posts.find(el => el.slug === this.slug);
    }
  },
  data() {
    return {
      slug: this.$route.params.slug
    };
  },
  created() {
    this.$store.dispatch("getPosts");
  },
  mounted() {
    Prism.highlightAll()
  }
};
</script>

<style lang="scss" scoped>
main.post {
  margin: 60px auto 50px;
  max-width: 80vw;
  padding: 0 30px 70px;
}

h1 {
  color: black;
  font-size: 40px;
}

section {
  color: #444;
}

.date {
  text-align: center;
}

.footer-nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-item {
  height: 150px;
  width: 50%;
  border: 1px solid black;
}

.next p {
  align-self: flex-end;
}

</style>