/*Copyright (c) 2009 pidder <www.pidder.com>*/
function pidCrypt(){function a(b){if(!b){b=8}var c=new Array(b);var e=[];for(var d=0;d<256;d++){e[d]=d}for(d=0;d<c.length;d++){c[d]=e[Math.floor(Math.random()*e.length)]}return c}this.setDefaults=function(){this.params.nBits=256;this.params.salt=a(8);this.params.salt=pidCryptUtil.byteArray2String(this.params.salt);this.params.salt=pidCryptUtil.convertToHex(this.params.salt);this.params.blockSize=16;this.params.UTF8=true;this.params.A0_PAD=true};this.debug=true;this.params={};this.params.dataIn="";this.params.dataOut="";this.params.decryptIn="";this.params.decryptOut="";this.params.encryptIn="";this.params.encryptOut="";this.params.key="";this.params.iv="";this.params.clear=true;this.setDefaults();this.errors="";this.warnings="";this.infos="";this.debugMsg="";this.setParams=function(c){if(!c){c={}}for(var b in c){this.params[b]=c[b]}};this.getParams=function(){return this.params};this.getParam=function(b){return this.params[b]||""};this.clearParams=function(){this.params={}};this.getNBits=function(){return this.params.nBits};this.getOutput=function(){return this.params.dataOut};this.setError=function(b){this.error=b};this.appendError=function(b){this.errors+=b;return""};this.getErrors=function(){return this.errors};this.isError=function(){if(this.errors.length>0){return true}return false};this.appendInfo=function(b){this.infos+=b;return""};this.getInfos=function(){return this.infos};this.setDebug=function(b){this.debug=b};this.appendDebug=function(b){this.debugMsg+=b;return""};this.isDebug=function(){return this.debug};this.getAllMessages=function(c){var g={lf:"\n",clr_mes:false,verbose:15};if(!c){c=g}for(var h in g){if(typeof(c[h])=="undefined"){c[h]=g[h]}}var b="";var e="";for(var f in this.params){switch(f){case"encryptOut":e=pidCryptUtil.toByteArray(this.params[f].toString());e=pidCryptUtil.fragment(e.join(),64,c.lf);break;case"key":case"iv":e=pidCryptUtil.formatHex(this.params[f],48);break;default:e=pidCryptUtil.fragment(this.params[f].toString(),64,c.lf)}b+="<p><b>"+f+"</b>:<pre>"+e+"</pre></p>"}if(this.debug){b+="debug: "+this.debug+c.lf}if(this.errors.length>0&&((c.verbose&1)==1)){b+="Errors:"+c.lf+this.errors+c.lf}if(this.warnings.length>0&&((c.verbose&2)==2)){b+="Warnings:"+c.lf+this.warnings+c.lf}if(this.infos.length>0&&((c.verbose&4)==4)){b+="Infos:"+c.lf+this.infos+c.lf}if(this.debug&&((c.verbose&8)==8)){b+="Debug messages:"+c.lf+this.debugMsg+c.lf}if(c.clr_mes){this.errors=this.infos=this.warnings=this.debug=""}return b};this.getRandomBytes=function(b){return a(b)}};