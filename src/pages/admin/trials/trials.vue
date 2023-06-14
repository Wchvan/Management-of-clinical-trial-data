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
                                        placeholder="试验题目"
                                        style="width: 115px"
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
                        :data="trialTableData"
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
                            width="200"
                        >
                            <template
                                v-if="key === 'clin_stage'"
                                #default="scope"
                            >
                                <el-select
                                    v-model="trialTableData[scope.$index][key]"
                                    class="m-2"
                                    placeholder="Select"
                                    size="large"
                                    @change="changeTrial(scope.$index)"
                                >
                                    <el-option
                                        v-for="item in clinStageArr"
                                        :key="item"
                                        :value="item"
                                    />
                                </el-select>
                            </template>
                            <template
                                v-if="key === 'clin_status'"
                                #default="scope"
                            >
                                <el-select
                                    v-model="trialTableData[scope.$index][key]"
                                    class="m-2"
                                    placeholder="Select"
                                    size="large"
                                    @change="changeTrial(scope.$index)"
                                >
                                    <el-option
                                        v-for="item in clinStatusArr"
                                        :key="item"
                                        :value="item"
                                    />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="role"
                            fixed="right"
                            width="250"
                            align="center"
                        >
                            <template #header>
                                <el-button
                                    type="success"
                                    class="w-3/4"
                                    size="large"
                                    style="font-size: 1.125rem"
                                    @click="createDialog"
                                    >添加试验</el-button
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
                                    type="danger"
                                    class="mt-2"
                                    style="
                                        margin-left: 0;
                                        margin-right: 0.5rem;
                                        width: 80px;
                                    "
                                    @click="deleteDialog(scope.$index)"
                                    >删除试验</el-button
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
        <el-dialog v-model="deleteDialogVisible" width="30%" center>
            <el-card class="box-card">
                <template #header>
                    <div class="text-center text-2xl font-semibold">
                        <span style="color: red">提示</span>
                    </div>
                </template>
                <div class="text-center text-xl font-semibold">
                    请确认是否删除“{{ deleteTitle }}”
                </div>
            </el-card>
            <template #footer>
                <el-button @click="deleteDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="danger" @click="deleteTrial">确 定</el-button>
            </template>
        </el-dialog>
    </layout>
</template>

<script setup lang="ts">
import layout from '../layout.vue';
import { ref } from 'vue';
import { trailsType } from '@/store/trials/type';
import { clinStatusType, clinStageType, selectOptionsType } from './type';
import useTrialsStore from '@/store/trials';
import trialCreateDialog from './trial-create-dialog.vue';
import trialDetailDialog from './trial-detail-dialog.vue';
import { trialApi } from '@/api/trials/trials';

const trialsStore = useTrialsStore();

// 检索
const searchNum = ref<number>(1);
const inputVal = ref<string[]>(['']);
const selectVal = ref<selectOptionsType[]>(['title']);
const selectOptions = ref<selectOptionsType[]>([
    'clin_status',
    'med_name',
    'title',
    'clin_stage',
    'ctr',
    'indication',
]);
const searchForm = ref<Record<selectOptionsType, string>>({
    clin_status: '',
    clin_stage: '',
    med_name: '',
    title: '',
    ctr: '',
    indication: '',
});

const addSearch = () => {
    searchNum.value++;
    selectVal.value.push('title');
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
    trialApi.searchTrial(searchForm.value).then((res) => {
        if (res.code === 200) {
            trialTableData.value = res.data;
        } else {
            ElMessage({
                type: 'error',
                message: res.msg,
            });
        }
        resetSearch();
        searchForm.value = {
            clin_status: '',
            clin_stage: '',
            med_name: '',
            title: '',
            ctr: '',
            indication: '',
        };
    });
};
// 表格数据
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

// 试验状态信息
const clinStatusArr = ref<string[]>([]);
for (let i in clinStatusType) {
    clinStatusArr.value.push(i);
}

// 试验分期信息
const clinStageArr = ref<string[]>([]);
for (let i in clinStageType) {
    clinStageArr.value.push(i);
}

// 修改试验分期信息或者试验状态
const changeTrial = (index: number) => {
    trialApi
        .changeTrial({
            ctr: trialTableData.value[index].ctr,
            clin_stage: trialTableData.value[index].clin_stage,
            clin_status: trialTableData.value[index].clin_status,
        })
        .then((res) => {
            if (res.code === 200) {
                ElMessage({
                    type: 'success',
                    message: '修改成功',
                });
            } else {
                ElMessage({
                    type: 'error',
                    message: res.msg,
                });
            }
            getAllTrials();
        });
};

// 添加试验
const createTrialVisible = ref<boolean>(false);
const createDialog = () => {
    createTrialVisible.value = false;
    setTimeout(() => {
        createTrialVisible.value = true;
    });
};

// 试验详情
const detailCtr = ref<string>('');
const detailTrialVisible = ref<boolean>(false);
const detailDialog = (index: number) => {
    detailCtr.value = trialTableData.value[index].ctr;
    detailTrialVisible.value = false;
    setTimeout(() => {
        detailTrialVisible.value = true;
    });
};

// 删除试验
const deleteDialogVisible = ref<boolean>(false);
const deleteCtr = ref<string>('');
const deleteTitle = ref<string>('');
const deleteDialog = (index: number) => {
    deleteCtr.value = trialTableData.value[index].ctr;
    deleteTitle.value = trialTableData.value[index].title;
    deleteDialogVisible.value = true;
};
const deleteTrial = () => {
    trialApi.deleteTrial({ ctr: deleteCtr.value }).then((res) => {
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            getAllTrials();
        } else {
            ElMessage({
                type: 'error',
                message: res.msg,
            });
        }
        deleteDialogVisible.value = false;
    });
};
</script>

<style lang="scss" scoped></style>
