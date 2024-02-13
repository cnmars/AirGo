//路由-store
import {defineStore, storeToRefs} from "pinia";
import {request} from "/@/utils/request";
import {useApiStore} from "/@/stores/apiStore";

export const useAdminMenuStore = defineStore("adminMenuStore", {
  state: () => ({
    currentMenu:{} as Route,
    //所有的菜单(后端完成子菜单嵌套处理。前端表格渲染嵌套数据)
    allMenuList: [] as Route[],
    //所有菜单tree
    allMenuTree: [] as RoutesTree[],
    //当前角色菜单tree
    currentRoleMenuTree: [] as RoutesTree[],
  }),
  actions: {
    //所有动态路由tree（路由tree）
    async getAllMenuTree() {
      const apiStore = useApiStore()
      const res: any = await request(apiStore.adminApi.getAllMenuTree)
      this.allMenuTree = res.data
    },
    //当前角色动态路由tree（路由tree）
    async getMenuTree(params: any) {
      const apiStore = useApiStore()
      const res = await request(apiStore.adminApi.getMenuTree, params)
      this.currentRoleMenuTree = res.data
    },
    //所有的动态路由list
    async getAllMenuList() {
      const apiStore = useApiStore()
      const res = await request(apiStore.adminApi.getAllMenuList)
      this.allMenuList = res.data
    },
    //新建动态路由
    async newMenu() {
      const apiStore = useApiStore()
      return request(apiStore.adminApi.newMenu, this.currentMenu)
    },
    //删除动态路由
    async delMenu(params: object) {
      const apiStore = useApiStore()
      return request(apiStore.adminApi.delMenu, params)
    },
    //更新动态路由
    async updateMenu() {
      const apiStore = useApiStore()
      return request(apiStore.adminApi.updateMenu, this.currentMenu)
    },
  }
})