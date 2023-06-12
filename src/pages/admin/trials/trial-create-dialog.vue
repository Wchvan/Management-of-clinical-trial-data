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
            <div v-for="(item, index) in trialLabels" :key="index">
                <div  class="text-lg py-2 flex flex-row">
                    <div class="w-44 mr-3">{{ item }}:</div>
                    <el-input
                        v-if="index !== 'clin_stage'"
                        v-model="trialData[index]"
                        style="font-size: 1.125rem"
                    ></el-input>
                    <el-select 
                        v-else
                        v-model="trialData[index]" 
                        class="m-2" 
                        placeholder="Select" 
                        size="large">
                        <el-option
                            v-for="item in clinStageOptions"
                            :key="item"
                            :value="item"
                        />
                    </el-select>
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
import { trialDetailType } from './type'

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
})

/* 分期 */
const clinStageOptions = ['phase1','phase2','phase3','phase4']

/* 获取数据 */
const trialData = ref<trialDetailType>({
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

/* 新增相关 */
const handleSubmit = () => {
    for (let i in trialData.value) {
        if (trialData.value[i as keyof trialDetailType] === '') {
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
