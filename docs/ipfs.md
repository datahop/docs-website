# DataHop Service

[![Go Reference](https://pkg.go.dev/badge/github.com/datahop/ipfs-lite.svg)](https://pkg.go.dev/github.com/datahop/ipfs-lite)
[![Go Report Card](https://goreportcard.com/badge/github.com/datahop/ipfs-lite)](https://goreportcard.com/report/github.com/datahop/ipfs-lite)
[![Actions Status](https://github.com/datahop/ipfs-lite/workflows/Go/badge.svg)](https://github.com/datahop/ipfs-lite/actions)
[![codecov](https://codecov.io/gh/datahop/ipfs-lite/branch/alpha.0/graph/badge.svg)](https://codecov.io/gh/datahop/ipfs-lite)

The outcome of this DataHop is local content sharing in mobile devices without requiring any network infrastructure. IPFS platform provides required networking features that will substitute typical client-server architecture for end-user centric networking. These features are:

* Content addressing: IPFS provides a content identifier, or CID used to point to material in IPFS. This can be used to identify and fetch content without requiring defining a specific content naming for a specific application.
* Content storage: IPFS provides a local storage cache that stores any file provided or fetched by the user. This is used to enable content sharing from any user that previously got the same content without requiring a centralised model
* Peer-to-peer connectivity: An important part of the IPFS project is the libp2p subproject. Libp2p provides all required network libraries to start connections with other users, discovery features and write/read data from other peers.
* Infrastructure integration: This feature allows users to discover and fetch content from remote peers when infrastructure is available (Internet connectivity) to later make it available to local users.

To this end DataHop based it smartphone service on IPFS, develovping an embeddable and lightweight IPFS peer that can run on Android devices. This fork started from [ipfs-lite](https://github.com/hsanjuan/ipfs-lite). It offers all the features of main [ipfs-lite](https://github.com/hsanjuan/ipfs-lite). For certain requirements of
DataHop it adds some more features of full IPFS, such as config, repo, leveldb etc.

## Examples

### cli client
```
 go run ./examples/litepeer/litepeer.go
```

### mobile client
```
  go run ./examples/mobilepeer/mobilepeer.go
```

## Objectives

* [x] create cache repo as IPFS
* [x] have persistent config information (Id, keys, ports, bootstraps etc)
* [x] use leveldb as datastore to set up peer
* [x] generate gomobile binding for android
* [x] adding content
* [x] replicating content
* [x] remove content
* [x] remove respective replication info for removed content
* [x] bootstrap mobile client
* [x] cli for bootstrap peer


## Documentation

[Go pkg docs](https://pkg.go.dev/github.com/datahop/ipfs-lite)

## License

Copyright 2021 DataHop

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the
License. You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "
AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
language governing permissions and limitations under the License.

## Acknowledgment

This software is part of the NGI Pointer project "Incentivised Content Dissemination at the Network Edge" that has
received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No
871528

<p align="center"><img  alt="ngi logo" src="https://raw.githubusercontent.com/datahop/ipfs-lite/master/Logo_Pointer.png"
width=40%> <img  alt="eu logo" src="https://raw.githubusercontent.com/datahop/ipfs-lite/master/eu.png" width=25%></p>
