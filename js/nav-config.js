// 네비게이션 설정 파일
// 새로운 페이지를 추가할 때 이 파일만 수정하면 됩니다.

// GitHub Pages 배포 경로 감지 함수
function getBasePath() {
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;
    
    console.log('Path detection:', { pathname, hostname });
    
    // GitHub Pages 도메인인지 확인
    if (hostname.includes('github.io')) {
        // armed_front repository로 배포된 경우
        // pathname이 /armed_front/ 또는 /armed_front로 시작하는지 확인
        if (pathname.startsWith('/armed_front/') || pathname === '/armed_front') {
            console.log('Detected armed_front path, returning /armed_front/');
            return '/armed_front/';
        }
        
        // 다른 repository 이름이 있을 경우를 대비한 일반적인 감지
        const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
        if (pathSegments.length > 0 && pathSegments[0] === 'armed_front') {
            console.log('Detected armed_front in path segments, returning /armed_front/');
            return '/armed_front/';
        }
    }
    
    console.log('Using default path /');
    return '/';
}

// 링크 생성 헬퍼 함수
function createLink(path) {
    const basePath = getBasePath();
    return basePath + path;
}

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
        }
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
        // {
        //     text: '소개',
        //     type: 'link',
        //     link: '#about'
        // }
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
window.getBasePath = getBasePath;
window.createLink = createLink; 