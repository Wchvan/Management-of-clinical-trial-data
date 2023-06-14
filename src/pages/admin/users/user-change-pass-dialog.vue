<template>
    <el-dialog
        v-model="centerDialogVisible"
        width="30%"
        top="20%"
        center
        destroy-on-close
    >
        <template #header>
            <div class="text-center">
                <span className="text-2xl font-bold">修改密码</span>
            </div>
        </template>
        <el-form
            id="pass-form"
            ref="changePassFormRef"
            status-icon
            :model="changePassForm"
            :rules="rules"
        >
            <el-form-item prop="pass">
                <el-input
                    v-model="changePassForm.pass"
                    size="large"
                    placeholder="输入密码"
                    class="h-11"
                    type="password"
                >
                    <template #prepend>
                        <span class="w-14 text-center">密码</span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input
                    v-model="changePassForm.checkPass"
                    size="large"
                    placeholder="再次输入密码"
                    class="h-11"
                    type="password"
                    show-password
                >
                    <template #prepend>
                        <span class="w-14 text-center">确认密码</span>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button size="large" @click="handleCancel">取消</el-button>
                <el-button
                    type="primary"
                    size="large"
                    @click="handleSubmit(changePassFormRef)"
                >
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import useUserStore from '@/store/user';
import { reactive, ref, watch } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { usersType } from './type';

const userStore = useUserStore();

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
    data: usersType | undefined;
}>();
watch(
    () => props.visible,
    (newVal) => {
        centerDialogVisible.value = newVal;
    },
);

/* 获取数据 */
const userData = ref<usersType>({
    id: '',
    name: '',
    phone: '',
    username: '',
    role: 'ROLE_USER',
});
watch(
    () => props.data,
    (newVal) => {
        Object.assign(userData.value, newVal);
    },
);

const changePassFormRef = ref<FormInstance>();
const changePassForm = ref<{ pass: string; checkPass: string }>({
    pass: '',
    checkPass: '',
});
// 表单校验规则
const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请确认密码!'));
    } else if (value.length < 6 || value.length > 12) {
        callback(new Error('密码长度为6到12位'));
    } else {
        callback();
    }
};

const validateCheckPass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请再次确认密码!'));
    } else if (value !== changePassForm.value.pass) {
        callback(new Error('两次密码不一致'));
    } else {
        callback();
    }
};

const rules = reactive<FormRules>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validateCheckPass, trigger: '' }],
});

const handleCancel = () => {
    centerDialogVisible.value = false;
    changePassForm.value = {
        pass: '',
        checkPass: '',
    };
};

const handleSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid, error) => {
        if (valid) {
            userStore
                .changePass({
                    username: userData.value.username,
                    password: changePassForm.value.pass,
                })
                .then((res) => {
                    console.log(res);
                    if (res.code === 200) {
                        ElMessage({
                            showClose: true,
                            message: '修改密码成功',
                            type: 'success',
                            duration: 1000,
                        });
                        changePassForm.value = {
                            pass: '',
                            checkPass: '',
                        };
                        centerDialogVisible.value = false;
                    } else {
                        ElMessage({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                            duration: 1000,
                        });
                    }
                });
        } else {
            console.log('error submit!');
            return false;
        }
    });
};
</script>

<style lang="scss" scoped></style>
