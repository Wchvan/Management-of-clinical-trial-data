<template>
    <layout>
        <el-container class="w-full h-fit txl">
            <el-main>
                <el-card>
                    <el-table
                        ref="tableRef"
                        row-key="date"
                        :data="trialTableData"
                        style="width: 100%"
                        max-height="800"
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
                            width="200"
                        />
                        <el-table-column
                            prop="role"
                            fixed="right"
                            width="180"
                            align="center"
                        >
                            <template #header>
                                <el-button
                                    type="success"
                                    class="w-3/4"
                                    size="large"
                                    style="font-size: 1.125rem"
                                    @click="createDialog"
                                    >添加实验</el-button
                                >
                            </template>
                            <template #default="scope">
                                <el-button
                                    type="primary"
                                    class="w-3/4"
                                    size="large"
                                    @click="detailDialog(scope.$index)"
                                    >查看详情</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-main>
        </el-container>
        <trial-create-dialog
            :visible="createTrialVisible"
            @update="getAllTrials"
        ></trial-create-dialog>
        <trial-detail-dialog
            :visible="detailTrialVisible"
            :ctr="detailCtr"
        ></trial-detail-dialog>
    </layout>
</template>

<script setup lang="ts">
import layout from '../layout.vue';
import { ref } from 'vue';
import { trailsType } from '@/store/trials/type';
import useTrialsStore from '@/store/trials';
import trialCreateDialog from './trial-create-dialog.vue';
import trialDetailDialog from './trial-detail-dialog.vue';

const trialsStore = useTrialsStore();

const trialTableData = ref<trailsType[]>([]);

const getAllTrials = () => {
    trialsStore.getAllTrials().then(() => {
        trialTableData.value = trialsStore.trials;
    });
};
getAllTrials();

// 表头
const tableLabels = ref<Record<keyof trailsType, string>>({
    ctr: '登记号',
    title: '试验题目',
    clin_stage: '试验分期',
    clin_status: '试验状态',
    indication: '适应症',
    med_name: '药物名称',
});

// 添加实验
const createTrialVisible = ref<boolean>(false);
const createDialog = () => {
    createTrialVisible.value = false;
    setTimeout(() => {
        createTrialVisible.value = true;
    });
};

// 实验详情
const detailCtr = ref<string>('');
const detailTrialVisible = ref<boolean>(false);
const detailDialog = (index: number) => {
    detailCtr.value = trialTableData.value[index].ctr;
    detailTrialVisible.value = false;
    setTimeout(() => {
        detailTrialVisible.value = true;
    });
};
</script>

<style lang="scss" scoped></style>
