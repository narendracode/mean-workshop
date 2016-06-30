var superagent = require('superagent');
var expect = require('expect.js');

describe('USER REST API TEST',function(){
        var id;
        var baseUrl = 'http://localhost:3000/users';

        it('Create User  ',function(done){
                superagent
                .post(baseUrl)
                .send({
                        name : 'Bob',
                        email : 'bob@nus.edu.sg'
                })
                .end(function(e,res){
                     expect(e).to.eql(null);                           //no error returned     
                     expect(typeof res.body['data']).to.eql('object'); // returns an object 
                     expect(res.body['data']._id.length).to.eql(24);   //default length of _id in mongodb is 24
                     id = res.body['data']._id;                        //get the id of returned object
                     done();
                })
        });

        it('Get a user ',function(done){
                superagent
                .get(baseUrl+'/'+id)
                .end(function(e,res){
                   expect(e).to.eql(null);
                   expect(res.body['type']).to.eql(true);
                   expect(typeof res.body['data']).to.eql('object');
                   expect(res.body['data']._id.length).to.eql(24);
                   expect(res.body['data']._id).to.eql(id);
                  done();
                })
        });

        it('Update a user',function(done){
                superagent
                .put(baseUrl+'/'+id)
                .send({
                        name : 'Peter',
                        email : 'peter@nus.edu.sg'
                })
                .end(function(e,res){
                   expect(e).to.eql(null);
                   expect(res.body['type']).to.eql(true);
                   expect(typeof res.body['data']).to.eql('object');
                   expect(res.body['data']._id.length).to.eql(24);
                   expect(res.body['data']._id).to.eql(id);
                   done();
                })
        });

        it('Get all users ',function(done){
                superagent
                .get(baseUrl)
                .end(function(e,res){
                   expect(e).to.eql(null);
                   expect(typeof res.body).to.eql('object');
                   done();
                })
        });

       it('Delete User',function(done){
          superagent
          .del(baseUrl+'/'+id)
          .end(function(e,res){
             expect(e).to.eql(null);
                   expect(res.body['type']).to.eql(true);
                  /*  expect(typeof res.body['data']).to.eql('number'); */
                   expect(typeof res.body['data']).to.eql('object');
                   done(); 
          })
       }); 

});
