var express = require('express');
var router = express.Router();
var User = require('../models/user');

const excel = require("exceljs");


router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});


router.post('/',function(req, res, next) {
	var personInfo = req.body;
	if(!personInfo.email  || !personInfo.password ){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					//download();
					User.findOne({},function(err,data){
						var newPerson = new User({
							email:personInfo.email,
							name: personInfo.name,
							address: personInfo.address,
							hobbies: personInfo.hobbies,
							password: personInfo.password,
							photograph:personInfo.photograph
							
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){

		if(data){
			
			if(data.password==req.body.password){
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

router.get('/profile', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		//console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('data.ejs', {"name":data.name,"address":data.address,"hobbies":data.hobbies,"email":data.email,"Logo":data.photograph});
			
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/excelDownload', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log(data);
			return res.render('excel.ejs', {"name":data.name,"address":data.address,"hobbies":data.hobbies,"email":data.email,"Logo":data.photograph});
	});
});





module.exports = router;
