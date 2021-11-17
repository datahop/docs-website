# Datahop mobile client

This is a documentation for java based andriod application. The doc for golang of the same library is available [here](https://pkg.go.dev/github.com/datahop/ipfs-lite@v0.0.12/mobile).

## Install

In your app level gradle file add the following `dependencies`

```
    ...
    dependencies {

        ...
        
        implementation 'network.datahop.libs:datahop:v0.0.12'
        implementation 'network.datahop.libs:blediscovery:0.0.6'
        implementation 'network.datahop.libs:wifidirect:0.0.3'

        ...
    }

```

## Init client repository

To initialise the repo we need to BLE and Wifi libraries and pass them in the `init` function

```
    try {

         ...

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

    } catch (Exception e) {
        e.printStackTrace();
    }

```

## Start client and discovery

We will pass a "shouldBootstrap" boolean with `start`. This will determine if the client will connect with datahop default bootstrap node.

`startDiscovery` will take three boolean values in the following order
    
    - "advertising" : To Advertise BLE Scanning
	- "scanning" : To Scan BLE advertisements from other devices
	- "autoDisconnect" : Auto disconnect from a D2D discovered network

```
    try {

        ...

        Datahop.start(true);

        Datahop.startDiscovery(true, true, true);

    } catch (Exception e) {
        e.printStackTrace();
    }

```

## Client id and online status

```
    Log.d("Node Id", Datahop.id());
    Log.d("Node Status onCreate", String.valueOf(Datahop.isNodeOnline()));
```

## ConnectionManager

To be able to get imformed about new peer connection and disconnection our Class should implement `ConnectionManager`. We will be notified through this class functions about new peer connection and disconnection

```
    @Override
    public void peerConnected(String s) {
        Log.d("*** Peer Connected ***", s);
    }

    @Override
    public void peerDisconnected(String s) {
        Log.d("*** Peer Disconnected ***", s);
    }
```

## Client Addresses

```
    try {
        Types.StringSlice addrs = Types.StringSlice.parseFrom(Datahop.addrs());
        Log.d("Addrs : ", addrs.getOutputList().toString());
    } catch (Exception e) {
        e.printStackTrace();
    }

    try {
        Types.StringSlice ifaceAddrs = Types.StringSlice.parseFrom(Datahop.interfaceAddrs());
        Log.d("IfaceAddrs : ", ifaceAddrs.getOutputList().toString());
    } catch (Exception e) {
        e.printStackTrace();
    }
```

## Client Peerinfo

```
    try {
        Log.d("peerinfo : ",Datahop.peerInfo());
    } catch (Exception e) {
        e.printStackTrace();
    }
```

## Connected Peers

```
    try {
        Types.StringSlice peers = Types.StringSlice.parseFrom(Datahop.peers());
        Log.d("Peers : ", peers.getOutputList().toString());
    } catch (Exception e) {
        e.printStackTrace();
    }
```

## Client Matrix

```
    try {
        String matrix = Datahop.matrix();
        Log.d("matrix : ",matrix);
    } catch (Exception e) {
        e.printStackTrace();
    }
    
```

## Get all the available tags

```
    try {
        Types.StringSlice tags = Types.StringSlice.parseFrom(Datahop.getTags());
        Log.d("Tags : ", tags.getOutputList().toString());
    } catch (Exception e) {
        e.printStackTrace();
    }
``` 

## Get diskusage

```
    try {
        Log.d("Size : ", String.valueOf(Datahop.diskUsage()));
    } catch (Exception e) {
        e.printStackTrace();
    }
``` 

## Add content

`add` takes in the following params

    - "tag": a unique string to tag the given content in the network
	- "content": the content to add in the network in byte array form
	- "passphrase": to encrypt the content. pass "" (blank string) to add content without encryption


```
    try {
        String tag = "my tag";
        byte[] content = tag.getBytes();

        // to add content without encryption
        Datahop.add(tag, content, "")

        // to add content with encryption
        Datahop.add(tag, content, "verySecretPassphrase")
    } catch (Exception e) {
        e.printStackTrace();
    }
```

## Get content

`get` takes in the following params

    - "tag": a unique string tag for getting content from the network
	- "passphrase": to decrypt the content. pass "" (blank string) to get content without encryption
```
    try {
        String tag = "my tag";

        // to get content without encryption
        byte[] value = Datahop.get(tag, "")

        // to get content with encryption
        byte[] value = Datahop.add(tag, "verySecretPassphrase")

        // Do something with value
    } catch (Exception e) {
        e.printStackTrace();
    }
```