#! /usr/bin/env node
var program = require('commander');
var chromecastjs = require('chromecast-js');
var colors = require('colors');

program
  .version('1.0.0')
  .option('-f, --file [url]', 'The file you want to cast')
  .option('-t, --title [title]', 'The title of the file you want to cast (optional)')
  .option('-c, --cover [cover]', 'The cover of the file you want to cast (optional)')
  .parse(process.argv);

  if(program.file){
    if(program.file != ""){ // on vérifie si l'url du fichier a caster n'est pas vide
      var browser = new chromecastjs.Browser()
      if(program.title && program.cover){ // on vérifie si l'utilisateur a veut affichier la cover
        // si c'est le cas, on fait un objet media
        var media = {
            url : program.file,
            cover: {
                title: program.title,
                url: program.cover
            }
          }
      } else {
         // sinon media corresspond uniquement à une url
          var media = program.file;
      }
      browser.on('deviceOn', function(device){
        // quand on trouver une chromecast on s'y connecte
        device.connect()
        device.on('connected', function(){
          // dès qu'on est connecter on lance la lecture du media :
          device.play(media, 60, function(){
              console.log('Playing in your chromecast!'.green);
          });

        });
      });
    } else { // si l'url du fichier à caster est vide :
      console.log('Please provide a proper url to cast.'.red)
    }
  } else { // si l'utilisateur n'a pas mit l'argument -f :
      console.log('Please provide a file to cast.'.red)
  }
