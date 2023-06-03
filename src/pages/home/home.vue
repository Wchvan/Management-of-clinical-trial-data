<template>
    <el-container>
        <el-header  style="box-shadow: 0px 2px #eee; padding: 0;">
            <top-nav></top-nav>
        </el-header>
        <el-container class="h-full w-full mt-2 bg-gray-200" style="flex-direction: column">
            <div class="flex-1 w-full flex flex-row mb-5">
                <el-card
                    class="w-fit text-3xl font-bold underline flex-1 mr-10 h-full"
                >
                    LOGO
                </el-card>
                <el-card
                    class="w-fit text-3xl font-bold underline flex-1 h-full"
                >
                    特色功能
                </el-card>
            </div>
            <div class="flex-1 w-full">
                <el-card
                    class="w-full text-3xl font-bold underline flex-1 mr-10 h-full"
                >
                    表格
                </el-card>
            </div>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import topNav from '@/components/topNav.vue';
</script>

<style lang="scss" scoped></style>
