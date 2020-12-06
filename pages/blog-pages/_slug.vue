<template>
  <div>
    <app-masthead></app-masthead>
    <div class="page">
      <main>
          <h1>{{ page.title.rendered }}</h1>
          <small>{{ page.date | dateformat }}</small>
          <div v-html="page.content.rendered"></div>
      </main>
    </div>
  </div>
</template>

<script>
import AppMasthead from "@/components/AppMasthead.vue";

export default {
  data() {
    return {
      slug: this.$route.params.slug
    };
  },
  computed: {
    pages() {
      return this.$store.state.pages;
    },
    page() {
      return this.pages.find(el => el.slug === this.slug);
    }
  },
  created() {
    this.$store.dispatch("getPages");
  },
};
</script>
<style>
.page {
  width: 50vw;
  margin: 0 auto;
}

h1 {
  text-align: left;
}
</style>
