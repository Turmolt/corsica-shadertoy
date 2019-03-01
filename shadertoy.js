const ch = require('cheerio');
const rq = require('request');
const Promise = require('es6-promises');

function getShaderPage(keyword,key,action){
  
  var url = 'https://www.shadertoy.com/api/v1/shaders/query/%KEYWORD%?key=%KEY%';
  if(keyword!=null&&keyword.length>0)
    url=url.replace('%KEYWORD%',keyword);
  else
    url = url.replace('%KEYWORD%','raymarch');
  
  url=url.replace('%KEY%',key);
  
  getShaderIDs(url).then(IDs=>{
    var rand = IDs[Math.floor(Math.random() * IDs.length)];

    //strip start+end characters on the returned ids, the ids have &quot; attached to them O.o
    if(rand.length>6)
    rand = rand.substring(6,12);

    var src =`<style>body{background-color: black};</style><iframe width=100% height=100% frameborder="0" src="https://www.shadertoy.com/embed/%SHADER%?gui=true&t=10&paused=false&muted=true" allowfullscreen></iframe>`;
    src = src.replace("%SHADER%",rand);
    action(src);
  });
}

function getShaderIDs(url){
  return new Promise(function(resolve, reject){
    rq.get(url,function(err, response){

      if(err){

        console.error(err.stack || err.trace || err);
        reject(err);
        return;
      }
      
      var $ = ch.load(response.body);
      
      var res = $.html();
      
      res = res.split(':')[2];
      
      res=res.replace('[','');
      res=res.replace(']','');
      var ids=res.split(',');
      
      if(url.includes("raymarch")){
        //add in my own shaders a few times to increase visibility..hehe
        ids.push('wssXzr','wssXzr','wssXzr','wssXzr','wssXzr','wssXzr','wssXzr','wssXzr','wssXzr','wssXzr','3sfXzr','3sfXzr','3sfXzr','3sfXzr','3sfXzr','3sfXzr','3sfXzr','3sfXzr','3sfXzr','3sfXzr');
      }
      
      resolve(ids);
      
    });
  });
}

exports = module.exports = {
  
  getShaderPage
  
}