// 네비게이션 바 공통 컴포넌트
class NavigationBar {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.config = window.NAVIGATION_CONFIG || this.getDefaultConfig();
    }

    // 기본 설정 (설정 파일이 없을 때 사용)
    getDefaultConfig() {
        return {
            brand: 'Armed Front Picnic',
            menuStructure: [
                {
                    text: '홈',
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
                    ]
                },
                {
                    text: '소개',
                    type: 'link',
                    link: '#about'
                },
                {
                    text: '연락처',
                    type: 'link',
                    link: '#contact'
                }
            ],
            pageMetadata: {
                '250823.html': {
                    title: '20250823~0824 - 노빠꾸',
                    description: '2025년 무장전선 하계 야유회',
                    breadcrumb: '250823~0824 노빠꾸'
                }
            }
        };
    }

    // 현재 페이지 정보 가져오기
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === 'index.html' || filename === '' || path === '/') {
            return { type: 'home', year: null, date: null, file: null };
        }
        
        // 2025/0823/250823.html 형태에서 정보 추출
        const pathParts = path.split('/');
        if (pathParts.length >= 3) {
            const year = pathParts[pathParts.length - 3];
            const date = pathParts[pathParts.length - 2];
            const file = pathParts[pathParts.length - 1];
            
            return { type: 'date', year, date, file };
        }
        
        return { type: 'other', year: null, date: null, file: filename };
    }

    // 홈 링크 생성
    getHomeLink() {
        const path = window.location.pathname;
        const depth = path.split('/').length - 1;
        
        if (depth === 0) {
            return './';
        } else if (depth === 1) {
            return '../';
        } else if (depth === 2) {
            return '../../';
        } else if (depth === 3) {
            return '../../../';
        }
        
        return './';
    }

    // 네비게이션 HTML 생성
    generateHTML() {
        return `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="${this.getHomeLink()}">${this.config.brand}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            ${this.generateMenuItems()}
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }

    // 메뉴 아이템 HTML 생성
    generateMenuItems() {
        return this.config.menuStructure.map(item => {
            if (item.type === 'dropdown') {
                return this.generateDropdownItem(item);
            } else {
                return this.generateRegularItem(item);
            }
        }).join('');
    }

    // 일반 메뉴 아이템 HTML 생성
    generateRegularItem(item) {
        const isActive = this.isItemActive(item);
        const activeClass = isActive ? ' active' : '';
        const link = item.link === 'home' ? this.getHomeLink() : this.getHomeLink() + item.link;
        
        return `
            <li class="nav-item">
                <a class="nav-link${activeClass}" href="${link}">${item.text}</a>
            </li>
        `;
    }

    // 드롭다운 메뉴 아이템 HTML 생성
    generateDropdownItem(item) {
        const dropdownItems = item.items.map(dropdownItem => {
            const isActive = this.isDropdownItemActive(dropdownItem);
            const activeClass = isActive ? ' active' : '';
            const link = this.getHomeLink() + dropdownItem.link;
            
            return `
                <li><a class="dropdown-item${activeClass}" href="${link}">${dropdownItem.text}</a></li>
            `;
        }).join('');

        return `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    ${item.text}
                </a>
                <ul class="dropdown-menu">
                    ${dropdownItems}
                </ul>
            </li>
        `;
    }

    // 메뉴 아이템이 활성 상태인지 확인
    isItemActive(item) {
        if (item.link === 'home') {
            return this.currentPage.type === 'home';
        }
        return false;
    }

    // 드롭다운 아이템이 활성 상태인지 확인
    isDropdownItemActive(dropdownItem) {
        return this.currentPage.file === dropdownItem.link.split('/').pop();
    }

    // 네비게이션 바 렌더링
    render() {
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            navbarContainer.innerHTML = this.generateHTML();
        }
    }

    // 페이지 제목 생성
    generatePageTitle() {
        if (this.currentPage.type === 'home') {
            return this.config.brand;
        } else if (this.currentPage.type === 'date' && this.currentPage.file) {
            const metadata = this.config.pageMetadata[this.currentPage.file];
            return metadata ? metadata.title : this.config.brand;
        }
        return this.config.brand;
    }

    // 브레드크럼 생성
    generateBreadcrumb() {
        if (this.currentPage.type === 'home') {
            return '';
        } else if (this.currentPage.type === 'date' && this.currentPage.file) {
            const metadata = this.config.pageMetadata[this.currentPage.file];
            if (metadata) {
                return `
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb justify-content-center">
                            <li class="breadcrumb-item"><a href="${this.getHomeLink()}">홈</a></li>
                            <li class="breadcrumb-item"><a href="#">${this.currentPage.year}</a></li>
                            <li class="breadcrumb-item active" aria-current="page">${metadata.breadcrumb}</li>
                        </ol>
                    </nav>
                `;
            }
        }
        return '';
    }

    // 페이지 메타데이터 가져오기
    getPageMetadata() {
        if (this.currentPage.file && this.config.pageMetadata[this.currentPage.file]) {
            return this.config.pageMetadata[this.currentPage.file];
        }
        return null;
    }
}

// 전역 함수로 내보내기
window.NavigationBar = NavigationBar; 