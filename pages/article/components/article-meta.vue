<template>
    <div class="article-meta">
        <nuxt-link :to="{
            name: 'profile',
            params: {
                username: article.author.username
            }
        }">
            <img :src="article.author.image" />
        </nuxt-link>
         <div class="info">
             <nuxt-link class="author" :to="{
                name: 'profile',
                params: {
                    username: article.author.username
                }
            }">
                {{ article.author.username }}
            </nuxt-link>
            <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
         </div>
         <span v-if="user && user.username === article.author.username" class="ng-scope">
            <nuxt-link 
                class="btn btn-outline-secondary btn-sm"
                :to="{
                    name: 'editor',
                    params: {
                        slug: article.slug
                    }
                }">
                <i class="ion-edit"></i> Edit Article
            </nuxt-link>
            <button @click="_deleteArticle" class="btn btn-outline-danger btn-sm">
                <i class="ion-trash-a"></i> Delete Article
            </button>
        </span>
         <template v-else >
            <button class="btn btn-sm btn-outline-secondary"
                @click="_setFollow"
                :class="{ active: article.author.following }">
                <i class="ion-plus-round"></i>
                &nbsp; {{ getFllow }} <span class="counter"></span>
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary"
                @click="_setFavorited"
                :class="{ active: article.favorited }">
                <i class="ion-heart"></i>
                &nbsp;
                {{ getFavorite }}  <span class="counter">({{ article.favoritesCount }})</span>
            </button>
         </template>

        

     </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            default: {}
        }
    },
    computed: {
        ...mapState(['user']),
        getFavorite () {
            if (this.article.favorited) {
                return 'Unfavorite Article'
            } else {
                return 'Favorite Post'
            }
        },
        getFllow () {
            if (this.article.author.following) {
                return `Unfollow ${this.article.author.username}`
            } else {
                return `Follow ${this.article.author.username}`
            }
        }
    },
    methods: {
        _setFavorited () {
            this.$emit('clickFavorited')
        },
        _deleteArticle () {
            this.$emit('deleteArticle')
        },
        _setFollow () {
            this.$emit('setFollow')
        }
    }
    
}
</script>

<style scoped>

</style>