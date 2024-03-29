<template>
    <el-dialog
        v-model="centerDialogVisible"
        width="40%"
        center
        destroy-on-close
    >
        <el-card class="box-card">
            <template #header>
                <div class="text-center text-2xl font-semibold">
                    <span>用户详情</span>
                </div>
            </template>
            <div
                v-for="(item, key, index) in userData"
                :key="index"
                class="text-lg py-2 flex flex-row"
            >
                <div class="w-44 mr-3">{{ dataIndexMap[key] }}:</div>
                <span
                    v-if="!inputFlag[index] && key !== 'role'"
                    @click="inputFlag[index] = true"
                    >{{ item }}</span
                >
                <el-input
                    v-if="key !== 'role' && inputFlag[index]"
                    v-model="userData[key]"
                    style="font-size: 1.125rem"
                    @blur="inputFlag[index] = false"
                    @change="changeFlag = true"
                ></el-input>
                <el-select
                    v-if="key === 'role'"
                    v-model="userData.role"
                    placeholder="Select"
                    @change="changeFlag = true"
                >
                    <el-option
                        v-for="item in ['USER', 'BANNED']"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </div>
            <el-container>
                <el-header
                    class="text-lg"
                    style="height: fit-content; padding: 0%"
                >
                    <div class="flex flex-row justify-between">
                        <div>相关试验列表:</div>
                        <el-checkbox
                            v-model="checkAll"
                            :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange"
                            >Check all</el-checkbox
                        >
                    </div>
                </el-header>
                <el-main style="padding: 1rem 0" class="h-36 overflow-auto">
                    <el-checkbox-group
                        v-model="expIDs"
                        @change="changeFlag = true"
                    >
                        <el-checkbox
                            v-for="item in trialsStore.trials"
                            :key="item.ctr"
                            :label="item.ctr"
                            style="display: block"
                        >
                            <span class="text-base">{{ item.title }}</span>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-main>
            </el-container>
        </el-card>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" size="large" @click="handleSubmit">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import useTrialsStore from '@/store/trials';
import { adminApi } from '@/api/admin/admin';
import { ElMessage } from 'element-plus';
import { watch, ref, reactive } from 'vue';
import type { usersType } from './type';

const trialsStore = useTrialsStore();
const emit = defineEmits<{
    (e: 'update'): void;
}>();

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
    data: usersType | undefined;
}>();
watch(
    () => props.visible,
    (newVal) => {
        centerDialogVisible.value = newVal;
        changeFlag.value = false;
        getUserTrials();
    },
);

/* 获取数据 */
const userData = ref<usersType>({
    id: '',
    name: '',
    phone: '',
    username: '',
    role: 'USER',
});
watch(
    () => props.data,
    (newVal) => {
        Object.assign(userData.value, newVal);
    },
);

/* 将得到的数据映射成字段 */
const dataIndexMap = ref<Record<keyof usersType, string>>({
    id: '试验者编号',
    name: '试验者姓名',
    phone: '电话号码',
    role: '试验者账号状况',
    username: '试验者账号',
});

/* 获取关联试验 */
const expIDs = ref<string[]>([]);
const isIndeterminate = ref(true);
const checkAll = ref<boolean>();
const allExpIDs = ref<string[]>([]);

const getUserTrials = () => {
    adminApi.getUserTrials({ userID: userData.value.id }).then((res) => {
        if (res.code === 200) expIDs.value = res.data.expIDs;
    });
};

const handleCheckAllChange = (val: boolean) => {
    allExpIDs.value = [];
    for (let i of trialsStore.trials) {
        allExpIDs.value?.push(i.ctr);
    }
    expIDs.value = val ? allExpIDs.value : [];
    isIndeterminate.value = false;
    changeFlag.value = true;
};

/* 修改相关 */
const inputFlag = ref<boolean[]>(
    new Array(Object.keys(dataIndexMap.value).length).fill(false),
); // 用于判断是span还是input框
const changeFlag = ref<boolean>(false);
const handleSubmit = () => {
    if (changeFlag.value === true) {
        adminApi.changeUser({ ...userData.value, expIDs: [] }).then((res) => {
            if (res.code === 200) {
                ElMessage({
                    type: 'success',
                    message: '修改成功',
                });
                emit('update');
                centerDialogVisible.value = false;
            } else {
                ElMessage({
                    type: 'error',
                    message: res.msg,
                });
            }
        });
    } else {
        centerDialogVisible.value = false;
    }
};
</script>

<style lang="scss" scoped></style>
