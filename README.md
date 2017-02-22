# pidcrypt
pidCrypt is a crypto library offering modular cryptographic functions in JavaScript. Supports: AES (CBC & CTR Mode), RSA, MD5, SHA-1, SHA-256, SHA-384, SHA-512, ASN.1, Base64, UTF-8. The AES-CBC mode is compatible to OpenSSL.

Copy from https://sourceforge.net/projects/pidcrypt/
原官网地址：https://www.pidder.com/pidcrypt/

根据modulus和exponent加密数据：
```javascript
  <script type="text/javascript" src="javascripts/pidcrypt.js"></script>  
  <script type="text/javascript" src="javascripts/jquery-1.12.4.min.js"></script>  
  <script type="text/javascript" src="javascripts/pidcrypt_util.js"></script>  
  <script type="text/javascript" src="javascripts/asn1.js"></script>  
  <script type="text/javascript" src="javascripts/jsbn.js"></script>  
  <script type="text/javascript" src="javascripts/rng.js"></script>  
  <script type="text/javascript" src="javascripts/prng4.js"></script>  
  <script type="text/javascript" src="javascripts/rsa.js"></script>  
  
  <script type="text/javascript">
    var modulus = 't3htnv0RT7T0d79TVuLQ6mhoAJHTyabVSXYdLFegs32yCWENNQ0nmwcS3VIvjU8YeqL9VKs+1yMiKs5xI9LgORY/11vh/CekRWzrpEWNG4j5EuemLyZxugqryyxRArq2Lm7c8ygpzFOOLV2r+As40BlgqvGyTgRUglxEp+p7ivU=';
    var exponent = 'AQAB';
  
    var rsa = new pidCrypt.RSA();
  
    var n = pidCryptUtil.convertToHex(pidCryptUtil.decodeBase64(modulus));
    var e = pidCryptUtil.convertToHex(pidCryptUtil.decodeBase64(exponent));
  
    rsa.setPublic(n, e, 16);
    var data = rsa.encryptRaw('the string need encrypt');
  
    var data = pidCryptUtil.encodeBase64(pidCryptUtil.convertFromHex(data));
  </script>
```

JS生成密钥对，将公钥使用的n和e提交给服务端，服务端使用PHP加密数据，JS获取到服务端数据进行解密：
```javascript
  <script type="text/javascript" src="javascripts/pidcrypt.js"></script>  
  <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
  <script type="text/javascript" src="javascripts/pidcrypt_util.js"></script>  
  <script type="text/javascript" src="javascripts/asn1.js"></script>  
  <script type="text/javascript" src="javascripts/jsbn.js"></script>  
  <script type="text/javascript" src="javascripts/rng.js"></script>  
  <script type="text/javascript" src="javascripts/prng4.js"></script>  
  <script type="text/javascript" src="javascripts/rsa.js"></script>
  
  var rsa = new pidCrypt.RSA();
  rsa.generate(512, '03');
  var n = pidCryptUtil.encodeBase64(rsa.n.toString(16));
  var e = pidCryptUtil.encodeBase64(rsa.e.toString(16));
  var d = pidCryptUtil.encodeBase64(rsa.d.toString(16));
```

PHP根据n和e生成公钥，加密数据
```php
  $n = 'YmE0YjgxNDY2NWE4OTg1OTNmYmJjNDczZjc5MTgzZDgxMzE3MmZmZWExMjIwNjgyYWNjM2ZkZjhiOTNmZmI5MTcyN2U5Nzc4MTg3OWEyZmE1NGIzMTZjODQ3Y2VlMDUyODNiOTcwMGYxZjhkNWE5NzZhNzA5MTYzYjZjMzVlYTc=';
  $e = 'Mw==';
  
  $rsa = new Crypt_RSA();
  
  $n = new Math_BigInteger(base64_decode($n), 16);
  $e = new Math_BigInteger(base64_decode($e), 16);
  var_dump($n, $e);
  $rsa->loadKey(array('n' => $n, 'e' => $e));
  $rsa->setEncryptionMode(CRYPT_RSA_ENCRYPTION_NONE);
  
  $rsa->setPublicKey();
  $publicKey = $rsa->getPublicKey();
  
  $encrypt = '';
  openssl_public_encrypt('this is a string', $encrypt, $publicKey);
```

JS获取到数据，根据私钥进行解密
```javascript
  <script type="text/javascript" src="javascripts/pidcrypt.js"></script>  
  <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
  <script type="text/javascript" src="javascripts/pidcrypt_util.js"></script>  
  <script type="text/javascript" src="javascripts/asn1.js"></script>  
  <script type="text/javascript" src="javascripts/jsbn.js"></script>  
  <script type="text/javascript" src="javascripts/rng.js"></script>  
  <script type="text/javascript" src="javascripts/prng4.js"></script>  
  <script type="text/javascript" src="javascripts/rsa.js"></script>
  
  var rsa = new pidCrypt.RSA();
  
  var n = 'YmE0YjgxNDY2NWE4OTg1OTNmYmJjNDczZjc5MTgzZDgxMzE3MmZmZWExMjIwNjgyYWNjM2ZkZjhiOTNmZmI5MTcyN2U5Nzc4MTg3OWEyZmE1NGIzMTZjODQ3Y2VlMDUyODNiOTcwMGYxZjhkNWE5NzZhNzA5MTYzYjZjMzVlYTc=';
  var e = 'Mw==';
  var d = 'N2MzMjU2MmVlZTcwNjU5MGQ1MjdkODRkNGZiNjU3ZTU2MjBmNzU1NDZiNmMwNDU3MWRkN2ZlYTVkMGQ1NTI1ZmQxM2QwMGE0OTBhZGNlOGJjMmEwNmVmMTM4ZGVkNmFjOTliODllNzk5ZmI1NTRmYzNhMjUxZjJiNDI1MTFhZGI=';

  n = pidCryptUtil.decodeBase64(n);
  e = pidCryptUtil.decodeBase64(e);
  d = pidCryptUtil.decodeBase64(d);
  rsa.setPrivate(n, e, d, 16);
  
  var string = 'GGUGvRLUv1RWHFedRmh+5luyHVaTkA5aQhF0AO41Vy2vOdmOW4aZwQ7dqjqYX84EUiWN5eyr2lhHLKUGv3EPaA==';
  string = pidCryptUtil.convertToHex(pidCryptUtil.decodeBase64(string));
  //console.dir(string);
  console.dir(rsa.decryptRaw(string));
```
