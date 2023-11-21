// ==UserScript==
// @name         Download Album Images
// @namespace    http://your.namespace.com
// @version      0.1
// @description  在相册页面下载人人图片
// @author       ZealBiuK
// @match        https://www.renren.com/album/*
// @grant        GM_download
// ==/UserScript==

(function () {
  'use strict';

  // Function to download images
  function downloadImages() {
    // Extract album name from the page
    const albumNameElement = document.querySelector('.rr-albums_detail_name');
    const albumName = albumNameElement ? albumNameElement.textContent.trim() : 'default';

    // Find all ul tags with img tags
    const ulsWithImages = document.querySelectorAll('ul img');

    // Create a folder with the album name
    GM_download({
      url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(''), // Dummy URL to create folder
      name: albumName,
      onload: function () {
        // Iterate through images and download them
        ulsWithImages.forEach((img, index) => {
          GM_download({
            url: img.src,
            name: `${albumName}/image_${index + 1}.jpg`,
            saveAs: false, // Change to true if you want to prompt the user for each download
          });
        });
      },
    });
  }

  // Create and append the download button
  function createDownloadButton() {
    const button = document.createElement('button');
    button.textContent = 'Download Album Images';
    button.style.position = 'fixed';
    button.style.top = '120px';
    button.style.left = '20px';
    button.style.padding = '10px';
    button.style.fontSize = '16px';
    button.style.zIndex = '9999';
    button.style.backgroundColor = '#3580f9'; // Blue background color
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', downloadImages);

    document.body.appendChild(button);
  }

  // Call the function to create the download button
  createDownloadButton();
})();
