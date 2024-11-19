import _ from 'lodash';
import htmlParser from 'node-html-parser';

/**
 * html 태그에서 텍스트 추출
 * @param tag 
 * @returns 
 */
export const extractText = (tag?: string): Promise<string | void> => {

	/*
	* ckeditor에 추가된 img 리소스 활성화
	* apply가 false이면 삭제 대상.
	* (이미지 업로드 후 저장을 하지 않으면 모두 쓰레기 데이타로 남는다)
	*/

	return new Promise((resolve, reject) => {

		if (!tag) {
			return resolve();
		}

		const document = htmlParser(tag);
		const elements = document.querySelectorAll('img, video, audio');
		const text = document.text;

		if (!elements) {
			return resolve(text);
		}

		let uuids = elements.filter((e) => e.hasAttribute('uuid')).map((e) => e.getAttribute('uuid'));
		if (uuids?.length > 0) {
            // TODO ckeditor로 업로드 한 파일의 상태 업데이트(쓰레기 데이타 방지)
        }

        resolve(text);
	});
};