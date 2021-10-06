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