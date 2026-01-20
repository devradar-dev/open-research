// Simple client-side search for DevRadar Open Research Archive
(function() {
    'use strict';

    const searchInput = document.getElementById('search');
    if (!searchInput) return;

    let index = [];
    let searchTimeout;

    // Build search index from all technology pages
    async function buildIndex() {
        try {
            const response = await fetch('/open-research/search.json');
            if (response.ok) {
                index = await response.json();
            }
        } catch (e) {
            console.log('Search index not available');
        }
    }

    // Escape HTML for safety
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Highlight matching text
    function highlightMatch(text, query) {
        const escaped = escapeHtml(text);
        const regex = new RegExp(`(${query.split(' ').join('|')})`, 'gi');
        return escaped.replace(regex, '<mark>$1</mark>');
    }

    // Perform search
    function performSearch(query) {
        if (!query || query.length < 2) {
            clearResults();
            return;
        }

        const results = index.filter(page => {
            const searchText = `${page.title} ${page.description || ''} ${page.tags || ''}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        }).slice(0, 10);

        displayResults(results, query);
    }

    // Display search results
    function displayResults(results, query) {
        clearResults();

        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-no-results';
            noResults.textContent = 'No results found';
            searchInput.parentNode.appendChild(noResults);
            return;
        }

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';

        results.forEach(page => {
            const result = document.createElement('a');
            result.className = 'search-result';
            result.href = page.url;
            result.innerHTML = `
                <span class="search-result-title">${highlightMatch(page.title, query)}</span>
                ${page.description ? `<span class="search-result-desc">${highlightMatch(page.description, query)}</span>` : ''}
            `;
            resultsContainer.appendChild(result);
        });

        searchInput.parentNode.appendChild(resultsContainer);
    }

    // Clear search results
    function clearResults() {
        const existing = searchInput.parentNode.querySelectorAll('.search-results, .search-no-results');
        existing.forEach(el => el.remove());
    }

    // Debounced search handler
    function handleSearch(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        searchTimeout = setTimeout(() => performSearch(query), 200);
    }

    // Event listeners
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
            performSearch(searchInput.value.trim());
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            clearResults();
        }
    });

    // Build index on load
    buildIndex();
})();
