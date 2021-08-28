<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <div errors="$ctrl.errors" class="ng-isolate-scope">
                        <ul class="error-messages" ng-show="$ctrl.errors" v-if="errors">
                            <!-- ngRepeat: (field, errors) in $ctrl.errors -->
                            <div v-if="errors.title" ng-repeat="(field, errors) in $ctrl.errors" class="ng-scope">
                                <!-- ngRepeat: error in errors -->
                                <li v-for="item in errors.title" 
                                    :key="item" 
                                    ng-repeat="error in errors" 
                                    class="ng-binding ng-scope">
                                    {{ item }}
                                </li>
                            </div>
                            <div v-if="errors.body" ng-repeat="(field, errors) in $ctrl.errors" class="ng-scope">
                                <!-- ngRepeat: error in errors -->
                                <li ng-repeat="error in errors" 
                                    v-for="item in errors.body" 
                                    :key="item" 
                                    class="ng-binding ng-scope">
                                    {{ item }}
                                </li>
                            </div>
                            <div v-if="errors.description" ng-repeat="(field, errors) in $ctrl.errors" class="ng-scope">
                                <!-- ngRepeat: error in errors -->
                                <li ng-repeat="error in errors" 
                                    v-for="item in errors.description"  
                                    class="ng-binding ng-scope"
                                    :key="item">
                                    {{ item }}
                                </li>
                            </div>
                        </ul>
                    </div>
                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="article.title" class="form-control form-control-lg" placeholder="Article Title">
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="article.description" class="form-control" placeholder="What's this article about?">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control" v-model="article.body" rows="8" placeholder="Write your article (in markdown)"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" @keydown="onKeyDown" class="form-control" v-model="tagsValue" placeholder="Enter tags"><div class="tag-list"></div>
                            </fieldset>
                            <div class="tag-list">
                                <span v-for="(item, index) in tagList" :key="item" class="tag-default tag-pill ng-binding ng-scope">
                                    <i @click="deleteTag(index)" class="ion-close-round"></i>
                                    {{ item }}
                                </span>
                            </div>
                            <button @click="submitBtn" class="btn btn-lg pull-xs-right btn-primary" type="button">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { setArticles, getArticle } from '@/api/article.js'
export default {
    middleware: 'authenticated',
    name: 'EditorIndex',
    async asyncData ({ params }) {
        let newArticle, newTagList;
        if (params.slug) {
            let { data } = await getArticle(params.slug)
            let { article } = data
            console.log(article)
            newArticle = {
                title: article.title,
                description: article.description,
                body: article.body
            }
            newTagList = article.tagList || []
        } else {
            newArticle = {
                title: '',
                description: '',
                body: ''
            }
            newTagList = []
        }
        return {
            article: newArticle,
            tagList: newTagList,
            tagsValue: '',
            errors: null
        }
    },
    methods: {
        async submitBtn () {
            try {
                this.article.tagList = this.tagList
                let data = await setArticles({ article: this.article })
                console.log(data)
                if (data.status == 200) {
                    this.$router.push({
                        name: 'article',
                        params: {
                            slug: data.data.article.slug
                        }
                    })
                }
            } catch (errors) {
                this.errors = errors.response.data.errors
            }
            
        },
        onKeyDown (e) {
            if (!this.tagsValue || !this.tagsValue.trim()) {
                return
            }
            if (e.keyCode === 13) {
                this.tagList.unshift(this.tagsValue)
                this.tagsValue = ''
            }
        },
        deleteTag (index) {
            this.tagList.splice(index, 1)
        }
    }
}
</script>

<style scoped>

</style>