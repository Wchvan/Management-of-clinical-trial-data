<template>
    <el-container class="w-full h-fit txl">
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
                                    :label="optionLabels[item]"
                                    :value="item"
                                />
                            </el-select>
                        </template>
                        <template #append>
                            <el-button-group>
                                <el-button
                                    style="border-right: 1.5px solid #a8abb2"
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
            <el-main>
                <el-table
                    ref="tableRef"
                    row-key="date"
                    :data="examineeData"
                    style="width: 100%"
                    max-height="500"
                    size="large"
                    header-row-class-name="text-xl font-bold"
                    row-class-name="text-lg font-semibold"
                >
                    <el-table-column
                        v-for="(item, key) in examineeLabels"
                        :key="key"
                        :prop="key"
                        :label="item"
                        align="center"
                        width="280"
                    />
                    <el-table-column
                        prop="role"
                        fixed="right"
                        width="250"
                        label="操作"
                        align="center"
                    >
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
                                >删除受试者</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-card>
    </el-container>
    <subject-detail-dialog
        :visible="detailDialogVisble"
        :parms="detailParm"
        @update="getSubjects()"
    >
    </subject-detail-dialog>
    <el-dialog v-model="deleteDialogVisible" width="30%" center>
        <el-card class="box-card">
            <template #header>
                <div class="text-center text-2xl font-semibold">
                    <span style="color: red">提示</span>
                </div>
            </template>
            <div class="text-center text-xl font-semibold">
                请确认是否删除“{{ deleteId }}”
            </div>
        </el-card>
        <template #footer>
            <el-button @click="deleteDialogVisible = false">取 消</el-button>
            <el-button type="danger" @click="deleteTrial">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { examineeApi } from '@/api/examinee/examinee';
import { getExamineeDetailParm } from '@/api/examinee/type';
import { examineeDataType, selectOptionsType } from './type';
import subjectDetailDialog from './subject-detail-dialog.vue';

const route = useRoute();

/* 做路由判断 */
const [, , trialId, trialStep] = [...route.path.split('/')];

// 检索
const searchNum = ref<number>(1);
const inputVal = ref<string[]>(['']);
const selectVal = ref<selectOptionsType[]>(['subject_id']);
const selectOptions = ref<selectOptionsType[]>([
    'subject_id',
    'name',
    'gender',
    'age',
]);
const searchForm = ref<Record<selectOptionsType, string>>({
    subject_id: '',
    name: '',
    gender: '',
    age: '',
});

const addSearch = () => {
    searchNum.value++;
    selectVal.value.push('subject_id');
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
    examineeApi
        .searchExaminee({
            ctr: trialId,
            clin_stage: trialStep,
            ...searchForm.value,
        })
        .then((res) => {
            if (res.code === 200) {
                examineeData.value = res.data;
            } else {
                ElMessage({
                    type: 'error',
                    message: res.msg,
                });
            }
            resetSearch();
            searchForm.value = {
                subject_id: '',
                name: '',
                gender: '',
                age: '',
            };
        });
};

const optionLabels = ref<Record<selectOptionsType, string>>({
    subject_id: '受试者编号',
    name: '受试者姓名',
    gender: '性别',
    age: '年龄',
});

/* 受试者基本信息 */
const examineeData = ref<examineeDataType[]>([]);

const examineeLabels = ref<Record<keyof examineeDataType, string>>({
    subject_id: '受试者编号',
    gender: '性别',
    age: '年龄',
    last_medicine: '上次用药时间',
});

const getSubjects = () => {
    examineeApi
        .getAllExaminee({ ctr: trialId, clin_stage: trialStep })
        .then((res) => {
            if (res.code === 200) {
                examineeData.value = res.data;
            } else {
                ElMessage({
                    type: 'error',
                    message: res.msg,
                });
            }
        });
};

getSubjects();

/* 查看用户详情 */
const detailDialogVisble = ref<boolean>(false);
const detailParm = ref<getExamineeDetailParm>();
const detailDialog = (index: number) => {
    detailDialogVisble.value = false;
    detailParm.value = {
        subject_id: examineeData.value[index].subject_id,
        ctr: trialId,
        clin_stage: trialStep,
    };
    setTimeout(() => {
        detailDialogVisble.value = true;
    }, 50);
};

// 删除受试者
const deleteDialogVisible = ref<boolean>(false);
const deleteId = ref<string>('');
const deleteDialog = (index: number) => {
    deleteId.value = examineeData.value[index].subject_id;
    deleteDialogVisible.value = false;
    setTimeout(() => {
        deleteDialogVisible.value = true;
    });
};
const deleteTrial = () => {
    examineeApi
        .deleteExaminee({
            ctr: trialId,
            clin_stage: trialStep,
            subject_id: deleteId.value,
        })
        .then((res) => {
            if (res.code === 200) {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                });
                getSubjects();
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
