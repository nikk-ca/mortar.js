function mortar(imageFiles, options, callback) {

  var images = [];
  var loadedImages = 0;

  imageFiles.forEach(function(imageFile) {
    var newImage = new Image();
    newImage.className = 'mortar-image';
    newImage.src = imageFile;
    newImage.onload = function() {
      images.push({el: newImage});
      loadedImages++;
      if (loadedImages == imageFiles.length) {
        mortarCompose(images, options, callback);
    }};
    newImage.onerror = function() {
      loadedImages++;
      if (loadedImages == imageFiles.length) {
        mortarCompose(images, options, callback);
    }};
  });
}

function mortarCompose(images, options, callback) {

  if (!options.dimensionMode) { options.dimensionMode = '%'; }
  if (!options.compositionWidth) { options.compositionWidth = 960; }
  if (!options.minHeight) { options.minHeight = options.compositionWidth/8; }

  images.forEach(function(image) {
    image.realWidth = image.el.width;
    image.realHeight = image.el.height;
    image.aspectRatio = image.realWidth / image.realHeight;
    image.scaledWidth = options.minHeight * image.aspectRatio;
    image.scaledHeight = options.minHeight;
  });

  var row = [];
  var rowX = 0;
  images.forEach(function(image) {
    if (rowX + image.scaledWidth > options.compositionWidth) {
      row.forEach(function(rowImage) {
        var scale = options.compositionWidth / rowX;
        rowImage.scaledWidth *= scale;
        rowImage.scaledHeight *= scale;
      });
      row = [];
      rowX = 0;
    }
    row.push(image);
    rowX += image.scaledWidth;
  });

  var composition = document.createElement('div');
  composition.className = 'mortar-composition';
  composition.style.overflow = 'hidden';
  if (options.dimensionMode == '%') {
    composition.style.width = '100%';
  } else if (options.dimensionMode == 'px') {
    composition.style.width = options.compositionWidth + 'px';
  }

  if (options.dimensionMode == '%') {
    images.forEach(function(image, index) {
      image.el.style.width = image.scaledWidth / options.compositionWidth * 100 + '%';
      image.el.style.height = image.scaledHeight / options.compositionWidth * 100 + '%';
      image.el.style.display = 'inline-block';
      image.el.style.verticalAlign = 'top';
      composition.appendChild(image.el);
    });
  } else if (options.dimensionMode == 'px') {
    images.forEach(function(image, index) {
      image.el.style.width = image.scaledWidth + 'px';
      image.el.style.height = image.scaledHeight + 'px';
      image.el.style.display = 'inline-block';
      image.el.style.verticalAlign = 'top';
      composition.appendChild(image.el);
    });
  }

  callback(composition);

}
