<template>
    <el-container class="bg-gray-200">
        <el-header style="box-shadow: 0px 2px #eee; padding: 0">
            <top-nav></top-nav>
        </el-header>
        <el-container
            class="h-full w-full  "
            style="flex-direction: column"
        >
            <div class="h-2/5 w-full flex flex-row mb-3 mt-1">
                <el-image :src="adBg" style="width: 100%; height: 100%;"></el-image>
            </div>
            <div class="h-3/5 w-full">
                <el-table
                    ref="tableRef"
                    row-key="date"
                    :data="trialTableData"
                    style="width: 100%"
                    max-height="400"
                    size="large"
                    header-row-class-name="text-xl font-bold"
                    row-class-name="text-lg font-semibold cursor-point"
                    @row-click="showTrialDetail"
                >
                    <el-table-column
                        v-for="(item, key) in tableLabels"
                        :key="key"
                        :prop="key"
                        :label="item"
                        align="center"
                        width="250"
                    />
                    <el-table-column prop="role" fixed="right" width="180">
                        <template #header>
                            <div class="text-center">分期详情</div>
                        </template>
                        <template #default="scope">
                            <el-button
                                v-for="item in Number(
                                    trialTableData[scope.$index].clin_stage.slice(
                                        -1,
                                    ),
                                )"
                                :key="item"
                                :type="
                                    ['primary', 'success', 'warning', 'danger'][
                                        item - 1
                                    ]
                                "
                                class="mt-2"
                                style="
                                    margin-left: 0;
                                    margin-right: 0.5rem;
                                    width: 60px;
                                "
                                @click="trialDetail(scope.$index, item)"
                                >{{
                                    item === 4 ? '随访' : `${item}期`
                                }}</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-container>
    </el-container>
    <trial-detail-dialog 
        :visible="detailTrialVisible"  
        :ctr = "detailCtr" 
    ></trial-detail-dialog>
</template>

<script setup lang="ts">
import topNav from '@/components/topNav.vue';
import { ref } from 'vue';
import { trailsType } from '@/store/trials/type';
import useTrialsStore from '@/store/trials';
import { useRouter } from 'vue-router';
import adBg from '@/assets/ad-bg.png'
import trialDetailDialog from './trial-detail-dialog.vue';

const router = useRouter();
const trialsStore = useTrialsStore();

const trialTableData = ref<trailsType[]>([]);

trialsStore.getAllTrials().then((res) => {
    trialTableData.value = trialsStore.trials;
});

// 表头
const tableLabels = ref<Record<keyof trailsType, string>>({
    ctr:'登记号',
    title: '试验题目',
    clin_stage: '试验分期',
    clin_status: '试验状态',
    indication: '适应症',
    med_name: '药物名称',
});

// 查看实验详情
const detailTrialVisible = ref<boolean>(false)
const detailCtr = ref<string>('')
const showTrialDetail = (row: trailsType, column: any) => {
    if (column.label !== '分期详情') {
        detailCtr.value = row.ctr
        detailTrialVisible.value = false;
        setTimeout(() => {
            detailTrialVisible.value = true;
        });
    }
}

// 查看分期详情
const trialDetail = (index: number, phase: number) => {
    router.push(`/trials/${trialTableData.value[index].ctr}/${phase}`);
};

</script>

<style lang="scss" scoped></style>
