var cron = require('node-cron');


function cronJob(){   

    var currDate= new Date();
    var taskTime= currDate.setSeconds(currDate.getSeconds() + 120);

    var task = cron.schedule('*/1 * * * *', () => {
        
        if(new Date().getTime() > taskTime){
            console.log('task terminated', new Date().getTime(), taskTime);
            task.stop();
        }
        else{
             console.log('task running', new Date().getTime(), taskTime);
        }

    },{scheduled: false});
    
    task.start();
};    

module.exports= cronJob;