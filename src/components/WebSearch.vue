<template>
  <div class="container">
    <h1
      class="title">
      Web Search
    </h1>
    <div 
      class="article-box">
      <div 
        class="article"
        v-for="article in articles" 
        :key="article">
        <div>
          <img 
            :src="article.image" 
            :alt="article.title" 
            :title="article.title" />
          <a :href="article.link">
            <b class="article-title">{{ article.title }}</b>
            <p class="article-snippet">{{ article.snippet }}</p>
          </a>
        </div>
      </div>
    </div>
    <button 
      @click="getResult"
      class="article-btn">
      get result
    </button>
  </div>
</template>
<script>
import axios from 'axios'

  export default {
    name: 'WebSearch',
    data() {
      return {
        showSearchResult: false,
        articles: [
          // {
          //   title: '',
          //   snippet: '',
          //   link: '',
          //   image_url: ''
          // }
        ]
      }
    },
    methods: {
      getResult() {
        this.showSearchResult = true
        const title = this.theMovie.Title
        const APIKEY = 'AIzaSyD1fS9wdehhspvTmKimSRlRwxdnr-ywKLw'
        const apiUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${APIKEY}&cx=07986711742b84d6e&q=${title}`
        axios.get(apiUrl) 
        .then((response) => {
          const items = response.data.items
          console.log(items)
          for(let i = 0; i < items.length; i++) {
            const images = items[i].pagemap.cse_thumbnail
            for(let j = 0; j < images.length; i++) {
              const article = {
                title: items[i].title,
                snippet: items[i].snippet,
                link: items[i].link,
                image: items[i].pagemap.cse_thumbnail[j].src
              }
              console.log(article.image)
              this.articles.push(article)
            }

          }
          // console.log(response.data.items)
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    computed: {
      theMovie() {
        return this.$store.state.movie.theMovie
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../scss/main.scss";
  .container {
    width: 100%;
    margin: 0 auto;
    .title { 
      font-size: 30px;
      text-align: center;
      font-family: "Oswald", sans-serif;
      margin: 20px 0;
    }
    .article-box {
      margin: 40px 0;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .article {
        width: 200px;
        height: 200px * (4/2);
        margin: 10px 20px;
        overflow: hidden;
        img {
          width: 95%;
          height: 200px;
        }
        a {
          margin-top: 15px;
          .article-title {
            text-decoration: none;
            font-size: 14px;
            transition: all .1s;
            &:hover {
              color: $primary;
            }
          }
          .article-snippet {
            text-decoration: none;
            font-size: 12px;
            transition: all .1s;
            &:hover {
            color: $primary;
            }
          }
        }
      }
    } 
    .article-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 17px;
      font-family: "Oswald", sans-serif;
      color: $white;
      background-color: $primary;
      border: 1px solid $white;
      border-radius: 6px;
      width: 120px;
      height: 50px;
      margin: 0 auto;
    }
  }
</style>