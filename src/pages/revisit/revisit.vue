<template>
    <el-container>
        <el-header class="h-fit flex flex-row justify-around">
            <div class="w-4/5">
                <el-input
                    v-model="searchVal"
                    placeholder="请输入病人编号"
                    size="large"
                    class="mb-3"
                >
                    <template #append>
                        <el-button
                            id="search"
                            type="primary"
                            @click="handleSearch"
                        >
                            <i-ep-search></i-ep-search>
                        </el-button>
                    </template>
                </el-input>
            </div>
            <div class="w-1/6">
                <el-button class="w-full" type="primary" size="large" round>
                    随机抽取</el-button
                >
            </div>
        </el-header>
        <el-main>
            <el-card class="box-card">
                <template #header>
                    <div class="flex flex-row justify-center">
                        <span class="text-2xl font-semibold">病人简历</span>
                    </div>
                </template>
                <el-container>
                    <el-main class="flex flex-col justify-center p-0">
                        <div
                            v-for="o in 10"
                            :key="o"
                            class="text-center text-lg"
                        >
                            {{ '简历信息 ' + o }}
                        </div>
                    </el-main>
                    <el-footer class="flex flex-row justify-center pt-5">
                        <el-button
                            class="w-1/3"
                            round
                            type="danger"
                            size="large"
                            >删除病人简历</el-button
                        >
                        <el-button
                            class="w-1/3"
                            round
                            type="success"
                            size="large"
                            >完善病人简历</el-button
                        >
                    </el-footer>
                </el-container>
            </el-card>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 搜索相关
const searchVal = ref<string>('');
const handleSearch = () => {
    console.log(searchVal.value);
};
</script>

<style lang="scss" scoped></style>
