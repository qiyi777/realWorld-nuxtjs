<template>
    <div class="profile-page">

        <div class="user-info">
            <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                    <img :src="user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'" class="user-img" />
                    <h4>{{ user.username }}</h4>
                    <p>
                        {{ user.bio || '' }}
                    </p>
                
                    <nuxt-link v-if="myUser.username === user.username " to="/settings" class="btn btn-sm btn-outline-secondary action-btn">
                        <i class="ion-plus-round"></i>
                        &nbsp;
                        Edit Profile Settings
                    </nuxt-link>
                    <button @click="setFollow" v-else class="btn btn-sm action-btn ng-binding btn-outline-secondary" ng-class="{ 'disabled': $ctrl.isSubmitting,
                                'btn-outline-secondary': !$ctrl.user.following,
                                'btn-secondary': $ctrl.user.following }" ng-click="$ctrl.submit()">
                        <i class="ion-plus-round"></i>
                        &nbsp;
                        {{ getFollowing }}
                    </button>
                </div>

            </div>
            </div>
        </div>

        <div class="container">
            <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                    <li class="nav-item">
                        <div class="nav-link" :class="{'active': tabsName === 'my'}" @click="tabsClick('my')">My Articles</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" :class="{'active': tabsName === 'Favorited'}" @click="tabsClick('Favorited')">Favorited Articles</div>
                    </li>
                </ul>
                </div>
                <template v-if="tabsName === 'my'">
                    
                    <articlePreview 
                        v-for="(item, index) in articles" 
                        :item="item" 
                        :key="item.id" 
                        :index="index"
                        :articles="articles"
                        @clickFavor="clickFavor"
                    />
                </template>

                <template v-if="tabsName === 'Favorited'">

                    <articlePreview 
                        v-for="(item, index) in favorList" 
                        :item="item" 
                        :key="item.id" 
                        :index="index"
                        :articles="articles"
                        @clickFavor="clickFavor"
                    />
                </template>


            </div>

            </div>
        </div>

    </div>
</template>

<script>
import { getProfiles, getMyArticles, addFavorite, deleteFavorite, getFollow, deleteFollow } from '@/api/article.js'
import articlePreview from './components/articlePreview.vue'
export default {
    middleware: 'authenticated',
    name: 'ProfileIndex',
    async asyncData ({ params, store }) {
        //我的个人信息
        let myUser = Object.assign({}, store.state.user)

        let username = params.username
        const info = await getProfiles(params.username)
        const user  = info.data.profile
        
        const param = {
            author: params.username,
            limit: 5,
            offset: 0
        }
        const { data } = await getMyArticles(param)
        const articles = data.articles
        return {
            user,
            articles,
            tabsName: 'my',
            favorList: null,
            username,
            myUser
        }
    },
    computed: {
        getFollowing () {
            console.log(this.user)
            return this.user.following ? 'Unfollow abuox' : 'Follow abuox'
        }
    },
    methods: {
        async clickFavor (item, index) {
            let { slug, favorited } = item
            if (favorited) {
                let { data } = await deleteFavorite(slug)
                let oldArticles = Object.assign([], this.articles)
                oldArticles[index] = data.article
                this.articles = oldArticles
            } else {
                let { data } = await addFavorite(slug)
                let oldArticles = Object.assign([], this.articles)
                oldArticles[index] = data.article
                this.articles = oldArticles
            }
        },
        async tabsClick (name) {
            this.tabsName = name
            if (this.tabsName === 'my') {
                const param = {
                    author: this.username,
                    limit: 5,
                    offset: 0
                }
                const { data } = await getMyArticles(param)
                this.articles = data.articles
            } else {
                const param = {
                    favorited: this.username,
                    limit: 5,
                    offset: 0
                }
                const { data } = await getMyArticles(param)
                this.favorList = data.articles
            }
        },
        async setFollow () {
            if (this.user.following) {
                let { data } = await deleteFollow(this.username)
                this.user = data.profile
            } else {
                let { data } = await getFollow(this.username)
                this.user = data.profile
            }
        },
    },
    components: {
        articlePreview
    }
}
</script>

<style scoped>

</style>