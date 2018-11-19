function MenuItem(bn,p,kCal,gl,la) {
  this.burgerName = bn;
  this.burgerkCal = kCal;
  this.gluten = gl;
  this.lactose = la;
  this.name = function(){
    return this.burgerName +' '+ this.burgerkCal;
  };
}

var burg1 = new MenuItem ('The Swede','100 kr','250kCal','Gluten free','Lactose free');
console.log( burg1.name());
var burg2 = new MenuItem ('The Frenchie','120 kr','350kCal','Gluten free','Lactose free');
console.log( burg2.name());
var burg3 = new MenuItem ('The American','200 kr','650kCal','Gluten','Lactose');
console.log( burg3.name());
var burg4 = new MenuItem ('The German','180 kr','450kCal','Gluten','Lactose');
console.log( burg4.name());
var burg5 = new MenuItem ('The Portuguese','180 kr','450kCal','Gluten free','Lactose');
console.log( burg5.name());

var burgers = [burg1,burg2,burg3,burg4,burg5];
console.log( burgers.burgerName );
