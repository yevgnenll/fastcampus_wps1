/*! dom-helper.js © yamoo9.net, 2016 */
'use strict';
/**
 * --------------------------------
 * 문서객체모델을 조작하는 도움을 주는 함수들... 정의
 */
// JS 데이터 유형을 체크해주는 헬퍼 함수
function isType(data, type) {
	// 유효성 검사
	if ( typeof type !== 'string') {
		throw new Error('전달된 두번째 인자의 유형은 반드시 문자 데이터 유형이어야 합니다.');
		// console.error('전달된 두번째 인자의 유형은 반드시 문자 데이터 유형이어야 합니다.');
		// return;
	}
	// Object.prototype.toString.call 메소드 빌려쓰기를 사용하여 객체(비객체)의 유형 문자열 반환
	var _type = Object.prototype.toString.call( data ).slice(8, -1).toLowerCase();
	return _type === type;
}

// function isType(data, data_type) {
// 	if ( data === undefined || data === null ) {
// 		return data;
// 	} else {
// 		return data.constructor === data_type;
// 	}
// }

// CSS 선택자를 통하여 문서 객체를 선택하는 헬퍼 함수
function selector(selector, parent) {
	// 유효성 검사 (Validation)
	// 데이터 유형 체크
	var els = (parent || document).querySelectorAll(selector);
	// if (parent) {
	// 	els = parent.querySelectorAll(selector);
	// } else {
	// 	els = document.querySelectorAll(selector);
	// }
	return !els ? null : els.length > 1 ? els : els[0];
	// var els = document.querySelectorAll(selector);
	// 조건 ? 참(실행) : 거짓(실행)
	// return els.length === 1 ? els[0] : els;
	// 조건1 ? 참(실행) : 조건2 ? 참(실행): 거짓(실행)
	// return !els ? null : els.length > 1 ? els : els[0];

	// if ( !els ) {
	// 	return null;
	// } else if ( els.length > 1 ) {
	// 	return els;
	// } else {
	// 	return els[0];
	// }

	// if ( els.length === 1 ) {
	// 	return els[0];
	// } else {
	// 	return els;
	// }
}

// 속성 설정하는 헬퍼 함수
function addAttribute(element, property, value) {
	// 검사
	// element에 기존에 설정된 property 값이 존재하는지 유무 파악
	var old_prop = element.getAttribute(property);
	if ( old_prop ) {
		// 존재한다면... 기존 값을 보존(기억) + 새로운 값을 설정
		element.setAttribute(property, old_prop + ' ' + value);
	} else {
		// 존재하지 않는다면... 값을 설정
		element.setAttribute(property, value);
	}
}

// 속성을 설정하는데 도움을 주는 헬퍼 함수 attr()
/**
 * JSDOC
 * [attr description]
 * @param  {[type]} el    [description]
 * @param  {[type]} prop  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function attr(el, prop, value) {
	// 유효성 검사
	// 전달받은 각각의 인자 데이터 유형이 올바른지 검수
	if (!el || el.nodeType !== 1) {
		throw new Error('첫번째 전달인자는 요소노드여야 합니다.');
	}

	if ( !isType(prop, 'string') && !isType(prop, 'object') ) {
		throw new Error('두번째 전달인자는 문자 데이터 유형 또는 객체 데이터 유형이어야만 합니다.');
	}

	if ( isType(prop, 'string') ){
		if ( value ) {
			// SET
			el.setAttribute(prop, value);
		} else {
			// GET
			return el.getAttribute(prop);
		}
	}
	if ( isType(prop, 'object') ) {
		// 객체라면?
		each(prop, function(key, value) {
			el.setAttribute(key, value);
		});

	}

}

function each(data, callback) {
	if ( isType(data, 'object') ) {
		for (var key in data) {
			// callback.call(null, key, data[key]);
			callback.apply(null, [key, data[key]]);
		}
	}
	if ( isType(data, 'array') ) {
		data.forEach(callback);
	}
}

window.$ = selector;