import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  constructor() { }

  plaintext:string;
  
  conversionEncryptOutput: any;


  encrypt(value) {
    this.plaintext = value;   /// this input will come from method you will call in any component throughout the application (the input text u want to encrypt)
    var key = CryptoJS.lib.WordArray.random(16);
    var iv = CryptoJS.lib.WordArray.random(16);
    var encryptedid = CryptoJS.AES.encrypt(this.plaintext, key, { iv: iv });

    this.conversionEncryptOutput = iv.toString(CryptoJS.enc.Base64) + ":" + encryptedid.ciphertext.toString() + ":" + key.toString(CryptoJS.enc.Base64);

    var indexid = this.conversionEncryptOutput.indexOf('+');
    while (indexid != -1) {
      this.conversionEncryptOutput = this.conversionEncryptOutput.replace('+', 'PAM');
      indexid = this.conversionEncryptOutput.indexOf('+');
    }
    indexid = this.conversionEncryptOutput.indexOf('/');

    while (indexid != -1) {
      this.conversionEncryptOutput = this.conversionEncryptOutput.replace('/', 'CBZ');
      indexid = this.conversionEncryptOutput.indexOf('/');
    }

    this.conversionEncryptOutput//// return this value in method
    
    return this.conversionEncryptOutput;
  }
}
