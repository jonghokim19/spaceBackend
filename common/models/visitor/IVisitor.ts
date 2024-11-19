export default interface IVisitor {
    uuid: string;
    ip?: string;
    os?: string;
    device?: string;
    searchEngine?: string;
    searchKeyword?: string;
    createdAt: Date;
};
