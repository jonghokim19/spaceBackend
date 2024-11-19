import CODE from "./code";
import InternalError from "./InternalError";

export const validatePhoneNumber = (firstPhone: string, middlePhone: string, lastPhone: string) => {
    const validFirstPhones = ['010', '011', '016', '018', '019'];
    const phoneRegex = /^\d+$/;

    // 첫 번째 전화번호 검증
    if (!validFirstPhones.includes(firstPhone)) {
        throw new InternalError(CODE.BadRequest, '첫번째 전화번호는 010, 011, 016, 018, 019 중 하나여야 합니다.');
    }

    // 연속된 숫자 또는 반복된 숫자 패턴 검증 함수
    const isSequentialOrRepeated = (number: string) => {
        // 연속된 숫자(오름차순, 내림차순) 확인
        const sequentialAsc = '1234567890';
        const sequentialDesc = '0987654321';
        if (sequentialAsc.includes(number) || sequentialDesc.includes(number)) {
            return true;
        }

        // 반복된 숫자 확인
        const repeatedRegex = /^(\d)\1*$/;
        return repeatedRegex.test(number);
    };

    // 가운데와 마지막 전화번호 유효성 검증
    if (
        !phoneRegex.test(middlePhone) || (middlePhone.length !== 3 && middlePhone.length !== 4) || isSequentialOrRepeated(middlePhone) ||
        !phoneRegex.test(lastPhone) || lastPhone.length !== 4 || isSequentialOrRepeated(lastPhone)
    ) {
        throw new InternalError(CODE.BadRequest, '가운데 번호는 3자리 또는 4자리여야 하며, 마지막 번호는 4자리 숫자여야 합니다. 연속되거나 반복된 숫자는 사용할 수 없습니다.');
    }
};
