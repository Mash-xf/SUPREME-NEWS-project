// news.test.js - Simple browser-based tests for news app

function runTests() {
    console.log('🧪 Running News App Tests...\n');

    let testsPassed = 0;
    let totalTests = 0;

    function test(name, testFn) {
        totalTests++;
        try {
            testFn();
            console.log(`✅ ${name}`);
            testsPassed++;
        } catch (error) {
            console.log(`❌ ${name}: ${error.message}`);
        }
    }

    // Test 1: Button exists and has correct text
    test('Button should exist with correct text', () => {
        const button = document.getElementById('fetch-news');
        if (!button) throw new Error('Button not found');
        if (button.textContent !== 'See Trending News') {
            throw new Error('Button text is incorrect');
        }
    });

    // Test 2: News container exists
    test('News container should exist', () => {
        const container = document.getElementById('news-container');
        if (!container) throw new Error('News container not found');
    });

    // Test 3: Category select exists
    test('Category select should exist', () => {
        const select = document.getElementById('category-select');
        if (!select) throw new Error('Category select not found');
    });

    // ✅ FIXED Test 4
    test('Search input should exist', () => {
        const search = document.getElementById('search');
        if (!search) throw new Error('Search input not found');
    });

    console.log(`\n📊 ${testsPassed}/${totalTests} tests passed`);
}