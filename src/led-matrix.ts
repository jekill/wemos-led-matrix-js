class LedMatrix {

    constructor(private intensity: number,
                private dataPin: Pin = D13,
                private clockPin: Pin = D14) {

        this.dataPin.mode("output");
        this.clockPin.mode("output");
        this.setIntensity(intensity);


        this.clockPin.write(false);
        this.clockPin.write(true);
        this.dataPin.write(true);
        this.clear();
    }

    private clear() {
        this.sendBytes([0, 0, 0, 0, 0, 0, 0, 0]);
    }

    public setIntensity(intensity: number) {
        this.intensity = intensity > 7 ? 7 : intensity;
        this.sendCommand(0x80 | this.intensity | 0x08)
    }

    private sendCommand(cmd: number) {
        this.dataPin.write(false);
        this.send(cmd);
        this.end();
    }

    private send(data: number) {
        for (let i = 0; i < 8; i++) {
            this.clockPin.write(false);
            this.dataPin.write(Boolean(data & 1));
            data >>= 1;
            this.clockPin.write(true);
        }
    }

    private sendData(data: number, address: number = 0xC0) {
        this.sendCommand(0x44);
        this.dataPin.write(false);
        this.send(address);
        this.send(data);
    }

    public sendBytes(bytes: number[]) {
        this.sendCommand(0x40);
        this.dataPin.write(false);
        this.send(0xC0);
        for (let i = 0; i < 8; i++) {
            this.send(bytes[i]);
        }
        this.end();
    }

    private end() {
        this.dataPin.write(false);
        this.clockPin.write(false);
        this.clockPin.write(true);
        this.dataPin.write(true);
    }
}


