<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Your Settings</h1>

                <div>
                <fieldset>
                    <fieldset class="form-group">
                        <input class="form-control" v-model="user.image" type="text" placeholder="URL of profile picture">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control  form-control-lg" v-model="user.username" type="text" placeholder="Your Name">
                    </fieldset>
                    <fieldset class="form-group">
                        <textarea class="form-control form-control-lg" v-model="user.bio" rows="8" placeholder="Short bio about you"></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Email">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" v-model="user.password" type="password" placeholder="Password">
                    </fieldset>
                    <button @click="submitUser" class="btn btn-lg btn-primary pull-xs-right">
                        Update Settings
                    </button>
                </fieldset>
                </div>
            </div>

            </div>
        </div>
        </div>
</template>

<script>
import { setUser } from '@/api/user.js'
export default {
    middleware: 'authenticated',
    name: 'SettingsIndex',
    asyncData ({ store }) {
        let user = Object.assign({}, store.state.user)
        delete user.token
        return {
            user
        }
    },
    methods: {
        async submitUser () {
            let data = await setUser({user: this.user})
            if (data.status === 200) {
                this.$router.push({
                    name: 'profile',
                    params: {
                        username: this.user.username
                    }
                })
            }
        }
    }
}
</script>

<style scoped>

</style>