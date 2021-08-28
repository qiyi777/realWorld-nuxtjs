<template>
   <div>
       <div class="card comment-form">
            <div class="card-block">
                <textarea class="form-control" v-model="value" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
                <img :src="user && user.image" class="comment-author-img" />
                <button @click="addComment" class="btn btn-sm btn-primary">
                    Post Comment
                </button>
            </div>
        </div>
        <div class="card" 
            v-for="comment in comments" 
            :key="comment.id">
            <div class="card-block">
                <p class="card-text">{{ comment.body }}</p>
            </div>
            <div class="card-footer">
                <nuxt-link class="comment-author" :to="{
                    name: 'profile',
                    params: {
                        username: comment.author.username
                    }
                }">
                    <img :src="comment.author.image" class="comment-author-img" />
                </nuxt-link>
                &nbsp;
                <nuxt-link class="comment-author" :to="{
                    name: 'profile',
                    params: {
                        username: comment.author.username
                    }
                }">
                    {{ comment.author.username }}
                </nuxt-link>
                <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
                <span class="mod-options" 
                    v-if="comment.author.username === user.username" 
                    @click="deleteClick(comment.id)">
                    <i class="ion-trash-a"></i>
                </span>
            </div>
        </div>
    </div> 
</template>

<script>
import { getComments, getAddComments, deleteComment } from '@/api/article.js'
import { mapState } from 'vuex'
export default {
    name: 'ArticleComments',
    props: {
        article: {
            type: Object,
            default: {},
            required: true
        }
    },
    data () {
        return {
            comments: [],
            value: ''
        }
    },
    computed: {
        ...mapState(['user'])
    },
    async mounted () {
        const { data } = await getComments(this.article.slug)
        this.comments = data.comments
    },
    methods: {
        async addComment () {
            let { data } = await getAddComments(
                this.article.slug, 
                { comment: { body: this.value } }
            )
            this.comments.unshift(data.comment)
            this.value = ''
        },
        async deleteClick (id) {
            let data = await deleteComment (this.article.slug, id)
            if (data.status === 200) {
                this.comments.forEach((item, index) => {
                    if (item.id === id) {
                        this.comments.splice(index, 1)
                    }
                })
            }
        }
    }
}
</script>

<style scoped>

</style>