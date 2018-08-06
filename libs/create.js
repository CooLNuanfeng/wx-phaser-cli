var download = require('download-git-repo');
var Metalsmith  = require('metalsmith');
var Handlebars = require('handlebars');
var path = require('path');
var ora = require('ora');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var rm = require('rimraf');

var spinner,tmp;


function transformRender(proName){
    var initflag = proName!=='./phaser-plane'?true:false;
    return function(files, metalsmith, next){
        Object.keys(files).forEach(function(filename){
            if(filename.indexOf('js/')!==-1){
                var data = files[filename];
                var template = Handlebars.compile(data.contents.toString());
                var result = template({init: initflag});
                data.contents = new Buffer(result);
            }
            if(initflag && filename.indexOf('/assets/')!==-1){
                delete files[filename];
            }
        });
        next();
    }
}


function metalsmithFn(name,succ){
    var proName = name ? name : './phaser-plane';
    Metalsmith(process.cwd())
    .source(tmp)
    .use(transformRender(proName))
    .clean(true)
    .destination(proName)
    .build(function(err,files){
        if(err){
            spinner.fail(chalk.red('Create init phaser project Failed !!!'));
            console.log('\n');
            console.log(err);
            spinner.clear();
            spinner.stop();
            return;
        }
        try{
            rm.sync(tmp);
        }catch(e){
            console.log(e);
        }
        succ && succ();
    });
}


module.exports = {
    init: function(proName){
        tmp = path.join(process.cwd(),'temp');

        if(proName){
            spinner = ora('creating, loading...').start();
            spinner.clear();
            download('CooLNuanfeng/phaser-init-template',tmp,function(error){
                if(error){
                    spinner.fail(chalk.red('Create init phaser project Failed !!!'));
                    console.log(chalk.yellow('You can check the network status'));
                    return;
                }
                spinner.clear();
                metalsmithFn(proName,function(){
                    mkdirp.sync(proName+'/src/assets/images');
                    mkdirp.sync(proName+'/src/assets/atlas');
                    mkdirp.sync(proName+'/src/assets/media');
                    //success
                    spinner.succeed('Create init phaser project Success !!!');
                    console.log('');
                    console.log(chalk.green('   $ cd '+proName+' && npm install'));
                    console.log(chalk.green('   $ npm run dev'));
                    console.log('');
                });

            });
        }else{

            spinner = ora('creating, loading...').start();
            spinner.clear();
            download('CooLNuanfeng/phaser-init-template',tmp,function(err){
                if(err){
                    spinner.fail(chalk.red('Create init phaser project Failed !!!'));
                    console.log(chalk.yellow('You can check the network status'));
                    return;
                }
                spinner.clear();
                metalsmithFn(undefined,function(){
                    spinner.succeed('Create example phaser plane Success !!!');
                    console.log('');
                    console.log(chalk.green('   $ cd phaser-plane && npm install'));
                    console.log(chalk.green('   $ npm run dev'));
                    console.log('');
                });

            });
        }
    }
}
