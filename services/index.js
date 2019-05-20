import qs from 'qs'
import request from '../utils/request'
import { REST_URL } from '../constants/URL'

export async function get(url,params) {
  return request(`${REST_URL}/${url}?${qs.stringify(params)}`)
}

export async function post(url,params) {
  return request(`${REST_URL}/${url}`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(params),
  })
}

export async function put(url,params) {
  return request(`${REST_URL}/${url}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(params),
  })
}

export async function del(url,params) {
  return request(`${REST_URL}/${url}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(params),
  })
}
