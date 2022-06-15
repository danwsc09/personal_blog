---
sidebar_position: 1
title: Init
---
Last updated: 2022/06/13 Mon

# Introduction

# Azure CLI
## Install
```bash
$ brew update && brew install azure-cli
```

## Log in
```az login```

## Create an Azure storage account
```bash
az storage account create \
  --resource-group learn-426bf89a-e031-4fb4-942e-0a22c16d79ad \
  --location westus \
  --sku Standard_LRS \
  --name <name>
# name = name of storage account
# group = name of group
```

## Get connection string to the storage account
```bash
az storage account show-connection-string \
  --resource-group learn-426bf89a-e031-4fb4-942e-0a22c16d79ad \
  --query connectionString \
  --name <name>

```

## Run code as in docs
```js
require('dotenv').config()

const { BlobServiceClient } = require('@azure/storage-blob')

const storageAccountConnectionString = process.env.CONNECTION_STRING
const blobServiceClient = BlobServiceClient.fromConnectionString(storageAccountConnectionString)

async function main() {
  const containerName = 'theimages'
  const containerClient = blobServiceClient.getContainerClient(containerName)
  console.log(containerClient)
  const createContainerResponse = await containerClient.createIfNotExists(containerName)
  console.log(`create container ${containerName} successfully`, createContainerResponse)

  const filename = 'docs-and-friends-selfie-stick.png'
  const blockBlobClient = containerClient.getBlockBlobClient(filename);
  const res = await blockBlobClient.uploadFile(filename)
  console.log(res)

  let blobs = containerClient.listBlobsFlat()
  let blob = await blobs.next()

  while (!blob.done) {
    console.log(blob)
    console.log(`${blob.value.name} --> Created: ${blob.value.properties.createdOn}   Size: ${blob.value.properties.contentLength}`)
    blob = await blobs.next()
  }
}

main()
```

## Note
Need to change public access level of the container to either `Blob` or `Container` (private by default).  
Also, need to set content type to whatever image.