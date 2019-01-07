/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
  el: '#vue-container',
  data: {
    orders: {},
    message: "hejhejhej",
    burgerText: "Choose your burger below:",
    burgers: [
      { name: 'The Swede',
      price: '100 kr',
      cal: '250kCal',
      gl: false,
      veg: true,
      img: 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2016/08/16/15/avocado-burger-buns.jpg?width=1000&height=614&fit=bounds&format=pjpg&auto=webp&quality=70&crop=16:9,offset-y0.5'
      },
      { name: 'The Frenchie',
      price: '120 kr',
      cal: '300kCal',
      gl: true,
      veg: false,
      img: 'http://www.sasa-food.ro/wp-content/uploads/2018/01/porc.png'
      },
      {name:'The American',
      price:'200 kr',
      cal:'650kCal',
      gl: true,
      veg: false,
      img: 'https://u.tfstatic.com/restaurant_photos/871/359871/169/612/brutal-burgers-mat-c6581.jpg'
      } ,
      {name:'The German',
      price:'200 kr',
      cal:'650kCal',
      gl: true,
      veg: true,
      img: 'https://www.tasteofhome.com/wp-content/uploads/2017/10/exps28800_UG143377D12_18_1b_RMS-696x696.jpg'
      },
      {name:'The Portuguese',
      price:'200 kr',
      cal:'650kCal',
      gl: false,
      veg: true,
      img: 'https://i0.wp.com/fullofplants.com/wp-content/uploads/2018/01/smoky-tempeh-black-bean-burgers-thumb.jpg?fit=1316%2C1315&ssl=1'
      }
    ],
    checkedBurgers: [],
    gender: [],
    customerName: [],
    email: [],
    /*street: [],
    house_no: [],*/
    paymethod: [],
    location:{x:0, y:0},
    orderPlaced: false,
    orderNo: 0,
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {

    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      // return lastOrder + 1;
      return "T";
    },
    getNextDisp: function () {
      var orderNo = orderNo+1
      return orderNo;
    },
    setLocation: function (ev) {
      var offset = {x: ev.currentTarget.getBoundingClientRect().left,
                    y: ev.currentTarget.getBoundingClientRect().top};
       this.location.x = ev.clientX - 10 - offset.x;
       this.location.y = ev.clientY - 10 - offset.y;
    },
    // displayOrder: function () {
    //   var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
    //     return Math.max(last, next);
    //   }, 0);
    //   /*return lastOrder + 1;*/
    //   return "T";
    // },
    // addOrder: function (event) {
    //   var offset = {x: event.currentTarget.getBoundingClientRect().left,
    //                 y: event.currentTarget.getBoundingClientRect().top};
    //   socket.emit("addOrder", { orderId: this.getNext(),
    //                             details: { x: event.clientX - 10 - offset.x,
    //                                        y: event.clientY - 10 - offset.y },
    //                             orderItems: [this.checkedBurgers]
    //                           });
    // },
    addOrder: function (event) {
      var sendBurger = " "+ this.checkedBurgers;
      var sendCustomer = " " + this.customerName + ", " + this.email;
      var locX = this.location.x;
      var locY = this.location.y;
      socket.emit("addOrder", { orderId: this.getNext(),
                                details: { x: locX,
                                           y: locY },
                                orderItems: [sendBurger, sendCustomer]
                              });
    },
    changeText: function(){
      if (this.message === "changed"){
        this.message = "YEY"
      }
      else{this.message = "changed"
      }
    },
    placeOrder() {
      var order = [{
      "Burgers": ' ' +this.checkedBurgers,
      "Gender": ' ' +this.gender,
      "Name": ' ' +this.customerName,
      "E-mail": ' ' +this.email,
      /*"Street": ' ' +this.street,
      "House": ' ' +this.house_no,*/
      "Payment": ' ' +this.paymethod,
      "locationX": ' ' +this.location.x,
      "locationY": ' ' +this.location.y,
      /*this.checkedBurgers,
      this.gender,
      this.customerName,
      this.email,
      this.street,
      this.house_no,
      this.paymethod,*/
    }]
    return order;
  },
  ordered (){
    this.orderPlaced = !this.orderPlaced;
  },

}});
