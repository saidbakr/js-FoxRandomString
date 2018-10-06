require('../src/FoxRandomString.js');
obj = FoxRandomString;
Tests = {
    obj: obj,
    canSetLength: function(){
        vals = [true,false,-1,'text',undefined,null,0,2,4,10]
        for (i = 0; i < vals.length; i++){
            if (vals[i] < 4){
                if (this.obj.setLength(vals[i]) == 4){
                    console.log('%cFor input value = '+vals[i]+ ' Success. Output: '+this.obj.setLength(vals[i]),'color: white; background:olive')
                }
                else{
                    console.log('%cFor input value = '+vals[i]+ ' Fail. Output: '+this.obj.setLength(vals[i]),'color:black; background:red')
                }
            }
            else{
                if (this.obj.setLength(vals[i]) == vals[i] || isNaN(vals[i])){
                    console.log('%cFor input value = '+vals[i]+ ' Success. Output: '+this.obj.setLength(vals[i]),'color: white; background:olive')
                }
                else{
                    console.log('%cFor input value = '+vals[i]+ ' Fail. Output: '+this.obj.setLength(vals[i]),'color:black; background:red')
                }
            }            
        }
        
    }
}

Tests.canSetLength();