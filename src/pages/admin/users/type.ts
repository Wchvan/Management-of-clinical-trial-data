export type usersType = {
    id: string;
    name: string;
    username: string;
    phone: string;
    role: 'ADMIN' | 'USER' | 'BANNED';
};

export type createUserType = {
    name: string;
    username: string;
    phone: string;
    role: 'ADMIN' | 'USER' | 'BANNED';
};

export type selectOptionsType = 'username' | 'role' | 'name' | 'phone';
