var express = require('express');
var app = express();
var itemRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://10.13.66.82:27017/automationframework";
var act= new Array();
 var xo=[];
 var ObjectId = require('mongodb').ObjectID;
 var update=require('mongodb').update;

 itemRouter.route('/getTestcastags').post(function (req,res)
{
								MongoClient.connect(url, function(err, db)
								{
									if (err) throw err;
									db.collection("testcaseTags").find({"project": req.body.project_id}).toArray(function(err, tags)
															      {

																     if (err) throw err;
                                 console.log(req.body.project_id);
																  res.send({testtagname:tags});
																  });
                                });
 });

 itemRouter.route('/planning').post(function (req,response)
 {
                MongoClient.connect(url, function(err, db)
                {


                  if (err) throw err;

                          db.collection("projects").find({}).toArray(function(err, proje)
                          {
                            if (err) throw err;
                            var res = [];
                                         response.render('item',{res:res,proje:proje});
                                    });


                            });


                });



	 itemRouter.route('/testcases').post(function (req,response)
{


    //  console.log(req.body.tag);
              console.log('I am ajex for load button');
                console.log(req.body.project_id);
                console.log(req.body.tag);
                MongoClient.connect(url, function(err, db)
                {
                  if (err) throw err;
                  db.collection("testcases").find({$and: [{"project": req.body.project_id},{"tag": req.body.tag}]}).toArray(function(err, res)
                                    {

                                     if (err) throw err;
                                 console.log(res);
                                  response.send({testtagname:res});
                                  });
                                });

});


module.exports = itemRouter;
