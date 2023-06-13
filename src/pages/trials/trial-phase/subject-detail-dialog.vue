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
                    <span>受试者详情</span>
                </div>
            </template>
            <div
                v-for="(item, key, index) in examineeLabels"
                :key="key"
                class="text-lg py-2 flex flex-row"
            >
                <div class="w-44 mr-3">{{ item }}:</div>
                <span
                    v-if="!inputFlag[index]"
                    @click="inputFlag[index] = true"
                    >{{ exmaineeData[key] }}</span
                >
                <el-input
                    v-if="inputFlag[index]"
                    v-model="exmaineeData[key]"
                    style="font-size: 1.125rem"
                    @blur="inputFlag[index] = false"
                    @change="changeFlag = true"
                ></el-input>
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
import { ElMessage } from 'element-plus';
import { watch, ref, reactive } from 'vue';
import { examineeApi } from '@/api/examinee/examinee';
import { exmaineeDetailType } from './type';
import { getExamineeDetailParm } from '@/api/examinee/type';

const emit = defineEmits<{
    (e: 'update'): void;
}>();

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
    parms: getExamineeDetailParm;
}>();
watch(
    () => props.visible,
    (newVal) => {
        centerDialogVisible.value = newVal;
        changeFlag.value = false;
    },
);

/* 获取数据 */
const exmaineeData = ref<exmaineeDetailType>({
    address: '',
    age: '',
    allergen: '',
    gender: '',
    genetic: '',
    handedness: '',
    id_num: '',
    med_history: '',
    name: '',
    subject_id: '',
    tel: '',
    treat: '',
});
const params = ref<getExamineeDetailParm>(props.parms);
watch(
    () => props.parms,
    (newVal) => {
        params.value = newVal;
        getExamineeDetail()
    },
);

const getExamineeDetail = () => {
    examineeApi.getExamineeDetail(params.value).then((res) => {
        if (res.code === 200) {
            exmaineeData.value = res.data;
        } else {
            ElMessage({
                type: 'error',
                message: res.msg,
            });
        }
    });
}
getExamineeDetail()

/* 标签 */
const examineeLabels = ref<Record<keyof exmaineeDetailType, string>>({
    subject_id: '受试者编号',
    name: '姓名',
    gender: '性别',
    age: '年龄',
    address: '地址',
    id_num: '身份证号',
    tel: '电话',
    allergen: '过敏原',
    genetic: '家族遗传病史',
    handedness: '利手',
    med_history: '病史',
    treat: '治疗',
});

/* 修改相关 */
const inputFlag = ref<boolean[]>(
    new Array(Object.keys(examineeLabels.value).length).fill(false),
); // 用于判断是span还是input框
const changeFlag = ref<boolean>(false);
const handleSubmit = () => {
    if (changeFlag.value === true) {
        examineeApi
            .changeExamineeInfo({
                subject_id: params.value.subject_id,
                ctr: params.value.ctr,
                info: exmaineeData.value,
            })
            .then((res) => {
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
    } else {
        centerDialogVisible.value = false;
    }
};
</script>

<style lang="scss" scoped></style>
