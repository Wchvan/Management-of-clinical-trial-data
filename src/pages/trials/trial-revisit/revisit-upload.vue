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
                    <el-step title="上传随访安排" />
                    <el-step title="上传随访数据" />
                </el-steps>
            </el-header>
            <el-main>
                <el-upload
                    drag
                    action="/experiment/upload-followup-xls"
                    multiple
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

// 当前步骤
const active = ref<number>(1);

// 管理步骤
const pre = () => {
    active.value--;
};
const next = () => {
    active.value++;
};
</script>

<style lang="scss" scoped></style>
