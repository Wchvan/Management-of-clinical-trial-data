export type formType = {
    name: string;
    region: string;
    date1: string;
    date2: string;
    delivery: boolean;
    type: Array<string>;
    resource: string;
    desc: string;
};

export type formKeyType = keyof formType;
