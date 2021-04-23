export class BbBluetooth {
    static data: number = -1;
    static async connect() {
        return navigator.bluetooth.requestDevice({
            filters: [{
                name: "ENTRALPI"
                }
            ],
            optionalServices: [
                // "f000ffc0-0451-4000-b000-000000000000", // blocklisted
                // "0000180a-0000-1000-8000-00805f9b34fb",
                // "0000180f-0000-1000-8000-00805f9b34fb",
                // "00001801-0000-1000-8000-00805f9b34fb",
                "0000fff0-0000-1000-8000-00805f9b34fb",
                // "0000181d-0000-1000-8000-00805f9b34fb",
                // "00001800-0000-1000-8000-00805f9b34fb"
            ],
            // acceptAllDevices: true
        })
        .then((device) => {
            if (!device.gatt) {
                throw new Error("No gatt server");
            }
            return device.gatt.connect();
        })
        .then(server => {
            return server.getPrimaryService("0000fff0-0000-1000-8000-00805f9b34fb");
        })
        .then(service => {
            return service.getCharacteristic("0000fff4-0000-1000-8000-00805f9b34fb");
        })
        .then(characteristic => {
            if (characteristic.properties.notify) {
                characteristic.addEventListener('characteristicvaluechanged', ev => {
                    // cast to any to disable warning about value not being a property of event handler.
                    const target = ev.target as BluetoothRemoteGATTCharacteristic;
                    if (target?.value?.getInt16(0)) {
                        BbBluetooth.data = target.value.getInt16(0);
                    }
                    else {
                        BbBluetooth.data = 0;
                    }
                });
                characteristic.startNotifications();
            } else {
                console.error("Cannot be notified by characteristic?... Weird");
            }
        });
    }
}
