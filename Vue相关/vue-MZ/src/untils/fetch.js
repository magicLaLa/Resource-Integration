/* eslint-disable no-undef */
import 'babel-polyfill'
import 'whatwg-fetch'
import { MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'

export default async ({ method = 'GET', url, data }) => {
  method = method.toUpperCase()

  let myHeaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  })

  let fetchConfig = {
    method,
    // credentials: 'include',
    headers: myHeaders,
    mode: 'cors'
  }

  if (method === 'POST') {
    fetchConfig = {
      ...fetchConfig,
      body: data
    }
  }

  try {
    let response = await fetch(url, fetchConfig)
    let data = await response.json()
    return data
  } catch (error) {
    MessageBox({
      message: '连接错误',
      confirmButtonText: '确认'
    })
  }
}
