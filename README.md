# Kong Admin UI

[中文](README_zh.md)

A web UI for the Kong (the cloud-native API gateway & service mesh) admin API.

It's a front-end application, no need any back-end server. All requests to Kong admin API is sent by user's browser.

If you can visit our [demo](https://pocketdigi.github.io/kong-admin-ui), and your current device can visit kong admin API directly, you can use our demo to manage your Kong, it's safe.

[Demo on GitHub page](https://pocketdigi.github.io/kong-admin-ui) `https` protocol, so your Kong admin API must `https` too.
[Demo on pocketdigi.com](http://kong-admin.pocketdigi.com) `http` protocol, the server is in China.

## Features
* Basic info (configurations and status)
* Service management
* Route management
* Upstream management (include target)
* Consumer management
* Plugin management
* Authentication management (supports Basic Authentication, HMAC, JWT, Key Authentication, and OAuth 2.0)
* Certificate management

**Only supports Kong 0.14.x and above.**

From version 0.3, we support custom headers, so you can use Basic Authentication plugin and CORS plugin on your Kong Admin Service, and add credential on header.

[kong admin ui Custom Headers使用说明 给你的kong加个密码](https://www.pocketdigi.com/20190613/1644.html)

## Usage
1. If your computer can visit Kong admin API and intenet, you can use the demo we deployed.
2. Clone the source code, compile, deploy with nginx
3. Download the zip we packed，deploy with nginx
4. Deploy with docker

    ``` docker run -d --name kong-admin-ui -p 8899:80 pocketdigi/kong-admin-ui:0.5.3 ```

## Screenshots


![basic info](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/basic_info.png)

![config](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/config.png)

![route list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/route_list.png)

![service list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/service_list.png)

![service detail](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/service_detail.png)

![upstream list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/upstream_list.png)

![consumer list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/consumer_list.png)

![consumer detail](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/consumer_detail.png)

![plugin list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/plugin_list.png)

![certification](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/certificate_add.png)
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```


