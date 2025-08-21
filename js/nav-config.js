// 네비게이션 설정 파일
// 새로운 페이지를 추가할 때 이 파일만 수정하면 됩니다.

const NAVIGATION_CONFIG = {
    // 브랜드 정보
    brand: '건강한 우리, 무장전선',
    
    // 메뉴 구조 정의
    menuStructure: [
        {
            text: 'HOME',
            type: 'link',
            link: 'home'
        },
        {
            text: '2025',
            type: 'dropdown',
            items: [
                {
                    text: '250823~0824 노빠꾸',
                    link: '2025/0823/250823.html',
                    title: '20250823~0824 - 노빠꾸',
                    description: '2025년 무장전선 하계 야유회'
                }
                // 새로운 페이지 추가 예시:
                // {
                //     text: '250901~0902 새로운행사',
                //     link: '2025/0901/250901.html',
                //     title: '250901~0902 - 새로운행사',
                //     description: '2025년 새로운 행사'
                // }
            ]
        },
        // {
        //     text: '2026',
        //     type: 'dropdown',
        //     items: [
        //         // 2026년 페이지들
        //         // {
        //         //     text: '260101~0102 신년행사',
        //         //     link: '2026/0101/260101.html',
        //         //     title: '260101~0102 - 신년행사',
        //         //     description: '2026년 신년 행사'
        //         // }
        //     ]
        // },
        {
            text: '소개',
            type: 'link',
            link: '#about'
        }
    ],
    
    // 페이지별 메타데이터
    pageMetadata: {
        '250823.html': {
            title: '20250823~0824 - 노빠꾸',
            description: '2025년 무장전선 하계 야유회',
            breadcrumb: '250823~0824 노빠꾸'
        }
        // 새로운 페이지 메타데이터 추가 예시:
        // '250901.html': {
        //     title: '250901~0902 - 새로운행사',
        //     description: '2025년 새로운 행사',
        //     breadcrumb: '250901~0902 새로운행사'
        // }
    }
};

// 전역으로 내보내기
window.NAVIGATION_CONFIG = NAVIGATION_CONFIG; 