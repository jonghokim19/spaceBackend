export default interface IVerificationCode{
    uuid: string;
    status: statusType;
    code: string;
    uid?: string;
    expireAt: Date;
    createdAt: Date;
};

export enum statusType {
    PROGRESS = 'progress',
    COMPLETE = 'complete'
}