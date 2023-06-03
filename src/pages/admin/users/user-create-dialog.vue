<template>
    <el-dialog v-model="centerDialogVisible" width="40%" center destroy-on-close>
        <el-card class="box-card">
            <template #header>
                <div class="text-center text-2xl font-semibold">
                    <span>新增用户</span>
                </div>
            </template>
            <div v-for="(item, key, index) in userData" :key="index" class="text-lg py-2 flex flex-row">
                <div class=" w-44 mr-3">{{ dataIndexMap[key] }}:</div>
                <el-input v-if="key !== 'role'" v-model="userData[key]" style="font-size: 1.125rem;"></el-input>
                <el-select v-else v-model="userData[key]" placeholder="Select">
                    <el-option v-for="item in ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_BANNED']" :key="item" :label="item"
                        :value="item" />
                </el-select>
            </div>
            <el-container>
                <el-header class="text-lg " style="height: fit-content; padding: 0%;">
                    <div class="flex flex-row justify-between">
                        <div>相关实验列表:</div>
                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange">Check
                            all</el-checkbox>
                    </div>
                </el-header>
                <el-main style="padding: 1rem 0;">
                    <el-checkbox-group v-model="expIDs">
                        <el-checkbox v-for="item in trialsStore.trials" :key="item._id" :label="item._id" style="display: block; " >
                            <span class=" text-base">{{item.试验题目}}</span>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-main>
            </el-container>
        </el-card>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="handleSubmit" size="large">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import useTrialsStore from '@/store/trials';
import { adminApi } from '@/api/admin/admin';
import { ElMessage } from 'element-plus';
import { watch, ref, reactive } from 'vue';
import type { usersType, usersIndexMapType } from './type'

const trialsStore = useTrialsStore()

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false)
const props = defineProps<{
    visible: boolean
}>()
watch(() => props.visible, (newVal) => {
    centerDialogVisible.value = newVal
})

/* 获取数据 */
const userData = ref<usersType>({
    id: '',
    name: '',
    phone: '',
    username: '',
    role: 'ROLE_USER',
})


/* 将得到的数据映射成字段 */
const dataIndexMap = ref<usersIndexMapType>({
    id: "实验者编号",
    name: "实验者姓名",
    phone: "电话号码",
    role: "实验者账号状况",
    username: "实验者账号",
})

/* 获取关联实验 */
const expIDs = ref<string[]>([])
const isIndeterminate = ref(true)
const checkAll = ref<boolean>()
const allExpIDs = ref<string[]>([])

for (let i of trialsStore.trials) {
    allExpIDs.value?.push(i._id)
}

const handleCheckAllChange = (val: boolean) => {
    expIDs.value = val ? allExpIDs.value : []
    isIndeterminate.value = false
}

/* 新增相关 */
const handleSubmit = () => {
    adminApi.changeUser({ ...userData.value, expIDs: expIDs.value }).then(res => {
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '修改成功'
            })
            centerDialogVisible.value = false
        } else {
            ElMessage({
                type: 'error',
                message: res.msg
            })
        }
    })
}
</script>

<style lang='scss' scoped></style>