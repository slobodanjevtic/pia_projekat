import express, { json } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import user from './model/user';
import nation from './model/nation';
import sport from './model/sport';
import discipline from './model/discipline';
import e from 'express';

const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost:27017/olympic_games_2021_db");

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('Successful connection');
});

const router = express.Router();

router.route('/getAllAthletes').get((req, res) => {

});

router.route('/getAllAthletesWithMedals').get((req, res) => {
  nation.aggregate(
    [
      { 
          "$project" : { 
              "_id" : 0, 
              "n" : "$$ROOT"
          }
      }, 
      { 
          "$lookup" : { 
              "localField" : "n.id", 
              "from" : "Athletes", 
              "foreignField" : "idNation", 
              "as" : "a"
          }
      }, 
      { 
          "$unwind" : { 
              "path" : "$a", 
              "preserveNullAndEmptyArrays" : false
          }
      }, 
      { 
          "$lookup" : { 
              "localField" : "a.idSport", 
              "from" : "Sports", 
              "foreignField" : "id", 
              "as" : "s"
          }
      }, 
      { 
          "$unwind" : { 
              "path" : "$s", 
              "preserveNullAndEmptyArrays" : false
          }
      }, 
      { 
          "$group" : { 
              "_id" : { 
                  "a᎐name" : "$a.name", 
                  "a᎐gender" : "$a.gender", 
                  "a᎐surname" : "$a.surname", 
                  "n᎐name" : "$n.name", 
                  "s᎐name" : "$s.name"
              }, 
              "SUM(a᎐gold)" : { 
                  "$sum" : "$a.gold"
              }, 
              "SUM(a᎐silver)" : { 
                  "$sum" : "$a.silver"
              }, 
              "SUM(a᎐bronze)" : { 
                  "$sum" : "$a.bronze"
              }
          }
      }, 
      { 
          "$project" : { 
              "n.name" : "$_id.n᎐name", 
              "a.name" : "$_id.a᎐name", 
              "a.surname" : "$_id.a᎐surname", 
              "a.gender" : "$_id.a᎐gender", 
              "s.name" : "$_id.s᎐name", 
              "SUM(a.gold)" : "$SUM(a᎐gold)", 
              "SUM(a.silver)" : "$SUM(a᎐silver)", 
              "SUM(a.bronze)" : "$SUM(a᎐bronze)", 
              "_id" : 0
          }
      }, 
      { 
          "$sort" : { 
              "SUM(a.gold)" : -1, 
              "SUM(a.silver)" : -1, 
              "SUM(a.bronze)" : -1
          }
      }, 
      { 
          "$project" : { 
              "_id" : 0, 
              "nation" : "$n.name", 
              "name" : "$a.name", 
              "surname" : "$a.surname", 
              "gender" : "$a.gender", 
              "sport" : "$s.name", 
              "gold" : "$SUM(a.gold)", 
              "silver" : "$SUM(a.silver)", 
              "bronze" : "$SUM(a.bronze)"
          }
      }
  ], (err: any, ath: any) => {
      if(err) {
        res.status(400);
      }
      else {
        res.json(ath);
      }
  })
});

router.route('/insertAthlete').post((req, res) => {
  let sport = req.body.sport;
  let discipline = req.body.discipline;
  let gender = req.body.gender;
  let name = req.body.name;
  let surname = req.body.surname;

});

router.route('/removeAthlete').post((req, res) => {
  let idAthlete = req.body.idAthlete;
});

router.route('/insertMedalist').post((req, res) => {
  let idAthlete = req.body.idAthlete;
  let medal = req.body.medal;
});

router.route('/getMedalist').post((req, res) => {
  let idAthlete = req.body.idAthlete;
});

router.route('/getMedalCount').post((req, res) => {
  let idNation = req.body.idNation;
});

router.route('/insertCompetition').post((req, res) => {
  let sport = req.body.sport;
  let discipline = req.body.discipline;
  let gender = req.body.gender;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let location = req.body.location;
});

router.route('/insertCompeting').post((req, res) => {
  let sport = req.body.sport;
  let discipline = req.body.discipline;
  let gender = req.body.gender;
  let idAthlete = req.body.idAthlete;
});

router.route('/insertDelegateing').post((req, res) => {
  let sport = req.body.sport;
  let discipline = req.body.discipline;
  let gender = req.body.gender;
  let idDelegate = req.body.idDelegate;
});

router.route('/getDisciplineForCompetition').post((req, res) => {
  let idCompetition = req.body.idCompetition;
});

router.route('/getAllNations').get((req, res) => {
  nation.find({}, (err, nations) => {
    if(err)  {
      console.log(err);
      res.status(400);
    }
    else res.json(nations);
  }).sort({'name': 1});
});

router.route('/getNationsWithAthletes').get((req, res) => {
  nation.aggregate(
    [
      { 
          "$project" : { 
              "_id" : 0, 
              "n" : "$$ROOT"
          }
      }, 
      { 
          "$lookup" : { 
              "localField" : "n.id", 
              "from" : "Athletes", 
              "foreignField" : "idNation", 
              "as" : "a"
          }
      }, 
      { 
          "$unwind" : { 
              "path" : "$a", 
              "preserveNullAndEmptyArrays" : false
          }
      }, 
      { 
          "$group" : { 
              "_id" : { 
                  "n᎐flag" : "$n.flag", 
                  "n᎐name" : "$n.name"
              }, 
              "COUNT(a᎐id)" : { 
                  "$sum" : 1
              }
          }
      }, 
      { 
          "$project" : { 
              "flag" : "$_id.n᎐flag", 
              "name" : "$_id.n᎐name", 
              "numOfAthletes" : "$COUNT(a᎐id)", 
              "_id" : 0
          }
      }
  ], (err: any, nat: any) => {
      if(err) {
        res.status(400);
      }
      else {
        res.json(nat);
      }
  })
});

router.route('/getNationsWithMedals').get((req, res) => {
  nation.aggregate(
    [
      { 
          "$project" : { 
              "_id" : 0, 
              "n" : "$$ROOT"
          }
      }, 
      { 
          "$lookup" : { 
              "localField" : "n.id", 
              "from" : "Athletes", 
              "foreignField" : "idNation", 
              "as" : "a"
          }
      }, 
      { 
          "$unwind" : { 
              "path" : "$a", 
              "preserveNullAndEmptyArrays" : false
          }
      }, 
      { 
          "$group" : { 
              "_id" : { 
                  "n᎐name" : "$n.name"
              }, 
              "SUM(a᎐gold)" : { 
                  "$sum" : "$a.gold"
              }, 
              "SUM(a᎐silver)" : { 
                  "$sum" : "$a.silver"
              }, 
              "SUM(a᎐bronze)" : { 
                  "$sum" : "$a.bronze"
              }
          }
      }, 
      { 
          "$project" : { 
              "n.name" : "$_id.n᎐name", 
              "SUM(a.gold)" : "$SUM(a᎐gold)", 
              "SUM(a.silver)" : "$SUM(a᎐silver)", 
              "SUM(a.bronze)" : "$SUM(a᎐bronze)", 
              "_id" : 0
          }
      }, 
      { 
          "$sort" : { 
              "SUM(a.gold)" : -1, 
              "SUM(a.silver)" : -1, 
              "SUM(a.bronze)" : -1
          }
      }, 
      { 
          "$project" : { 
              "_id" : 0, 
              "name" : "$n.name", 
              "gold" : "$SUM(a.gold)", 
              "silver" : "$SUM(a.silver)", 
              "bronze" : "$SUM(a.bronze)"
          }
      }
  ], (err: any, nat: any) => {
      if(err) {
        res.status(400);
      }
      else {
        res.json(nat);
      }
  })
});

router.route('/getNation').post((req, res) => {
  let idNation = req.body.idNation;
});

router.route('/getAllEvents').get((req, res) => {

});

router.route('/insertEvent').post((req, res) => {
  let sport = req.body.sport;
  let discipline = req.body.discipline;
  let gender = req.body.gender;
  let data = req.body.data;
  let time = req.body.time;
  let location = req.body.location;
});

router.route('/getEvents').post((req, res) => {
  let sport = req.body.sport;
  let discipline = req.body.discipline;
  let gender = req.body.gender;
  let data = req.body.data;
  let time = req.body.time;
  let location = req.body.location;
});

router.route('/insertParticipating').post((req, res) => {
  let idEvent = req.body.idEvent;
  let idAthlete = req.body.idAthlete;
});

router.route('/updataParticipating').post((req, res) => {
  let idParticipating = req.body.idParticipating;
  let result = req.body.result;
});

router.route('/updateEvent').post((req, res) => {
  let sport = req.body.sport;
  let discipline = req.body.discipline;
  let gender = req.body.gender;
  let data = req.body.data;
  let time = req.body.time;
  let location = req.body.location;
});

router.route('/getAllSports').get((req, res) => {
  sport.find({}, (err, spr) => {
    if(err) {
      res.status(400);
    }
    else {
      res.json(spr);
    }
  }).sort({'name': 1});
});

router.route('/getAllDisciplines').get((req, res) => {
  sport.aggregate([
    { 
        "$project" : { 
            "_id" : 0, 
            "s" : "$$ROOT"
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "s.id", 
            "from" : "Disciplines", 
            "foreignField" : "idSport", 
            "as" : "d"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$d", 
            "preserveNullAndEmptyArrays" : false
        }
    },
    { 
      "$sort" : { 
          "d.name" : 1
      }
    }, 
    { 
        "$project" : { 
            "sport" : "$s.name", 
            "status" : "$d.status", 
            "name" : "$d.name", 
            "_id" : 0
        }
    }
  ], (err: any, dis: any) => {
    if(err) {
      res.status(400);
    }
    else {
      res.json(dis);
    }
  })

});

router.route('/addNewSportAndDiscipline').post((req, res) => {
  let spr = req.body.sport;
  let dis = req.body.discipline;


  sport.findOne({'name': spr}, (err, s) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      if(s != null) {
        discipline.findOne({}, (err, d) => {
          if(err) {
            console.log(err);
            res.status(400);
          }
          else {
            discipline.collection.insertOne({'id': d.get('id')+1, 'name': dis, 'status': 1, 
                                            'idSport': s.get('id')});
            res.json({'message': 'OK'});
          }
        }).sort({'id': -1}).limit(1);
      }
      else {
        sport.findOne({}, (err, s) => {
          sport.collection.insertOne({'id': s.get('id')+1, 'name': spr});

          discipline.findOne({}, (err, d) => {
            if(err) {
              console.log(err);
              res.status(400);
            }
            else {
              discipline.collection.insertOne({'id': d.get('id')+1, 'name': dis, 'status': 1, 
                                              'idSport': s.get('id')+1});
              res.json({'message': 'OK'});
            }
          }).sort({'id': -1}).limit(1);
        }).sort({'id': -1}).limit(1);
      }
    }
  })
});

router.route('/updateDiscipline').post((req, res) => {
  let dis = req.body.discipline;
  let status = req.body.status;

  discipline.collection.updateOne({'name': dis}, { $set: {'status': status}});
  res.json({'message': 'OK'});
});

router.route('/login').post((req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  user.findOne({'username': username, 'password': password}, (err, user) => {
    if(err) console.log(err);
    else res.json(user);
  })
});

router.route('/register').post((req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let name = req.body.name;
  let surname = req.body.surname;
  let nat = req.body.nation;
  let email = req.body.email;
  let type = req.body.type;

  user.findOne({}, (err, usr) => {
    if(err) {
      console.log(err);
      res.status(400);
    } 
    else {
      nation.findOne({'name': nat}, (err, nt) => {
        if(err) {
          console.log(err);
          res.status(400);
        }
        else {
          user.collection.insertOne({'id': usr.get('id') + 1, 'username': username, 'password': password, 
                                    'name': name, 'surname': surname, 'email': email, 'type': type, 
                                    'staus': 0, 'idNattion': nt.get('id')}, (err, u) => {
            if(err) {
              console.log(err);
              res.status(400);
            }         
            else {
              res.json({"message": "OK"});
            }                 
          });
        }
      })

    }
  }).sort({'id': -1}).limit(1);
});

router.route('/getAllPendingUsers').get((req, res) => {
  user.aggregate([
    { 
        "$project" : { 
            "_id" : 0, 
            "u" : "$$ROOT"
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "u.idNation", 
            "from" : "Nations", 
            "foreignField" : "id", 
            "as" : "n"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$n", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
      "$match" : { 
          "u.status" : 0
      }
    },
    { 
        "$project" : { 
            "id" : "$u.id", 
            "name" : "$u.name", 
            "surname" : "$u.surname", 
            "nation" : "$n.name", 
            "email" : "$u.email", 
            "type" : "$u.type", 
            "_id" : 0
        }
    }
  ], (err: any, usr: any) => {
    if(err) {
      res.status(400);
    }
    else {
      res.json(usr);
    }
})
});

router.route('/updateUser').post((req, res) => {
  let idUser = req.body.idUser;
  let status = req.body.status;

  user.collection.updateOne({'id': idUser}, { $set: {'status': status}});
  res.json({'message': 'OK'});
});

router.route('/getCompetitionDelegates').get((req, res) => {
  
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));