var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/magic-mirror-db');

var Employee = require('../models/employee');
var data = [
   {
      "name" : "Seetharaman, Narayanan",
      "first_name" : "Narayanan",
      "corpid":"naseetharaman",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         },
         {
            "start_time" :"4:00PM",
            "end_time" : "5:00PM",
            "content":" Deployment",
            "subject":"Meeting with Ohack team"
         },
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Team meeting"
         }
      ]
   },
   {
      "corpid":"mprattile",
      "name":"Parattile, Midhun",
      "first_name" : "Midhun",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         }
      ]
   },
   {
      "name" : "Boomibalan, Maheshwaran",
      "first_name" : "Maheshwaran",
      "corpid":"mboomibalan",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         }
      ]
   },
   {
      "name":"Rathina Durai ,Thyagu",
      "first_name" : "Thyagu",
      "corpid":"trathinadurai",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         }
      ]
   },
   {
      "name":"Vaidyanathan, Sathish",
      "first_name":"Sathish",
      "corpid":"savaidyanathan",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         }
      ]
   },
   {
      "name":"Raghavan, Swami",
      "first_name":"Swami",
      "corpid":"sraghavan",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         }
      ]
   },
   {
      "name":"Annamalai, Prasanna",
      "first_name":"Prasanna",
      "corpid":"prannamalai",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         }
      ]
   },
   {
      "name":"NatarajaPillai, Shanmugakannan",
      "first_name":"Shanmugakannan",
      "corpid":"snatarajapillai",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         }
      ]
   },
   {
      "name":"Ragunathan, Yamini",
      "first_name":"Yamini",
      "corpid":"yragunathan",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         }
      ]
   },
   {
      "name":"Jowhar, Mohammed",
      "first_name":"Mohammed",
      "corpid":"mjowhar",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         }
      ]
   },
   {
      "name":"Muralidharan, Krithiga",
      "first_name":"Krithiga",
      "corpid":"krmuralidharan",
      "meeting":[
         {
            "start_time" :"2:00PM",
            "end_time" : "3:00PM",
            "content":" Deployment",
            "subject":"Meeting with Thyagu"
         }
      ]
   }
];

var count = 0;

data.forEach(function(doc){
        var doc = new Employee(doc);
        doc.save();
        count++;
})

mongoose.disconnect(function(){
        console.log("closing the mongodb connections")
})
