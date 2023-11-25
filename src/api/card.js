import request from '@/utils/request'

export function addCard(data){
    return request({
        url: '/bankCard/add',
        method: 'post',
        data
    })
}

export function bindCard(data){
    return request({
        url: '/userCard/add',
        method: 'post',
        data
    })
}

export function removeCard(data){
    return request({
        url: '/userCard/delete',
        method: 'post',
        data
    })
}