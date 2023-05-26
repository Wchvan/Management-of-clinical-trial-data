<template>
    <el-dialog
        v-model="dialogVisible"
        destroy-on-close
        center
        :show-close="false"
        class="w-1/2"
        top="5%"
    >
        <template #header>
            <el-button-group class="w-full" size="large">
                <el-button
                    class="w-1/2"
                    :type="activeFlag ? 'primary' : ''"
                    @click="changeMethod"
                >
                    表单上传
                </el-button>
                <el-button
                    class="w-1/2"
                    :type="!activeFlag ? 'primary' : ''"
                    @click="changeMethod"
                >
                    文件上传
                </el-button>
            </el-button-group>
        </template>

        <upload-form
            v-if="activeFlag"
            @hiddenDialog="emits('hiddenDialog')"
        ></upload-form>
        <upload-file v-else @hiddenDialog="emits('hiddenDialog')"></upload-file>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import uploadFile from './components/uploadFile.vue';
import uploadForm from './components/uploadForm.vue';

const props = withDefaults(
    defineProps<{
        visible: boolean;
    }>(),
    {
        visible: false,
    },
);
const emits = defineEmits<{
    (e: 'hiddenDialog'): void;
}>();


// 判断是表单上传还是文件上传
const activeFlag = ref<boolean>(true);

// 定义一个变量接收传来的属性---子组件不能改变父组件的值
const dialogVisible = ref<boolean>(props.visible);
watch(
    () => props.visible,
    (newVal) => {
        dialogVisible.value = newVal;
    },
);

// 对话框头部相关
const changeMethod = () => {
    activeFlag.value = !activeFlag.value;
    console.log(activeFlag.value);
};
</script>

<style lang="scss" scoped></style>
