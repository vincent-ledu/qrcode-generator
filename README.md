# qrcode-generator

This is a QR code generator for wifi onboarding device.

Choice has been made to not use online app for security reason: an online app could log ssid, password, and geoloc the browser access...

## Prerequisites

* a web server, such as nginx, apache httpd, lighttpd, ...
* nodejs

## Installation 

* In a other folder, such as /opt/qrcode, git@github.com:vincent-ledu/qrcode-generator.git 
* Copy front/index.html to you /var/www/qrcode root directory
* Add following directives to you web server (nginx version):
```
  root /var/www/qrcode;

  location / {
    try_files $uri $uri/ /index.html;
    expires -1;
  }

  location /api/qrcode/ {
    proxy_pass http://127.0.0.1:3000;
    rewrite /api/qrcode/(.*) /$1  break;
  }

```
* In /opt/qrcode, type:
```
    npm install
    npm start
```

* Reload you httpd server, the you can access the app.

## External documentations

* zxing doc about format for QR wifi: https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
* MeCard format on wikipedia: https://en.wikipedia.org/wiki/MeCard_(QR_code)
