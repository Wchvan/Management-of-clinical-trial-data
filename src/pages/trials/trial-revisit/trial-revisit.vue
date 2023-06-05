<template>
    <el-container>
        <el-header style="padding: 0">
            <top-nav></top-nav>
        </el-header>
        <el-container>
            <el-aside class="h-full" width="12rem">
                <el-menu
                    :default-active="activeIndex"
                    class="h-full"
                    background-color="#0095B6"
                    active-text-color="#8B0000"
                    @select="handleSelect"
                >
                    <el-menu-item
                        index="date"
                        class="justify-center flex flex-row"
                        style="padding: 2.5rem 0"
                    >
                        <template #title>
                            <div
                                class="text-xl text-center"
                                style="
                                    display: inline-flex;
                                    align-items: center;
                                "
                            >
                                <i-ep-Calendar></i-ep-Calendar>
                                <span>时间表</span>
                            </div>
                        </template>
                    </el-menu-item>
                    <el-menu-item
                        index="upload"
                        class="justify-center flex flex-row"
                        style="padding: 2.5rem 0"
                    >
                        <template #title>
                            <div
                                class="text-xl text-center"
                                style="
                                    display: inline-flex;
                                    align-items: center;
                                "
                            >
                            <i-ep-Upload></i-ep-Upload>
                                <span>上传</span>
                            </div>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-main style="padding: 5px 10px" class="bg-gray-50">
                <revisit-calender v-if="activeIndex==='date'"></revisit-calender>
                <revisit-upload v-else></revisit-upload>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import topNav from '@/components/topNav.vue';
import revisitCalender from './revisit-calender.vue';
import revisitUpload from './revisit-upload.vue';
import { ref } from 'vue';

const activeIndex = ref<string>('date');
// 菜单选择回调
const handleSelect = (index: string) => {
    activeIndex.value = index
}
</script>

<style lang="scss" scoped></style>

