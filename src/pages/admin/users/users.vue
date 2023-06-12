<template>
    <layout>
        <el-container class="w-full h-fit txl">
            <el-main>
               <el-card>
                <el-table
                    ref="tableRef"
                    row-key="date"
                    :data="tableData"
                    style="width: 100%"
                    max-height="800"
                    size="large"
                    header-row-class-name="text-xl font-bold"
                    row-class-name="text-lg font-semibold"
                >
                    <el-table-column
                        prop="id"
                        label="研究人员编号"
                        column-key="date"
                        align="center"
                    />
                    <el-table-column
                        prop="name"
                        label="研究人员名字"
                        align="center"
                    />
                    <el-table-column
                        prop="phone"
                        label="电话号码"
                        align="center"
                    />
                    <el-table-column
                        prop="username"
                        label="账号"
                        align="center"
                    />
                    <el-table-column
                        prop="role"
                        label="是否禁用"
                        align="center"
                    >
                        <template #default="scope">
                            <el-switch
                                v-model="banArr[scope.$index]"
                                @change="changeBanned(scope.$index)"
                            ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="role" align="center">
                        <template #header>
                            <el-button
                                type="success"
                                class="w-3/4"
                                size="large"
                                style="font-size: 1.125rem"
                                @click="createDialog"
                                >添加账号</el-button
                            >
                        </template>
                        <template #default="scope">
                            <el-button
                                type="primary"
                                @click="detailDialog(scope.$index)"
                                >查看详情</el-button
                            >
                            <el-button
                                type="warning"
                                @click="changePassDialog(scope.$index)"
                                >修改密码</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
               </el-card>
            </el-main>
        </el-container>
        <user-detail-dialog
            :visible="detailDialogVisble"
            :data="tableData[detailDialogIndex]"
            @update="getUsers()"
        ></user-detail-dialog>
        <user-change-pass-dialog
            :visible="changePassVisible"
            :data="tableData[changePassIndex]"
        ></user-change-pass-dialog>
        <user-create-dialog
            :visible="createUserVisible"
            @update="getUsers()"
        ></user-create-dialog>
    </layout>
</template>

<script setup lang="ts">
import layout from '../layout.vue';
import useTrialsStore from '@/store/trials';
import { usersType } from './type';
import { ref } from 'vue';
import { adminApi } from '@/api/admin/admin';
import { ElMessage, TableColumnCtx, TableInstance } from 'element-plus';
import userDetailDialog from './user-detail-dialog.vue';
import userChangePassDialog from './user-change-pass-dialog.vue';
import userCreateDialog from './user-create-dialog.vue';

const trialStore = useTrialsStore();
trialStore.getAllTrials();

// 表格相关
const tableRef = ref<TableInstance>();
const tableData = ref<usersType[]>([]);
const banArr = ref<boolean[]>([]);
// 获取用户信息
const getUsers = () => {
    adminApi.getUsers().then((res) => {
        tableData.value = res.data;
        banArr.value = [];
        for (let i in tableData.value) {
            if (tableData.value[i].role === 'ROLE_BANNED') {
                banArr.value.push(true);
            } else {
                banArr.value.push(false);
            }
        }
    });
};
getUsers();
// 封禁用户
const changeBanned = (index: number) => {
    adminApi
        .banUser({
            userID: tableData.value[index].id,
            ban: banArr.value[index],
        })
        .then((res) => {
            if (res.code === 200) {
                ElMessage({
                    type: 'success',
                    message: '修改成功',
                    duration: 1000,
                });
            } else {
                banArr.value[index] = !banArr.value[index];
                ElMessage({
                    type: 'error',
                    message: '修改失败',
                    duration: 1000,
                });
            }
        });
};
// 查看用户详情
const detailDialogVisble = ref<boolean>(false);
const detailDialogIndex = ref<number>(0); // 用来记录当前预览的用户信息
const detailDialog = (index: number) => {
    detailDialogVisble.value = false;
    detailDialogIndex.value = index;
    setTimeout(() => {
        detailDialogVisble.value = true;
    }, 50);
};

// 修改密码
const changePassVisible = ref<boolean>(false);
const changePassIndex = ref<number>(0);
const changePassDialog = (index: number) => {
    changePassVisible.value = false;
    changePassIndex.value = index;
    setTimeout(() => {
        changePassVisible.value = true;
    });
};

// 新增用户
const createUserVisible = ref<boolean>(false);
const createDialog = () => {
    createUserVisible.value = false;
    setTimeout(() => {
        createUserVisible.value = true;
    });
};
</script>

<style lang="scss" scoped></style>
