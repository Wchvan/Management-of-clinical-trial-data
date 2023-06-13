<template>
    <layout>
        <el-container class="w-full h-fit txl">
            <el-main>
                <el-card>
                    <template #header>
                        <div v-for="item in searchNum" :key="item" class="mt-2">
                            <el-input
                                v-model="inputVal[item - 1]"
                                placeholder="Please input"
                                class="input-with-select mb-2"
                                size="large"
                            >
                                <template #prepend>
                                    <el-select
                                        v-model="selectVal[item - 1]"
                                        style="width: 140px"
                                        size="large"
                                    >
                                        <el-option
                                            v-for="item in selectOptions"
                                            :key="item"
                                            :label="tableLabels[item]"
                                            :value="item"
                                        />
                                    </el-select>
                                </template>
                                <template #append>
                                    <el-button-group>
                                        <el-button
                                            style="
                                                border-right: 1.5px solid
                                                    #a8abb2;
                                            "
                                            @click="addSearch"
                                            ><i-ep-Plus
                                        /></el-button>
                                        <el-button @click="delSearch(item - 1)"
                                            ><i-ep-Minus
                                        /></el-button>
                                    </el-button-group>
                                </template>
                            </el-input>
                        </div>
                        <div class="flex flex-row justify-center">
                            <el-button
                                class="w-1/4"
                                round
                                size="large"
                                type="danger"
                                @click="resetSearch"
                                >重置</el-button
                            >
                            <el-button
                                class="w-1/4"
                                round
                                size="large"
                                type="primary"
                                @click="search"
                                >搜索</el-button
                            >
                        </div>
                    </template>
                    <el-table
                        ref="tableRef"
                        row-key="date"
                        :data="tableData"
                        style="width: 100%"
                        max-height="500"
                        size="large"
                        header-row-class-name="text-xl font-bold"
                        row-class-name="text-lg font-semibold"
                    >
                        <el-table-column
                            v-for="(item, key) in tableLabels"
                            :key="key"
                            :prop="key"
                            :label="item"
                            align="center"
                        >
                            <template v-if="key === 'role'" #default="scope">
                                <el-switch
                                    v-model="banArr[scope.$index]"
                                    @change="changeBanned(scope.$index)"
                                ></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="role"
                            align="center"
                            fixed="right"
                            width="250"
                        >
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
                                    class="mt-2"
                                    style="
                                        margin-left: 0;
                                        margin-right: 0.5rem;
                                        width: 80px;
                                    "
                                    @click="detailDialog(scope.$index)"
                                    >查看详情</el-button
                                >
                                <el-button
                                    type="warning"
                                    class="mt-2"
                                    style="
                                        margin-left: 0;
                                        margin-right: 0.5rem;
                                        width: 80px;
                                    "
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
import { usersType, selectOptionsType } from './type';
import { ref } from 'vue';
import { adminApi } from '@/api/admin/admin';
import { ElMessage, TableColumnCtx, TableInstance } from 'element-plus';
import userDetailDialog from './user-detail-dialog.vue';
import userChangePassDialog from './user-change-pass-dialog.vue';
import userCreateDialog from './user-create-dialog.vue';
import { error } from 'console';

const trialStore = useTrialsStore();
trialStore.getAllTrials();

// 检索
const searchNum = ref<number>(1);
const inputVal = ref<string[]>(['']);
const selectVal = ref<selectOptionsType[]>(['name']);
const selectOptions = ref<selectOptionsType[]>([
    'username',
    'role',
    'name',
    'phone',
]);
const searchForm = ref<Record<selectOptionsType, string>>({
    username: '',
    role: '',
    phone: '',
    name: '',
});

const addSearch = () => {
    searchNum.value++;
    selectVal.value.push('name');
    inputVal.value.push('');
};

const delSearch = (index: number) => {
    searchNum.value--;
    selectVal.value.splice(index, 1);
    inputVal.value.splice(index, 1);
};

const resetSearch = () => {
    for (let i in inputVal.value) {
        inputVal.value[i] = '';
    }
};

const search = () => {
    for (let i in inputVal.value) {
        searchForm.value[selectVal.value[i]] += ' ' + inputVal.value[i];
    }
    for (let i in searchForm.value) {
        searchForm.value[i as selectOptionsType] =
            searchForm.value[i as selectOptionsType].trim();
    }
    adminApi.searchUser(searchForm.value).then(res => {
        if (res.code === 200) {
            tableData.value = res.data
        } else {
            ElMessage({
                type: 'error',
                message: res.msg
            })
        }
    })
};

// 表格相关
const tableRef = ref<TableInstance>();
const tableData = ref<usersType[]>([]);
const banArr = ref<boolean[]>([]);

const tableLabels = ref<Record<keyof usersType, string>>({
    id: '研究人员编号',
    name: '研究人员名字',
    phone: '手机号码',
    username: '账号',
    role: '是否禁用',
});
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
