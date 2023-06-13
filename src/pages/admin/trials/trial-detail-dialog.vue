<template>
    <el-dialog
        v-model="centerDialogVisible"
        width="40%"
        top="8%"
        center
        destroy-on-close
    >
        <el-card class="box-card">
            <template #header>
                <div class="text-center text-2xl font-semibold">
                    <span>实验详情</span>
                </div>
            </template>
            <div
                v-for="(item, key, index) in trialLabels"
                :key="index"
                class="text-lg py-2 flex flex-row"
            >
                <div class="w-44 mr-3">{{ item }}:</div>
                <span>{{ trialFormData[key] }}</span>
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
import { ElMessage } from 'element-plus';
import { watch, ref, reactive } from 'vue';
import { trialDetailType } from './type';
import { trialApi } from '@/api/trials/trials';

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
    ctr: string;
}>();
watch(
    () => props.visible,
    (newVal) => {
        centerDialogVisible.value = newVal;
        getTrialDetail()
    },
);

/* 详情数据 */
const trialFormData = ref<trialDetailType>({
    ctr: '',
    title: '',
    clin_stage: 'phase1',
    clin_status: '',
    contact: '',
    company: '',
    indication: '',
    med_name: '',
    reg_date: '',
    reg_location: '',
    sponsor: '',
});

const getTrialDetail = () => {
    trialApi.getTrialDetail({ ctr: props.ctr }).then((res) => {
        if (res.code === 200) {
            trialFormData.value = res.data;
        } else {
            ElMessage({
                type: 'error',
                message: res.msg,
            });
        }
    });
}

/* 标签 */
const trialLabels = ref<Record<keyof trialDetailType, string>>({
    ctr: '实验编号',
    title: '实验题目',
    clin_stage: '试验分期',
    clin_status: '试验状态',
    contact: '企业联系人',
    company: '企业名称',
    indication: '适应症',
    med_name: '药物名称',
    reg_date: '登记时间',
    reg_location: '企业注册地址',
    sponsor: '申办者',
});

const handleSubmit = () => {
    centerDialogVisible.value = false;
};
</script>

<style lang="scss" scoped></style>
