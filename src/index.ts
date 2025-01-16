import { encode } from "punycode";
import yargs, { alias, demand, demandOption, describe } from "yargs";
import prng from "./prng";
import cipher from "./cipher";
import decipher from "./decipher";

const { argv } = yargs
.option({})
.command({
  command: 'prng',
  describe: 'Generar numero aleatorio',
  handler: ({ type, size, min, max, encoding }) => {
    console.log(prng(type, size, min, max, encoding));
  },
  builder: {
    type: {
      choices: ['bytes', 'int', 'uuid'] as const,
      describe: '',
      demandOption: true
    },
    size: {
      alias: 's',
      description: 'Tamaño de la aleatoriedad',
      default: 16
    },
    min: {
      type: 'number',
      default: 0,
      description: ''
    },
    max: {
      type: 'number',
      default: 100,
      description: ''
    },
    encode: {
      alias: 'enc',
      choices: [
        "ascii",
        "utf8",
        "utf-8",
        "utf16le",
        "utf-16le",
        "ucs2",
        "ucs-2",
        "base64",
        "base64url",
        "latin1",
        "binary",
        "hex",
      ] as const,
      default: 'hex',

    }
  }
})
.command({
  command: "cipher",
  describe: "Encrypt a file",
  handler: ({ password, salt, size, input, output }) => {
    cipher(password, salt, size, input, output);
  },
  builder: {
    password: {
      alias: "p",
      description: "The password to encrypt the file with",
      type: "string",
    },
    salt: {
      description: "The salt to encrypt the file with",
      type: "string",
    },
    size: {
      choices: [128, 192, 256] as const,
      description: "The size of the key",
      default: 128,
    },
    input: {
      alias: 'i',
      description: "The file to encrypt",
      type: 'string',
      demandOption: true
    },
    output: {
      alias: 'o',
      description: "The file to output the encrypted file to",
      type: 'string',
      demandOption: true
    },
  },
})
.command({
  command: "decipher",
  describe: "Decrypt a file",
  handler: ({ password, salt, size, input, output }) => {
    decipher(password, salt, size, input, output);
  },
  builder: {
    password: {
      alias: "p",
      description: "The password to decrypt the file with",
      type: "string",
    },
    salt: {
      description: "The salt to decrypt the file with",
      type: "string",
    },
    size: {
      choices: [128, 192, 256] as const,
      description: "The size of the key",
      default: 128,
    },
    input: {
      alias: 'i',
      description: "The file to decrypt",
      type: 'string',
      demandOption: true
    },
    output: {
      alias: 'o',
      description: "The file to output the decrypted file to",
      type: 'string',
      demandOption: true
    },
  },
})
.demandCommand(1, 'You need at least one command before moving on')
.help();

console.log(argv);