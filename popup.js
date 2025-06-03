// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabName = tab.getAttribute('data-tab');
            document.getElementById(tabName).classList.add('active');
        });
    });
    
    // Category selection
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked category
            category.classList.add('active');
            
            // Filter scripts based on category
            const categoryName = category.textContent.toLowerCase();
            const scriptSections = document.querySelectorAll('.script-section');
            
            if (categoryName === 'all') {
                scriptSections.forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                scriptSections.forEach(section => {
                    const title = section.querySelector('.script-title').textContent.toLowerCase();
                    if (title.includes(categoryName)) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const scriptCodeElement = button.parentElement.querySelector('.script-code');
            const scriptCode = scriptCodeElement.textContent.trim();
            
            // Use the modern clipboard API
            navigator.clipboard.writeText(scriptCode)
                .then(() => {
                    // Change button text temporarily
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    // Fallback for browsers that don't support clipboard API
                    const textArea = document.createElement('textarea');
                    textArea.value = scriptCode;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    // Change button text temporarily
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 2000);
                });
        });
    });
    
    // Horizontal scroll functionality
    const scriptCodeWrappers = document.querySelectorAll('.script-code-wrapper');
    scriptCodeWrappers.forEach(wrapper => {
        const leftBtn = wrapper.nextElementSibling.querySelector('.arrow-left');
        const rightBtn = wrapper.nextElementSibling.querySelector('.arrow-right');
        const thumb = wrapper.nextElementSibling.querySelector('.scroll-thumb');
        
        // Handle scroll buttons
        leftBtn.addEventListener('click', () => {
            wrapper.scrollLeft -= 100;
            updateThumbPosition(wrapper, thumb);
        });
        
        rightBtn.addEventListener('click', () => {
            wrapper.scrollLeft += 100;
            updateThumbPosition(wrapper, thumb);
        });
        
        // Update thumb on scroll
        wrapper.addEventListener('scroll', () => {
            updateThumbPosition(wrapper, thumb);
        });
        
        // Initial thumb position
        updateThumbPosition(wrapper, thumb);
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const scriptSections = document.querySelectorAll('.script-section');
        
        scriptSections.forEach(section => {
            const title = section.querySelector('.script-title').textContent.toLowerCase();
            
            if (title.includes(searchTerm)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});

// Function to update thumb position
function updateThumbPosition(wrapper, thumb) {
    const scrollRatio = wrapper.scrollLeft / (wrapper.scrollWidth - wrapper.clientWidth);
    const thumbPositionMax = thumb.parentElement.clientWidth - thumb.clientWidth;
    thumb.style.left = `${scrollRatio * thumbPositionMax}px`;
}