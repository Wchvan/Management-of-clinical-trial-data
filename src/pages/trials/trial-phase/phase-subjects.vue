<template>
    <el-container class="w-full h-fit txl">
        <el-header>
            <el-input v-model="inputVal" placeholder="Please input" class="input-with-select" size="large">
                <template #prepend>
                    <el-select v-model="selectVal" placeholder="Select" style="width: 115px" size="large">
                        <el-option label="Restaurant" value="1" />
                        <el-option label="Order No." value="2" />
                        <el-option label="Tel" value="3" />
                    </el-select>
                </template>
                <template #append>
                    <i-ep-Search />
                </template>
            </el-input>
        </el-header>
        <el-main>
            <el-table ref="tableRef" row-key="date" :data="trialTableData" style="width: 100%" size="large"
                header-row-class-name="text-xl font-bold" row-class-name="text-lg font-semibold">
                <el-table-column v-for="item in tableLabels" :key="item" :prop="item" :label="item" align="center"
                    width="200" />
                <el-table-column prop="role" fixed="right" width="180" align="center">
                    <template #header>
                        <el-button type="success" class="w-3/4" size="large" style="font-size: 1.125rem"
                            @click="createDialog">添加实验</el-button>
                    </template>
                    <el-button type="primary" class="w-3/4" size="large">查看详情</el-button>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { trailsType } from '@/store/trials/type';
import useTrialsStore from '@/store/trials';

const inputVal = ref<string>()
const selectVal = ref<string>()

const trialsStore = useTrialsStore();

const trialTableData = ref<trailsType[]>([]);

const getAllTrials = () => {
    trialsStore.getAllTrials().then(() => {
        trialTableData.value = trialsStore.trials;
    });
};
getAllTrials();

// 表头
const tableLabels = ref<Array<keyof trailsType>>([
    '_id',
    '试验题目',
    '药物名称',
    '试验状态',
    '试验分期',
    '申办者',
    '登记日期',
    '企业名称',
    '企业联系人',
    '企业注册地址',
]);

// 添加实验
const createTrialVisible = ref<boolean>(false);
const createDialog = () => {
    createTrialVisible.value = false;
    setTimeout(() => {
        createTrialVisible.value = true;
    });
};


</script>

<style lang="scss" scoped></style>
