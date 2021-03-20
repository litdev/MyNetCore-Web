import request from "@/util/request"

//登录
export const apiAccountLogin = data => {
    return request({
        url: '/account/login',
        method: 'post',
        data
    })
}
