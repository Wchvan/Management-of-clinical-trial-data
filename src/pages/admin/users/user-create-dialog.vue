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
                    <span>新增用户</span>
                </div>
            </template>
            <div
                v-for="(item, key, index) in userData"
                :key="index"
                class="text-lg py-2 flex flex-row"
            >
                <div class="w-44 mr-3">{{ dataIndexMap[key] }}:</div>
                <el-input
                    v-if="key !== 'role'"
                    v-model="userData[key]"
                    style="font-size: 1.125rem"
                ></el-input>
                <el-select v-else v-model="userData[key]" placeholder="Select">
                    <el-option
                        v-for="item in ['ROLE_USER', 'ROLE_BANNED']"
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
                        <div>相关实验列表:</div>
                        <el-checkbox
                            v-model="checkAll"
                            :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange"
                            >Check all</el-checkbox
                        >
                    </div>
                </el-header>
                <el-main style="padding: 1rem 0">
                    <el-checkbox-group v-model="expIDs">
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
import type { usersType, createUserType } from './type';

const trialsStore = useTrialsStore();
const emit = defineEmits<{
    (e: 'update'): void;
}>();

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
}>();
watch(
    () => props.visible,
    (newVal) => {
        centerDialogVisible.value = newVal;
    },
);

/* 获取数据 */
const userData = ref<createUserType>({
    name: '',
    phone: '',
    username: '',
    role: 'ROLE_USER',
});

/* 将得到的数据映射成字段 */
const dataIndexMap = ref<Record<keyof createUserType, string>>({
    name: '实验者姓名',
    phone: '电话号码',
    role: '实验者账号状况',
    username: '实验者账号',
});

/* 获取关联实验 */
const expIDs = ref<string[]>([]);
const isIndeterminate = ref(true);
const checkAll = ref<boolean>();
const allExpIDs = ref<string[]>([]);

const handleCheckAllChange = (val: boolean) => {
    allExpIDs.value = [];
    for (let i of trialsStore.trials) {
        allExpIDs.value?.push(i.ctr);
    }
    expIDs.value = val ? allExpIDs.value : [];
    isIndeterminate.value = false;
};

/* 新增相关 */
const handleSubmit = () => {
    for (let i in userData.value) {
        if (userData.value[i as keyof createUserType] === '') {
            ElMessage({
                type: 'error',
                message: '请填写所有信息',
            });
            return;
        }
    }
    adminApi
        .createUser({ ...userData.value, expIDs: expIDs.value })
        .then((res) => {
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
};
</script>

<style lang="scss" scoped></style>
