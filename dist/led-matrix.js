"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LedMatrix = /** @class */ (function () {
    function LedMatrix(intensity, dataPin, clockPin) {
        if (dataPin === void 0) { dataPin = D13; }
        if (clockPin === void 0) { clockPin = D14; }
        this.intensity = intensity;
        this.dataPin = dataPin;
        this.clockPin = clockPin;
        this.dataPin.mode("output");
        this.clockPin.mode("output");
        this.clockPin.write(true);
        this.dataPin.write(true);
        this.setIntensity(intensity);
        this.clear();
    }
    LedMatrix.prototype.clear = function () {
        this.sendBytes([0, 0, 0, 0, 0, 0, 0, 0]);
    };
    LedMatrix.prototype.setIntensity = function (intensity) {
        this.intensity = intensity > 7 ? 7 : intensity;
        this.sendCommand(0x88 | this.intensity);
    };
    LedMatrix.prototype.sendCommand = function (cmd) {
        this.dataPin.write(false);
        this.send(cmd);
        this.dataPin.write(true);
    };
    LedMatrix.prototype.send = function (data) {
        for (var i = 0; i < 8; i++) {
            this.clockPin.write(false);
            this.dataPin.write(Boolean(data & 1));
            data >>= 1;
            this.clockPin.write(true);
        }
    };
    LedMatrix.prototype.sendData = function (address, data) {
        this.sendCommand(0x44);
        this.dataPin.write(false);
        this.send(0xC0 | address);
        this.send(data);
        this.dataPin.write(true);
    };
    LedMatrix.prototype.sendBytes = function (bytes) {
        for (var i = 0; i < 8; i++) {
            this.sendData(i, bytes[i]);
            this.end();
        }
        this.setIntensity(this.intensity);
    };
    LedMatrix.prototype.end = function () {
        this.dataPin.write(false);
        this.clockPin.write(false);
        this.clockPin.write(true);
        this.dataPin.write(true);
    };
    return LedMatrix;
}());
exports.default = LedMatrix;
