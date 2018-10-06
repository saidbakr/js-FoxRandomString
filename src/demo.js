for (i = 4; i < 129; i++){
    option = document.createElement('option');
    option.text = i;
    option.value = i;
    strLength.add(option)
  }
  randCreator = FoxRandomString;
function gen(){
outString.value = randCreator.generate(strLength.value,type.value)
}