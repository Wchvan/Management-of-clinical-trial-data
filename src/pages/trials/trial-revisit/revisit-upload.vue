<template>
    <el-container class="w-full h-fit">
        <el-header>
            <el-steps
                finish-status="success"
                simple
                style="margin-top: 20px"
                :active="active"
            >
                <el-step title="上传随访安排" />
                <el-step title="监测随访安排" />
                <el-step title="上传随访数据" />
                <el-step title="监测随访数据" />
            </el-steps>
        </el-header>
        <el-main>
            <el-upload
                v-if="active % 2 !== 0"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
            <el-table
                v-else
                style="width: 100%"
                size="large"
                header-row-class-name="text-xl font-bold"
                row-class-name="text-lg font-semibold"
            >
                <el-table-column prop="date" label="文件编号" align="center" />
                <el-table-column prop="date" label="检测状态" align="center" />
            </el-table>
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
                :disabled="active === 4"
                @click="next"
            >
                下一步
            </el-button>
        </el-footer>
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
