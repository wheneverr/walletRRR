import request from '@/utils/request'

export function addCard(data) {
    return request({
        url: '/userCard/bindCard',
        method: 'post',
        data
    })
}

export function bindCard(data) {
    return request({
        url: '/userCard/bindMainCard',
        method: 'post',
        data
    })
}

export function removeCard(data) {
    return request({
        url: '/userCard/delete',
        method: 'post',
        data
    })
}

export function getCardInfo(cardId) {
    return request({
        url: '/bankCard/detail',
        method: 'get',
        params: { cardId }
    })
}