<template>
    <div class="article-page">

        <div class="banner">
            <div class="container">

            <h1>{{ article.title }}</h1>

            <article-meta 
                @deleteArticle="deleteArticle" 
                @clickFavorited="clickFavorited" 
                @setFollow="setFollow"
                :article="article" />
            

            </div>
        </div>

        <div class="container page">

            <div class="row article-content">
                <div class="col-md-12" v-html="article.body">
                </div>
            </div>

            <hr />

            <div class="article-actions">
                <article-meta 
                    @deleteArticle="deleteArticle" 
                    @clickFavorited="clickFavorited" 
                    @setFollow="setFollow"
                    :article="article" />
            </div>

            <div class="row">

                <div class="col-xs-12 col-md-8 offset-md-2">

                    <article-comments :article="article" />
                    
                </div>

            </div>
        </div>


    </div>
</template>

<script>
import { getArticle, deleteArticles, addFavorite, deleteFavorite, getFollow, deleteFollow } from '@/api/article.js'
import MarkdownIt from 'markdown-it'
import articleMeta from './components/article-meta.vue'
import articleComments from './components/article-comments.vue'

export default {
    components: { articleMeta, articleComments },
    name: 'ArticleIndex',
    async asyncData ({ params }) {
        /**
         * 文章内容处理
        */
        const { data } = await getArticle(params.slug)
        const { article } = data
        const md = new MarkdownIt()
        article.body = md.render(article.body)
        console.log(article)
        return {
            article
        }
    },
    methods: {
        async deleteArticle () {
            let data = await deleteArticles(this.article.slug)
            console.log(data)
            this.$router.push({
                name: 'home',
                query: {
                    tab: 'your_feed'
                }
            })
        },
        async clickFavorited () {
            if (this.article.favorited) {
                const { data } = await deleteFavorite(this.article.slug)
                const { article } = data
                this.article = article
            } else {
                const { data } = await addFavorite(this.article.slug)
                const { article } = data
                this.article = article
            }
        },
        async setFollow () {
            if (!this.article.author.following) {
                await getFollow(this.article.author.username)
            } else {
                await deleteFollow(this.article.author.username)
            }
            this.article.author.following = !this.article.author.following
        },
        
    },
    head () {
        return {
            title: `${this.article.title} - RealWorld`,
            meta: [
                { 
                    hid: 'description', 
                    name: 'description', 
                    content: this.article.description
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>