export default interface BaseResponse {
    isSuccess: boolean;
    isEncrypted: boolean;
    errors: Array<string>;
    result?: any;
}
