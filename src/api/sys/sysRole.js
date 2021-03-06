import request from "@/util/request"

//获取列表
export const apiGetSysRolePageList = data => {
    return request({
        url: '/sysrole/get/pagelist',
        method: 'post',
        data
    })
}

//获取所有数据正常的组，无需权限
export const apiGetSysRoleAllList = function () {
    return request({
        url: '/sysrole/get/list',
        method: 'get',
    })
}

//删除
export const apiDeleteSysRoleByIds = (ids) => {
    return request({
        url: '/sysrole/delete',
        method: 'delete',
        params: { ids: ids }
    })
}

//获取详情
export const apiGetSysRoleInfo = (id) => {
    return request({
        url: '/sysrole/get/info',
        method: 'get',
        params: { id: id }
    })
}

//编辑信息
export const apiModifySysRoleInfo = data => {
    return request({
        url: '/sysrole/modify',
        method: 'post',
        data
    })
}

//判断组名是否存在
export const apiCheckRoleNameExists = (roleId, roleName) => {
    return request({
        url: '/sysrole/exists/rolename',
        method: 'get',
        params: { roleId: roleId, roleName: roleName }
    })
}

//获取组的权限设置数据
export const apiGetRolePermitList = roleId => {
    return request({
        url: '/sysrole/get/permit/list',
        method: 'get',
        params: { roleId: roleId }
    })
}

//设置组的权限
export const apiModifyRolePermit = (roleId, permits) => {
    return request({
        url: '/sysrole/modify/permit',
        method: 'post',
        params: { roleId: roleId, permits: permits }
    })
}