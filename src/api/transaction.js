import request from '@/utils/request'

export function getTransactionList(params) {
  return request({
    url: '/transactionRecord/list',
    method: 'get',
    params
  })
}

export function innerTransaction(data) {
  return request({
    url: '/innerTransaction/add',
    method: 'post',
    data
  })
}

export function addTransaction(data) {
  return request({
    url: '/transactionRecord/add',
    method: 'post',
    data
  })
}

export function getReceiptList(userId, transactionType) {
  return request({
    url: '/transactionRecord/listByRecUser',
    method: 'get',
    params: { userId, transactionType }
  })
}

export function getInitiationList(userId, transactionType) {
  return request({
    url: '/transactionRecord/listBySendUser',
    method: 'get',
    params: { userId, transactionType }
  })
}

export function audit(pwd, auditStatus, transactionID) {
  return request({
    url: '/transactionRecord/audit',
    method: 'get',
    params: { pwd, auditStatus, transactionID }
  })
}

export function totalAmount(userId, start, end) {
  return request({
    url: '/transactionRecord/totalAmount',
    method: 'get',
    params: { userId, start, end }
  })
}

export function searchTransactionRecord(phone, email, ssn, transactionType, start, end) {
  return request({
    url: '/transactionRecord/listBy',
    method: 'get',
    params: { phone, email, ssn, transactionType, start, end }
  })
}

export function getTopUser(sent) {
  return request({
    url: '/transactionRecord/getTopUser',
    method: 'get',
    params: { sent }
  })
}