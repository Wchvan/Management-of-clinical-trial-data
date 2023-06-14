<template>
    <el-container class="w-full h-fit">
        <el-card class="w-full h-full">
            <el-header>
                <el-steps
                    finish-status="success"
                    simple
                    style="margin-top: 20px"
                    :active="active"
                >
                    <el-step title="上传受试者信息" />
                    <el-step title="上传试验数据" />
                </el-steps>
            </el-header>
            <el-main>
                <el-upload
                    v-if="active === 1"
                    drag
                    action="#"
                    accept=".xlsx, .xls"
                    :on-exceed="exceedFile"
                    :on-error="handleError"
                    :on-success="handleSuccess"
                    :http-request="uploadExcel"
                    :before-upload="beforeUPload"
                    :show-file-list="true"
                    :limit="1"
                >
                    <i-ep-uploadFilled
                        class="text-8xl center mt-36"
                        style="color: skyblue"
                    ></i-ep-uploadFilled>
                    <div class="el-upload__text mb-36">
                        Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                        <div style="color: red">只支持excel文件</div>
                    </template>
                </el-upload>
                <el-upload
                    v-else
                    drag
                    action="#"
                    accept=".xlsx, .xls"
                    :on-exceed="exceedFile"
                    :on-error="handleError"
                    :on-success="handleSuccess"
                    :http-request="uploadExcel"
                    :before-upload="beforeUPload"
                    :show-file-list="true"
                    :limit="1"
                >
                    <i-ep-uploadFilled
                        class="text-8xl center mt-36"
                        style="color: skyblue"
                    ></i-ep-uploadFilled>
                    <div class="el-upload__text mb-36">
                        Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                        <div style="color: red">只支持excel文件</div>
                    </template>
                </el-upload>
            </el-main>
            <el-footer class="flex flex-row justify-center">
                <el-button
                    type="danger"
                    class="w-1/5"
                    size="large"
                    round
                    :disabled="active === 1"
                    @click="pre"
                >
                    上一步
                </el-button>
                <el-button
                    type="success"
                    class="w-1/5"
                    size="large"
                    round
                    :disabled="active === 2"
                    @click="next"
                >
                    下一步
                </el-button>
            </el-footer>
        </el-card>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';
import { examineeApi } from '@/api/examinee/examinee';
import { useRoute } from 'vue-router';
const route = useRoute();
/* 做路由判断 */
const [, , trialId, trialStep] = [...route.path.split('/')];
// 当前步骤
const active = ref<number>(1);

// 管理步骤
const pre = () => {
    active.value--;
};
const next = () => {
    active.value++;
};

/* const handleSuccess = (res: any) => {
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '上传成功',
        });
    } else {
        ElMessage({
            type: 'error',
            message: res.msg,
        });
    }
};

const handleError = () => {
    ElMessage({
        type: 'error',
        message: '上传出现问题',
    });
}; */
const beforeUPload = (file: any) => {
    const isExcel =
        file.type === 'application/vnd.ms-excel' ||
        file.type ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isExcel)
        ElMessageBox({
            title: '温馨提示',
            message: '上传文件只能是 xls / xlsx 格式！',
            type: 'warning',
        });
    if (!isLt2M)
        ElMessageBox({
            title: '温馨提示',
            message: '上传文件大小不能超过 20MB!',
            type: 'warning',
        });
    return isExcel && isLt2M;
};
// 文件数超出提示
const exceedFile = () => {
    ElMessage.warning('最多只能上传一个文件！');
};
// 上传错误提示
const handleError = () => {
    ElMessage.error('导入数据失败，请您重新上传！');
};

//上传成功提示
const handleSuccess = () => {
    ElMessage.success('导入数据成功！');
};
// 文件上传
const uploadExcel = async (param: any) => {
    let fileFormData = new FormData();
    fileFormData.append('file', param.file);
    //导入公用人事考勤数据
    if (active.value === 1) {
        const res = await examineeApi.postExmainee({
            ctr: trialId,
            clin_stage: trialStep,
            file: fileFormData,
        });
        if (res.code !== 200) {
            ElMessage({
                type: 'error',
                message: res.msg,
            });
        }
    } else {
        const res = await examineeApi.postTrialData({
            ctr: trialId,
            clin_stage: trialStep,
            file: fileFormData,
        });
        if (res.code !== 200) {
            ElMessage({
                type: 'error',
                message: res.msg,
            });
        }
    }
};
</script>

<style lang="scss" scoped></style>
