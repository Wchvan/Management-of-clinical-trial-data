<template>
    <el-container>
        <el-header style="box-shadow: 0px 2px #eee; padding: 0">
            <top-nav></top-nav>
        </el-header>
        <el-container class="h-full w-full mt-2 bg-gray-200" style="flex-direction: column">
            <div class="h-2/5 w-full flex flex-row mb-5">
                <el-card class="w-fit text-3xl font-bold underline flex-1 mr-10 h-full">
                    LOGO
                </el-card>
                <el-card class="w-fit text-3xl font-bold underline flex-1 h-full">
                    特色功能
                </el-card>
            </div>
            <div class="h-3/5 w-full">
                <el-table ref="tableRef" row-key="date" :data="trialTableData" style="width: 100%" size="large" 
                    header-row-class-name="text-xl font-bold" row-class-name="text-lg font-semibold">
                    <el-table-column v-for="item in tableLabels" :prop="item" :label="item" align="center" width="200" :key="item"/>
                    <el-table-column prop="role"  fixed="right" width="180" >
                        <template #header>
                            <div class=" text-center">分期详情</div>
                        </template>
                        <template #default="scope">
                                <el-button v-for="item in  Number(trialTableData[scope.$index].试验分期.slice(-1))" :key="item" 
                            :type="['primary','success','warning','danger'][item-1]"
                            @click="trialDetail(scope.$index, item)" class=" mt-2 " style="margin-left: 0; margin-right: 0.5rem; width: 60px;">{{ item === 4 ? '随访'  : `${item}期` }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import topNav from '@/components/topNav.vue';
import { ref } from 'vue';
import { trailsType } from '@/store/trials/type'
import useTrialsStore from '@/store/trials';
import { useRouter } from 'vue-router';

const router = useRouter()
const trialsStore = useTrialsStore()

const trialTableData = ref<trailsType[]>([])

trialsStore.getAllTrials().then(res => {
    trialTableData.value = trialsStore.trials
})

// 表头
const tableLabels = ref<string[]>(['_id', '试验题目', '药物名称', '试验状态', '试验分期', '申办者', '登记日期', '企业名称', '企业联系人', '企业注册地址'])

// 查看分期详情
const trialDetail = (index: number, phase: number) => {
    router.push(`/trials/${trialTableData.value[index]._id}/${phase}`)
}
</script>

<style lang="scss" scoped></style>
