export type examineeDataType = {
    age: number;
    gender: string;
    last_medicine: string;
    subject_id: string;
};

export type exmaineeDetailType = {
    address: string;
    age: string;
    allergen: string;
    gender: string;
    genetic: string;
    handedness: string;
    id_num: string;
    med_history: string;
    name: string;
    subject_id: string;
    tel: string;
    treat: string;
};

export type selectOptionsType = 'subject_id' | 'name' | 'gender' | 'age';
