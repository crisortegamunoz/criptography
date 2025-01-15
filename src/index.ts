import { encode } from "punycode";
import yargs, { alias, demand, demandOption, describe } from "yargs";
import prng from "./prng";

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
.demandCommand(1, 'You need at least one command before moving on')
.help();

console.log(argv);