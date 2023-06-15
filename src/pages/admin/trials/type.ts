export type trialDetailType = {
    clin_stage: string;
    clin_status: string;
    contact: string;
    ctr: string;
    company: string;
    indication: string;
    med_name: string;
    reg_date: string;
    reg_location: string;
    sponsor: string;
    title: string;
};

export type selectOptionsType =
    | 'clin_status'
    | 'med_name'
    | 'title'
    | 'clin_stage'
    | 'ctr'
    | 'indication';

export enum clinStatusType {
    ActiveNotRecruiting = 'Active, not recruiting',
    ApprovedForMarketing = 'Approved for marketing',
    Available = 'Available',
    Completed = 'Completed',
    EnrollingByInvitation = 'Enrolling by invitation',
    NoLongerAvailable = 'No longer available',
    NotYetRecruiting = 'Not yet recruiting',
    Other = 'Other',
    Recruiting = 'Recruiting',
    Suspended = 'Suspended',
    TemporarilyNotAvailable = 'Temporarily not available',
    Terminated = 'Terminated',
    Withdrawn = 'Withdrawn',
}

export enum clinStageType {
    phase1 = 'phase1',
    phase2 = 'phase2',
    phase3 = 'phase3',
    phase4 = 'phase4',
}
