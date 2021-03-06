## datahop add

Add content into datahop network

### Synopsis


This command is used to add a file/content in the 
datahop network addressable by a given tag.

Example:

	// To tag the content with filename after adding

	$ datahop add '/home/sabyasachi/Downloads/go1.17.linux-amd64.tar.gz' -p -j
	
	// The file will be added the in network with the filename in the format below
	"/go1.17.linux-amd64.tar.gz": {
		"Size": 134787877,
		"Type": "application/gzip",
		"Name": "go1.17.linux-amd64.tar.gz",
		"Hash": {
			"/": "bafybeia4ssmbshzjwcuhq6xl3b7pjmfapy6buaaheh75hf7qzjzvs4rogq"
		},
		"Timestamp": 1632207586,
		"Owner": "QmXpiaCz3M7bRz47ZRUP3uq1WUfquqTNrfzi3j24eNXpe5"
	}

	$ datahop add '/home/sabyasachi/Downloads/go1.17.linux-amd64.tar.gz' -p -j -t golang_latest
	
	The file will be added the in network with provided tag in the format below

	"/golang_latest": {
		"Size": 134787877,
		"Type": "application/gzip",
		"Name": "go1.17.linux-amd64.tar.gz",
		"Hash": {
			"/": "bafybeia4ssmbshzjwcuhq6xl3b7pjmfapy6buaaheh75hf7qzjzvs4rogq"
		},
		"Timestamp": 1632207767,
		"Owner": "QmXpiaCz3M7bRz47ZRUP3uq1WUfquqTNrfzi3j24eNXpe5"
	},
		

```
datahop add [flags]
```

### Options

```
  -h, --help         help for add
  -t, --tag string   Tag for the file/content
```

### Options inherited from parent commands

```
  -j, --json     json output
  -p, --pretty   pretty json output
```

### SEE ALSO

* [datahop](datahop.md)	 - This is datahop cli client

###### Auto generated by spf13/cobra on 21-Sep-2021
