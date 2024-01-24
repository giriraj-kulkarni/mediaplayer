document.addEventListener('DOMContentLoaded', function() {
    var pdfUrl = 'file:///C:/Users/GIRIRAJ/OneDrive/Desktop/mediaplayer/param_shavak_brochure_web%20vesion.pdf'
    var encodedPdfUrl = encodeURIComponent(pdfUrl);
    console.log('Encoded PDF URL:', encodedPdfUrl);
    var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    var sublinks = document.querySelectorAll('.dropdown-content a[href]');

    sublinks.forEach(function(sublink) {
        sublink.addEventListener('click', function(event) {
            event.preventDefault();
            var linkUrl = this.getAttribute('href');

            if (linkUrl.endsWith('.pdf')) {
                displayPDF(linkUrl);
            } else if (isYouTubeLink(linkUrl)) {
                displayYouTubeIframe(linkUrl);
            } else {
                var imageUrl = this.getAttribute('href');
                displayImage(imageUrl);
            }

            // Close the dropdown after clicking a sublink
            closeAllDropdowns();
        });
    });
    


    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(event) {
            event.preventDefault();
            var parentNavItem = this.closest('.nav-item');

            // Toggle the dropdown for the clicked item
            if (parentNavItem) {
                parentNavItem.classList.toggle('open');

                // Adjust margin for sibling items
                var siblingItems = Array.from(parentNavItem.parentNode.children).filter(item => item !== parentNavItem);
                siblingItems.forEach(function(item) {
                    if (parentNavItem.classList.contains('open')) {
                        var dropdownHeight = parentNavItem.querySelector('.dropdown-content').offsetHeight;
                        item.style.marginBottom = dropdownHeight + 'px';
                    } else {
                        item.style.marginBottom = '0';
                    }
                });
            }
        });
    });

    function isYouTubeLink(url) {
        return url.includes('youtube.com') || url.includes('youtu.be');
    }
    function displayPDF(pdfUrl) {
        var pdfViewerUrl = 'https://mozilla.github.io/pdf.js/web/viewer.html?file=' + encodeURIComponent(pdfUrl);
        var youtubeVideoContainer = document.getElementById('youtubeVideoContainer');
        
        // Use an iframe to embed the PDF viewer
        youtubeVideoContainer.innerHTML = `<iframe src="${pdfViewerUrl}" style="width:100%; height:100%;" frameborder="0"></iframe>`;
    }
    
    
    
    
    
    

    function displayYouTubeIframe(iframeUrl) {
        var youtubeVideoContainer = document.getElementById('youtubeVideoContainer');
        youtubeVideoContainer.innerHTML = `<iframe width="100%" height="100%" src="${iframeUrl}" frameborder="0" allowfullscreen></iframe>`;
    }

    function displayImage(imageUrl) {
        var youtubeVideoContainer = document.getElementById('youtubeVideoContainer');
        youtubeVideoContainer.innerHTML = `<img src="${imageUrl}" alt="Sublink Image" style="max-width: 100%; max-height: 100%; height: auto;">`;
    }

    function closeAllDropdowns() {
        var allNavItems = document.querySelectorAll('.nav-item');
        allNavItems.forEach(function(item) {
            item.classList.remove('open');
            item.style.marginBottom = '0';
        });
    }
});

// Define the toggleDropdown function
function toggleDropdown(linkId) {
    var dropdown = document.getElementById(linkId + 'Dropdown');
    if (dropdown) {
        dropdown.classList.toggle('open');
    }
}
