# mortar.js

Generates edge-to-edge image compositions, free of cropping.

### How to use

```
mortar(imageFiles, options, function(composition) {
  // STUFF HERE
});
```

It's simple! Here's an example:
```
var imageFiles = [
  'img/a.jpg', 'img/b.jpg', 'img/c.jpg',
  'img/d.jpg', 'img/e.jpg', 'img/f.jpg',
  'img/g.jpg', 'img/h.jpg', 'img/i.jpg'
];

mortar(imageFiles, {dimensionMode: '%', compositionWidth: 1280, minHeight: 160}, function(composition) {
  document.querySelector('body').appendChild(composition);
});
```

### Notes

- If an image cannot be loaded due to error, it will simply be removed from the composition.
- Extra styling can be applied with `mortar-composition` and `mortar-image` classes.
