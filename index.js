#! /usr/bin/env node
var program = require('commander');
var pkg = require('./package.json');
var create = require('./libs/create.js');

program.version(pkg.version)
    .usage('init <pro-name>')
    .command('init <pro-name>')
    .action(function(proName, cmd) {
        create.init(proName);
    });

program.version(pkg.version)
    .command('example')
    .action(function() {
        create.init();
    });

program.on('--help', function(){
    console.log('  Use  Examples:');
    console.log('');
    console.log('    $ phaser init <pro-name>');
    console.log('    $ phaser example');
    console.log('');
});

if(process.argv.length<=2 || (process.argv[2]!=='init' && process.argv[2]!== 'example')){
    program.outputHelp();
}

program.parse(process.argv);
