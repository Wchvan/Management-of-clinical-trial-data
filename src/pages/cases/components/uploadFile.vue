<template>
    <el-container class="w-full h-fit">
        <el-main class="w-full h-full">
            <el-upload
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
                class="w-full h-full"
            >
                <i-ep-upload-filled
                    class="w-20 h-20 centerX"
                    style="color: #409eff"
                ></i-ep-upload-filled>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div
                        class="text-sm"
                        style="color: rgba(218, 32, 32, 0.868)"
                    >
                        *只支持EXCEL格式
                    </div>
                </template>
            </el-upload>
        </el-main>
        <el-footer>
            <el-button
                type="success"
                size="large"
                class="w-1/2 centerX"
                round
                @click="emits('hiddenDialog')"
                >上传完成</el-button
            >
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
const emits = defineEmits<{
    (e: 'hiddenDialog'): void;
}>();
</script>

<style lang="scss" scoped></style>
