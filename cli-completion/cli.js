#! /usr/bin/node

const commands = [
    {
        command: "foofoo",
        describe: "foofoo command",
    },
    {
        command: "barbar",
        describe: "barbar command",
    },
    {
        command: "prove-collatz",
        describe: "proving collatz ",
    }
]

const yargsBuilder = require('yargs')
    .command({
        command: "foobar",
        describe: "foobar command",
    })
    .option("foo", {
        describe: "foo parameter",
        default: true
    })
    .completion()

commands.forEach(cmd => yargsBuilder.command(cmd))

yargsBuilder.argv; //This line is important! Won't work without it