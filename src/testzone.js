var test1 = "https://github.com/OmegaNix/trashpandas/network/alerts"
var test2 = "Resolving deltas: 100% (4/4), completed with 4 local objects."
var test3 = "ttps://github.com/OmegaNix/trashpandas.git"
var test4 = "PS C:\Users\Nate\reddit-live> git commit -m"
var test5 = "GitHub found 12 vulnerabilities on OmegaNix/trashpandas's default branch (5 high, 5 moderate, 2 low). To find out more, visit:"

const truncateString = (length, text)=>{
  var shortText = text.substring(0, length-1) + "..."
  return shortText;
}

console.log(truncateString(10,test1))
console.log(truncateString(15,test2))
console.log(truncateString(20,test3))
console.log(truncateString(25,test4))
console.log(truncateString(30,test5))