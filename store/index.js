const siteURL = "https://publishing-project.rivendellweb.net"

export const state = () => ({
  posts: [],
  tags: [],
  pages: [],
})

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts
  },
  updatePages: (state, pages) => {
    state.pages = pages
  },
  updateTags: (state, tags) => {
    state.tags = tags
  }
}

export const actions = {
  async getPosts({ state, commit, dispatch }) {
    if (state.posts.length) return

    try {
      let posts = await fetch(
        `${siteURL}/wp-json/wp/v2/posts?page=1&per_page=10`
      ).then(res => res.json())

      posts = posts
        // keep only published posts
        // NOTE: Moved the logic of empty post nav links to blog/_slug.vue
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, excerpt, date, tags, content, previous, next }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content,
          previous,
          next,
        }))
      commit("updatePosts", posts)
    } catch (err) {
      console.log(err)
    }
  },
  async getPages({ state, commit, dispatch }) {
    if (state.pages.length) return
  
    try {
      let pages = await fetch(
        `${siteURL}/wp-json/wp/v2/pages?page=1&per_page=10`
      ).then(res => res.json())
  
      pages = pages
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, excerpt, date, tags, content }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content
        }))
      console.log(pages[0]);
      commit("updatePages", pages)
    } catch (err) {
      console.log(err)
    }
  },
  async getTags({ state, commit }) {
    if (state.tags.length) return

    let allTags = state.posts.reduce((acc, item) => {
      return acc.concat(item.tags)
    }, [])
    allTags = allTags.join()

    try {
      let tags = await fetch(
        `${siteURL}/wp-json/wp/v2/tags?page=1&per_page=40&include=${allTags}`
      ).then(res => res.json())

      tags = tags.map(({ id, name }) => ({
        id,
        name
      }))

      commit("updateTags", tags)
    } catch (err) {
      console.log(err)
    }
  }
}
