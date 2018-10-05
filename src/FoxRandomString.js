FoxRandomString = {
    special_chars:'+-@!%*}[/)$#(>=',
    numbers: '0123456789234567',
    lowercase: 'abcdefghijklmnopqurstwvxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQURSTWVXYZ',
    hex: '0A16B278C3D4E5F9',
    mixPat: /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[_$@.\+\W])[a-zA-Z0-9\W]{1,}$/,
    ulnPat: /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{1,}$/,
    type: 'mix',// mix, int, lwr, upr, uln, hex
    length: 4,
    
    setLength: function(i){
      val = parseInt(i);
      if (val < 4 || isNaN(val)){
        return 4;
      }
      else{
        return val;      
      }
    },
    setType: function(t){
      switch(t){
        case 'int':
          return 'int';
        case 'lwr':
          return 'lwr';
        case 'upr':
          return 'upr';
        case 'uln':
          return 'uln';
        case 'hex':
          return 'hex';
        default:
          return 'mix';
      }    
    },
    setSelection: function(t){
      switch(t){
        case 'int':
          return this.numbers;
        case 'lwr':
          return this.lowercase;
        case 'upr':
          return this.uppercase;
        case 'uln':
          return this.uppercase+this.lowercase+this.numbers;
        case 'hex':
          return this.hex;
        default:
          return this.lowercase+this.uppercase+this.numbers+this.special_chars;
      }    
    },
    genRand: function(x){
      return Math.floor(Math.random() * Math.floor(x));
    },
    testOutput: function(type,output){
      switch (type){
        case 'mix':
          return this.tested(this.mixPat,output);
        case 'uln':
          return this.tested(this.ulnPat,output);
        default:
          return output;
      }    
    },
    tested: function(pat,input){
      re = new RegExp(pat);    
      if(!input.match(re)){      
        return this.filledSlots(input,this.type);
      }
      else{      
        return input;
      }
    },
    filledSlots: function(input, type){
      if (type == 'mix'){
        slots = this.getSlots(input.length, type);
        return this.fillSlots(input,slots,type)
      }
    },
    fillSlots: function(input,slots,type){
      input = input.split('')
      if (type == 'mix'){
        input[slots[0]] = this.numbers[this.genRand(this.numbers.length)];
        input[slots[1]] = this.lowercase[this.genRand(this.lowercase.length)];
        input[slots[2]] = this.uppercase[this.genRand(this.uppercase.length)];
        input[slots[3]] = this.special_chars[this.genRand(this.special_chars.length)];
      }
      if (type == 'uln'){
        input[slots[0]] = this.numbers[this.genRand(this.numbers.length)];
        input[slots[1]] = this.lowercase[this.genRand(this.lowercase.length)];
        input[slots[2]] = this.uppercase[this.genRand(this.uppercase.length)];
        
      }
      input = input.join('')
      return input;
    },
    getSlots: function(length,type){
      output = [];
      slotsStr = '';
      if (type == 'mix'){
        for (i = 0; i < 4; i++){
          randVal = this.atomicFor(slotsStr,length);        
          output.push(randVal);
          slotsStr += randVal;
        }
      }
      else if (type == 'uln'){
        for (i = 0; i < 3; i++){
          randVal = this.atomicFor(slotsStr,length);  
          output.push(this.genRand(length));
          slotsStr += randVal;
        }
      }
      return output;
      
    },
    atomicFor: function(str,length){            
        randVal = this.genRand(length);
        while (!this.isAtomicIn(randVal,str)){
                randVal = this.genRand(length);
                }
        return randVal;
    },
    isAtomicIn: function(char,str){
      if(str.indexOf(char) > -1){
        return false;
      }
      return true;
    },
    generate: function(length,type){
      output = '';    
      this.type = this.setType(type);
      this.length = this.setLength(length);
      selection = this.setSelection(this.type)
      
      for (i = 0; i < this.length; i++){
        output += selection[this.genRand(selection.length -1)];
      }
      return this.testOutput(this.type,output);
    }
    
  }  