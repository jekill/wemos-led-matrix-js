var LedMatrix = /** @class */ (function () {
    function LedMatrix(intensity, dataPin, clockPin) {
        if (dataPin === void 0) { dataPin = D13; }
        if (clockPin === void 0) { clockPin = D14; }
        this.intensity = intensity;
        this.dataPin = dataPin;
        this.clockPin = clockPin;
        this.dataPin.mode("output");
        this.clockPin.mode("output");
        this.setIntensity(intensity);
        this.clockPin.write(false);
        this.clockPin.write(true);
        this.dataPin.write(true);
        this.clear();
    }
    LedMatrix.prototype.clear = function () {
        this.sendBytes([0, 0, 0, 0, 0, 0, 0, 0]);
    };
    LedMatrix.prototype.setIntensity = function (intensity) {
        this.intensity = intensity > 7 ? 7 : intensity;
        this.sendCommand(0x80 | this.intensity | 0x08);
    };
    LedMatrix.prototype.sendCommand = function (cmd) {
        this.dataPin.write(false);
        this.send(cmd);
        this.end();
    };
    LedMatrix.prototype.send = function (data) {
        for (var i = 0; i < 8; i++) {
            this.clockPin.write(false);
            this.dataPin.write(Boolean(data & 1));
            data >>= 1;
            this.clockPin.write(true);
        }
    };
    LedMatrix.prototype.sendData = function (data, address) {
        if (address === void 0) { address = 0xC0; }
        this.sendCommand(0x44);
        this.dataPin.write(false);
        this.send(address);
        this.send(data);
    };
    LedMatrix.prototype.sendBytes = function (bytes) {
        this.sendCommand(0x40);
        this.dataPin.write(false);
        this.send(0xC0);
        for (var i = 0; i < 8; i++) {
            this.send(bytes[i]);
        }
        this.end();
    };
    LedMatrix.prototype.end = function () {
        this.dataPin.write(false);
        this.clockPin.write(false);
        this.clockPin.write(true);
        this.dataPin.write(true);
    };
    return LedMatrix;
}());
