import { request } from '@/plugins/request'

export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}


export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params
    })
}


//添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

//取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}


//获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}


//获取文章评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}

//发布文章
export const setArticles = data => {
    return request({
        method: 'POST',
        url: `/api/articles`,
        data
    })
}

//删除文章
export const deleteArticles = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`
    })
}


//添加文章评论
export const getAddComments = (slug, data) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
}

//关注
export const getFollow = slug => {
    return request({
        method: 'POST',
        url: `/api/profiles/${slug}/follow`
    })
}

export const deleteFollow = slug => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${slug}/follow`
    })
}

//根据name获取个人信息
export const getProfiles = name => {
    return request({
        method: 'GET',
        url: `/api/profiles/${name}`
    })
}

//我发布的 || 我喜欢的favorited（favorited=qiyi&limit=5&offset=0）
export const getMyArticles = params => {
    return request({
        method: 'GET',
        url: `/api/articles`,
        params
    })
}


//我喜欢的
export const getLikeArticles = params => {
    return request({
        method: 'GET',
        url: `/api/articles`,
        params
    })
}

//删除我的评论
export const deleteComment = (slug, id) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${id}`
    })
}