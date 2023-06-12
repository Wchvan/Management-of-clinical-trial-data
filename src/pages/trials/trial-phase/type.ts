export type examineeDataType = {
    age: number;
    gender: string;
    last_medicine: string;
    subject_id: string;
};

export type exmaineeDetailType = {
    /**
     * 地址
     */
    address: string;
    /**
     * 年龄
     */
    age: string;
    /**
     * 过敏原，可变
     */
    allergen: string;
    /**
     * 性别
     */
    gender: string;
    /**
     * 家族遗传病史，可变
     */
    genetic: string;
    /**
     * 利手，可变
     */
    handedness: string;
    /**
     * 身份证号
     */
    id_num: string;
    /**
     * 病史，可变
     */
    med_history: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 受试者编号
     */
    subject_id: string;
    /**
     * 电话
     */
    tel: string;
    /**
     * 治疗，可变
     */
    treat: string;
};
