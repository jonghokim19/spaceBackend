import ICounselor from "../counselor/ICounselor";

export default interface IInquire {
    uuid: string;
    name: string;
    locationUuid?: string;
    clientPhone?: string;
    privacyConsent: boolean;
    device: string;
    ip: string;
    counselorUid: string;
    createdAt: Date;
    counselorInfo: ICounselor;
};
