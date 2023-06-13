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
                    <span>预约信息</span>
                </div>
            </template>
            <div v-for="(item, index) in labelMap" :key="index" class="text-lg">
                {{ item + ': ' }}{{ data[current - 1][index] }}
            </div>
        </el-card>
        <template #footer>
            <div class="flex flex-row justify-center">
                <el-pagination
                    v-model:current-page="current"
                    layout="prev, pager, next"
                    :total="data.length"
                    :default-page-size="1"
                    style="width: fit-content"
                />
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue';
import { subjectInfo } from './type';

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
    data: subjectInfo[];
}>();
watch(
    () => props.visible,
    (newVal) => {
        centerDialogVisible.value = newVal;
    },
);

// 对key值进行映射
const labelMap = ref<subjectInfo>({
    subjectID: '受试者id',
    phone: '电话号码',
    address: '地址',
    date: '日期',
    time: '时间',
    userID: '负责人id',
    name: '负责人名称',
});

/* 当前页数 */
const current = ref<number>(1);
</script>

<style lang="scss" scoped></style>
