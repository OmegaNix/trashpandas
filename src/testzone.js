const roundToThousands = (count)=>{
    var roundedCount = (count - count%100);
    roundedCount = roundedCount.toString();
    var solution;
    if(roundedCount.length < 4){
      return count;
    }else if(roundedCount.length == 4){
      if(roundedCount.charAt(1) == 0){
        solution = roundedCount.charAt(0) + "k";
      } else {
        solution = roundedCount.charAt(0) + "." + roundedCount.charAt(1) + "k";
      }
      return solution;
    }else if(roundedCount.length == 5){
      if(roundedCount.charAt(2) == 0){
        solution = roundedCount.charAt(0) + roundedCount.charAt(1) + "k";
      } else {
        solution = roundedCount.charAt(0) + roundedCount.charAt(1) + "." + roundedCount.charAt(2) + "k";
      }
      return solution;
    }else if(roundedCount.length == 6){
      solution = roundedCount.charAt(0) + roundedCount.charAt(1) + roundedCount.charAt(2) + "k";
      return solution;
    }else{
      return "1m+"
    }
  }


