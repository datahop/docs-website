## How to

This is a guide related to some of the how tos for datahop clients

### How to set up cli as service (Linux)

- Create a `datahop.service` file inside `~/.config/systemd/user/`

```
[Unit]
Description=Datahop daemon
Documentation=https://pkg.go.dev/github.com/datahop/ipfs-lite

[Service]
LimitNOFILE=1000000
MemorySwapMax=0
ExecStart=/usr/bin/datahop daemon
Restart=always

[Install]
WantedBy=default.target
```

- Enable lingering for specific user

```
loginctl enable-linger $USER
```

- Enable Datahop service

```
systemctl --user enable datahop
```

- Start Datahop service

```
systemctl --user start datahop
```

- Check Datahop service status

```
systemctl --user status datahop
```

- Stop Datahop service

```
systemctl --user stop datahop
```

### How to run mobile client

- Add the following dependencies in your app level `build.gradle`

```
dependencies {

    .
    .
    .

    implementation 'network.datahop.libs:datahop:v0.0.11'
    implementation 'network.datahop.libs:blediscovery:0.0.5'
    implementation 'network.datahop.libs:wifidirect:0.0.2'

    .
    .
}
```

#### Note : versions might change in future. Please refer to the  [packages](https://github.com/orgs/datahop/packages?repo_name=ipfs-lite).

- We need wifi, location, bluetooth permission/enabled to run d2d discovery
- To start the daemon we can simply do the follwoing

```
BLEServiceDiscovery bleDiscoveryDriver = BLEServiceDiscovery.getInstance(getApplicationContext());
BLEAdvertising bleAdvertisingDriver = BLEAdvertising.getInstance(getApplicationContext());

WifiDirectHotSpot hotspot = WifiDirectHotSpot.getInstance(getApplicationContext());
WifiLink connection = WifiLink.getInstance(getApplicationContext());

Datahop.init(
    getApplicationContext().getCacheDir() + "/" + root,
    this,
    bleDiscoveryDriver,
    bleAdvertisingDriver,
    hotspot,
    connection
);

bleAdvertisingDriver.setNotifier(Datahop.getAdvertisementNotifier());
bleDiscoveryDriver.setNotifier(Datahop.getDiscoveryNotifier());
hotspot.setNotifier(Datahop.getWifiHotspotNotifier());
connection.setNotifier(Datahop.getWifiConnectionNotifier());
Datahop.start(true);
Datahop.startDiscovery(true, true, true);
```

#### Note : Mobile client documentation is avalable  [here](https://pkg.go.dev/github.com/datahop/ipfs-lite/mobile). You can also refer to the [Demo](https://github.com/datahop/datahop-android-demo) android applicaiton.
