var mongoose = require('mongoose');
var User = require('../models/UserModel');

var ObjectId = mongoose.Types.ObjectId;

exports.create = function(req,res){
        var user = new User(req.body);
        user.save(function(err,result){
                if(err){
                        res.json({
                                type: false,
                                error: err
                        });
                }
                res.json({
                        type: true,
                        data : result
                });
        });
};

exports.getAll = function(req,res){
        User.find({},function(err,result){
                 if(err){
                        res.json({
                                type: false,
                                error: err
                        });
                }
                res.json({
                        type: true,
                        data : result
                });
        });
};

exports.get = function(req,res){
        var id = req.params.id;
        try{
                id = new ObjectId(id);
                User.findById(id,function(err,user){
                  if(err){
                        res.json({
                                type: false,
                                error: err
                        });
                  }
                  res.json({
                        type: true,
                        data : user
                  });
                });
        }catch(e){
                res.json({
                        type : false,
                        error : e
                });
        }
};


exports.update = function(req,res){
        var id = req.params.id;
        try{
                id = new ObjectId(id);
                 User.findById(id,function(err,user){
                    if(err){
                        res.json({
                                type: false,
                                error: err
                        });
                    }
                    user.email = req.body.email;
                    user.name = req.body.name;
                    user.save(function(err,result){
                        if(err){
                                res.json({
                                        type : false,
                                        error : err
                                });
                        }
                        res.json({
                                type : true,
                                data : result
                        });
                    });
                 });
 
        }catch(e){
                res.json({
                          type : false,
                          error : e
                });
        }
};


exports.delete = function(req,res){
  var id = req.params.id;
  try{
        id = new ObjectId(id);
        User.remove({_id : id},function(err,result){
             if(err){
                res.json({
                   type : false,
                   error : err
                });
              }
              res.json({
                    type : true,
                    data : result
              });
        });
  }catch(e){
        res.json({
                type: false,
                error: e
        });
  }
};
