export type usersType = {
    id: string;
    name: string;
    username: string;
    phone: string;
    role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_BANNED';
};

export type createUserType = {
    name: string;
    username: string;
    phone: string;
    role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_BANNED';
};

export type selectOptionsType = 'username' | 'role' | 'name' | 'phone';
