class LedMatrix {

    constructor(private intensity: number,
                private dataPin: Pin = D13,
                private clockPin: Pin = D14) {

        this.dataPin.mode("output");
        this.clockPin.mode("output");

        this.clockPin.write(true);
        this.dataPin.write(true);
        this.setIntensity(intensity);
        this.clear();
    }

    private clear() {
        this.sendBytes([0, 0, 0, 0, 0, 0, 0, 0]);
    }

    public setIntensity(intensity: number) {
        this.intensity = intensity > 7 ? 7 : intensity;
        this.sendCommand(0x88 | this.intensity )
    }

    private sendCommand(cmd: number) {
        this.dataPin.write(false);
        this.send(cmd);
        this.dataPin.write(true);
    }

    private send(data: number) {
        for (let i = 0; i < 8; i++) {
            this.clockPin.write(false);
            this.dataPin.write(Boolean(data & 1));
            data >>= 1;
            this.clockPin.write(true);
        }
    }

    private sendData(address, data: number) {
        this.sendCommand(0x44);
        this.dataPin.write(false);
        this.send(0xC0 | address);
        this.send(data);
        this.dataPin.write(true);
    }

    public sendBytes(bytes: number[]) {
        // this.sendCommand(0x40);
        // this.dataPin.write(false);
        // this.send(0xC0);
        for (let i = 0; i < 8; i++) {
            // this.send(bytes[i]);
            this.sendData(i,bytes[i]);
            this.end();
        }
        // this.end();
        this.setIntensity(this.intensity)
    }

    private end() {
        this.dataPin.write(false);
        this.clockPin.write(false);
        this.clockPin.write(true);
        this.dataPin.write(true);
    }
}


