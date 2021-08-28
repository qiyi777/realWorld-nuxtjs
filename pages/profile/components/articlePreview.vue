<template>
    <div class="article-preview">
        <div class="article-meta">
            <a href=""><img :src="item.author.image" /></a>
            <div class="info">
                <a href="" class="author">{{ item.author.username }}</a>
                <span class="date">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button @click="_clickFavor" 
                class="btn btn-outline-primary btn-sm pull-xs-right" :class="{'active': item.favorited}">
                <i class="ion-heart"></i> {{ item.favoritesCount }}
            </button>
        </div>
        <nuxt-link class="preview-link" 
            :to="{
                name: 'article',
                params: {
                    slug: item.slug
                }
            }">
            <h1>{{ item.title }}</h1>
            <p>{{ item.body }}</p>
            <span>Read more...</span>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: []
        },
        index: {
            type: Number,
            default: 0
        }
    },
    methods: {
        _clickFavor () {
            this.$emit('clickFavor', this.item, this.index)
        }
    }
}
</script>

<style scoped>

</style>