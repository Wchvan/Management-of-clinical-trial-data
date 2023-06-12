<template>
    <el-container class="w-full h-fit txl">
        <el-card>
            <el-header style="padding-bottom: 0; margin-top: 1rem">
                <el-input
                    v-model="inputVal"
                    placeholder="Please input"
                    class="input-with-select"
                    size="large"
                >
                    <template #prepend>
                        <el-select
                            v-model="selectVal"
                            placeholder="Select"
                            style="width: 115px"
                            size="large"
                        >
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
                <el-table
                    ref="tableRef"
                    row-key="date"
                    :data="examineeData"
                    style="width: 100%"
                    max-height="800"
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
                        width="300"
                    />
                    <el-table-column
                        prop="role"
                        fixed="right"
                        width="200"
                        label="操作"
                        align="center"
                    >
                        <el-button type="primary" class="w-3/4" size="large"
                            >查看详情</el-button
                        >
                    </el-table-column>
                </el-table>
            </el-main>
        </el-card>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { examineeApi } from '@/api/examinee/examinee';
import { examineeDataType } from './type';

const route = useRoute();

const inputVal = ref<string>();
const selectVal = ref<string>();

/* 做路由判断 */
const [, , trialId, trialStep] = [...route.path.split('/')];

/* 受试者基本信息 */
const examineeData = ref<examineeDataType[]>([]);

const examineeLabels = ref<Record<keyof examineeDataType, string>>({
    subject_id: '受试者编号',
    gender: '性别',
    age: '年龄',
    last_medicine: '上次用药时间',
});

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
</script>

<style lang="scss" scoped></style>
