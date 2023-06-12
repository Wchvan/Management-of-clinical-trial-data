<template>
    <div class="wd100 ht100 login-bg">
        <div class="cover"></div>
        <el-card class="w-1/4 h-fit  opacity-90 login-card">
            <template #header>
                <div class="text-center">
                    <span className="text-3xl font-bold">登录</span>
                </div>
            </template>
            <div>
                <el-form
                    id="login-form"
                    ref="loginFormRef"
                    status-icon
                    :model="loginForm"
                    :rules="rules"
                >
                    <el-form-item prop="username">
                        <el-input
                            v-model="loginForm.username"
                            size="large"
                            placeholder="输入账号"
                            class="h-11"
                        >
                            <template #prepend>
                                <i-ep-user class="text-xl" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="loginForm.password"
                            size="large"
                            placeholder="输入密码"
                            class="h-11"
                            type="password"
                            show-password
                        >
                            <template #prepend>
                                <i-ep-lock class="text-xl" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox
                            v-model="loginForm.remember_me"
                            label="请记住我"
                            class="ml-2"
                        ></el-checkbox>
                        <div class="flex-grow"></div>
                        <el-popover
                            placement="top-start"
                            :width="180"
                            trigger="hover"
                            content="可以联系管理员修改密码"
                        >
                            <template #reference>
                                <el-link class="m-2">登录遇到问题？</el-link>
                            </template>
                        </el-popover>
                    </el-form-item>
                    <el-button
                        type="primary"
                        class="centerX w-1/2"
                        size="large"
                        round
                        @click="submitForm(loginFormRef)"
                        >登录</el-button
                    >
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { loginFormType } from './type';
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import useUserStore from '@/store/user';

const userStore = useUserStore();
const router = useRouter();

/* 提交的表单 */
const loginForm = reactive<loginFormType>({
    username: '',
    password: '',
    remember_me: false,
});

const loginFormRef = ref<FormInstance>();

/* 表单校验规则 */
const validateUser = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号！'));
    } else {
        callback();
    }
};

const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码!'));
    } else if (value.length < 6 || value.length > 12) {
        callback(new Error('密码长度为6到12位'));
    } else {
        callback();
    }
};

const rules = reactive<FormRules>({
    username: [{ validator: validateUser, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: '' }],
});

/* 提交表单函数 */
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid, error) => {
        if (valid) {
            userStore.login(loginForm).then((res) => {
                if (res.code === 200) {
                    router.push('/');
                } else {
                    ElMessage({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
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

<style lang="scss" scoped>
.login-bg {
    background: url('@/assets/login-bg.png') no-repeat center;
    background-size: 100% 100%;
}
.login-card{
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
}

.cover{
    background: rgba($color: #121212, $alpha: 0.5);
    // z-index: -;
    position: absolute;
    right: 0;
    width: 45%;
    height: 100%;
}
</style>
