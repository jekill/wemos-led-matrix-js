# wemos-led-matrix-js
JS lib for Wemos LED Matrix Shield 

## Example for Espruino

```javascript
var leds = Graphics.createArrayBuffer(8,8,1,{zigzag:false}); 
var matrix = new LedMatrix(5);
var x;

setInterval(function(){
  leds.clear();
  x = x === 1 ? 2 : 1;
  leds.drawString(":)", 0, x);
  matrix.sendBytes(leds.buffer);
}, 1000);
```
