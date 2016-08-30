# pidcrypt
Copy from https://sourceforge.net/projects/pidcrypt/

<code>
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
</code>
