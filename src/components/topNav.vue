<template>
    <div
        class="h-full w-full flex flex-row justify-between bg-BD border-b-2 border-y-white"
    >
        <div
            class="flex flex-row py-1 flex-2"
            style="cursor: pointer"
            @click="$router.push('/')"
        >
            <img :src="logoSrc" class="w-20 h-12" />
            <div class="self-center">
                <span
                    class="self-center ml-2 text-4xl font-fz"
                    style="color: #fff"
                    >数研药盾
                </span>
                <span
                    class="self-center ml-2 text-2xl font-xk"
                    style="color: #fff"
                    >|加密守护，开启医药研发新纪元
                </span>
            </div>
        </div>
        <div class="text-center py-2 flex-1 justify-center flex">
            <span class="leading-10 text-4xl font-bold" style="color: #fff">{{
                $route.meta.title
            }}</span>
        </div>
        <div class="text-center pt-1 flex-1 justify-end flex">
            <el-dropdown>
                <el-avatar
                    class="mr-8 text-2xl"
                    style="
                        background-color: #409eff;
                        font-size: 1.5rem;
                        width: 3rem;
                        height: 3rem;
                    "
                    >{{ userStore.userName[0] }}</el-avatar
                >
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            disabled
                            class="text-xl justify-center"
                            style="
                                color: #121212;
                                cursor: inherit;
                                border-bottom: 1px solid #ccc;
                                font-size: 1.25rem;
                                padding-bottom: 0.5rem;
                            "
                        >
                            {{ userStore.userName }}
                        </el-dropdown-item>
                        <el-dropdown-item
                            v-if="userStore.userRole === 'ROLE_ADMIN'"
                            style="
                                padding-top: 0.75rem;
                                padding-bottom: 0.75rem;
                                font-size: 1rem;
                                line-height: 1.5rem;
                            "
                            @click="$router.push('/admin-trials')"
                            >管理界面</el-dropdown-item
                        >
                        <el-dropdown-item
                            style="
                                padding-top: 0.75rem;
                                padding-bottom: 0.75rem;
                                font-size: 1rem;
                                line-height: 1.5rem;
                            "
                            @click="centerDialogVisible = true"
                            >修改密码</el-dropdown-item
                        >
                        <el-dropdown-item
                            style="
                                padding-top: 0.75rem;
                                padding-bottom: 0.75rem;
                                font-size: 1rem;
                                line-height: 1.5rem;
                            "
                            @click="logout"
                            >退出登录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <el-dialog
            v-model="centerDialogVisible"
            width="30%"
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
                    <el-button size="large" @click="handleCancel"
                        >取消</el-button
                    >
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
    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/user';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import logoSrc from '@/assets/EClogo.png';

const userStore = useUserStore();
const router = useRouter();

/* 头部导航栏相关 */

// 退出登录相关
const logout = () => {
    userStore.logout();
    router.push('/login');
};

/* 修改密码相关 */
const centerDialogVisible = ref<boolean>(false);
const changePassForm = ref<{ pass: string; checkPass: string }>({
    pass: '',
    checkPass: '',
});
const changePassFormRef = ref<FormInstance>();
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
                    username: userStore.userName,
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
