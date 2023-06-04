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
                    <span>新增实验</span>
                </div>
            </template>
            <div v-for="(item, index) in props.labels" :key="index">
                <div v-if="item !== '_id'" class="text-lg py-2 flex flex-row">
                    <div class="w-44 mr-3">{{ item }}:</div>
                    <el-input
                        v-model="trialData[item]"
                        style="font-size: 1.125rem"
                    ></el-input>
                </div>
            </div>
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
import { trailsType } from '@/store/trials/type';

const trialsStore = useTrialsStore();
const emit = defineEmits<{
    (e: 'update'): void;
}>();

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
    labels: Array<keyof trailsType>;
}>();
watch(
    () => props.visible,
    (newVal) => {
        centerDialogVisible.value = newVal;
    },
);

/* 获取数据 */
const trialData = ref<trailsType>({
    _id: '',
    试验题目: '',
    药物名称: '',
    试验状态: '',
    试验分期: '',
    申办者: '',
    登记日期: '',
    企业名称: '',
    企业联系人: '',
    企业注册地址: '',
});

/* 新增相关 */
const handleSubmit = () => {
    for (let i in trialData.value) {
        if (trialData.value[i as keyof trailsType] === '') {
            ElMessage({
                type: 'error',
                message: '请填写所有信息',
            });
            return;
        }
    }
    adminApi.createTrial({ ...trialData.value }).then((res) => {
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
