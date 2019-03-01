const shadertoy = require('./shadertoyrequest.js');


module.exports = function(corsica) {
  
  corsica.on('shadertoy', function(content) {
    
    shadertoy.getShaderPage(content.id, content.key, (html)=>{
      
     corsica.sendMessage('content', {
        type: 'html',
        content: html,
        screen: content.screen
      });

      
    });
    
    return content;
  });
  
}