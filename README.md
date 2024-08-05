Public Allegations Form
------------------------------
Public Allegations Form (PAF) Application built using HOF (Home Office Forms) framework.

## Architecture

The PAF app will send data to an AWS SQS (Simple Queue Service), the [ims-resolver](https://github.com/UKHomeOffice/ims-resolver/) will receive from the queue and attempt to send the data to the IMS system.  The ims-resolver is a github repo supported by the HOF team.  The IMS system is hosted on EBSA hosted by a supplier, Verint.

## IMS API integration

There is some sensitive information about IMS integration.  The documentation of this can be found in an internal repo
https://github.com/UKHomeOffice/ims-integration-documentation

## Getting Started

### Prerequisities

- [Node.js](https://nodejs.org/en/) - Tested against LTS
- NPM (installed with Node.js) - Works with versions 2 and 3
- [Redis server](http://redis.io/download) running on the default port

### Up & Running

```bash
$ cd paf
$ yarn install
$ yarn run start:dev
```
Then visit: [http://localhost:8080/](http://localhost:8080/)
