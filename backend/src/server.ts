import express, { json } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import user from './model/user';
import nation from './model/nation';
import sport from './model/sport';
import discipline from './model/discipline';
import event_location from './model/event_location';
import competition from './model/competition';
import athlete from './model/athlete';
import competing from './model/competing';
import delegating from './model/delegating';
import registered from './model/registered';

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
  athlete.aggregate([
    { 
        "$project" : { 
            "_id" : 0, 
            "a" : "$$ROOT"
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "a.idNation", 
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
        "$project" : { 
            "nation" : "$n.name", 
            "id" : "$a.id", 
            "name" : "$a.name", 
            "surname" : "$a.surname", 
            "idSport" : "$a.idSport", 
            "gender" : "$a.gender", 
            "_id" : 0
        }
    }
], (err: any, ath: any) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      res.json(ath);
    }
  })
});

router.route('/getAllCompetings').get((req, res) => {
  athlete.aggregate([
    { 
        "$project" : { 
            "_id" : 0, 
            "a" : "$$ROOT"
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "a.id", 
            "from" : "Competing", 
            "foreignField" : "idAthlete", 
            "as" : "c"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$c", 
            "preserveNullAndEmptyArrays" : true
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "c.idCompetition", 
            "from" : "Competitions", 
            "foreignField" : "id", 
            "as" : "comp"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$comp", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$project" : { 
            "idAthlete" : "$a.id", 
            "idCompetition" : "$c.idCompetition", 
            "idDiscipline" : "$comp.idDiscipline", 
            "_id" : 0
        }
    }
  ], (err: any, comp: any) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      res.json(comp);
    }
  })

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
        console.log(err);
        res.status(400);
      }
      else {
        res.json(ath);
      }
  })
});

router.route('/insertAthlete').post((req, res) => {
  let dis = req.body.discipline;
  let gender = req.body.gender;
  let name = req.body.name;
  let surname = req.body.surname;
  let idAthlete = req.body.idAthlete;
  let nat = req.body.nation;

  athlete.findOne({'id': idAthlete}, (err, ath) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      nation.findOne({'name': nat}, (err, n) => {
        if(err) {
          console.log(err);
          res.status(400);
        }
        else {
          discipline.findOne({'name': dis}, (err, d) => {
            if(err) {
              console.log(err);
              res.status(400);
            }
            else {
              if(ath == null) {
                athlete.collection.insertOne({'id': idAthlete, 'name': name, 'surname': surname,
                                              'gender': gender, 'idNation': n.get('id'), 
                                              'idSport': d.get('idSport'), 
                                              'gold': 0, 'silver': 0, 'bronze': 0});
                registered.collection.insertOne({'idAthlete': idAthlete, 'idDiscipline': d.get('id')}); 
                res.json({'message': 'OK'});
              }
              else {
                if(ath.get('idNation') != n.get('id')) {
                  res.json({'message': 'Athlete with this ID alreade compete for other nation'});
                }
                else if(ath.get('idSport') != d.get('idSport')) {
                  res.json({'message': 'One athlete cannot compete in multiple sports'});
                }
                else {
                  registered.collection.insertOne({'idAthlete': idAthlete, 'idDiscipline': d.get('id')}); 
                  res.json({'message': 'OK'});
                }

              }
            }
          })
        }
      })
    }
  })

});

router.route('/getAthletesForNation').post((req, res) => {
  let nat = req.body.nation;

  nation.findOne({'name': nat}, (err, n) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      athlete.find({'idNation': n.get('id')}, (err, ath) => {
        if(err) {
          console.log(err);
          res.status(400);
        }
        else {
          res.json(ath);
        }
      })

    }
  })
});

router.route('/removeDisciplineFromAthlete').post((req, res) => {
  let idAthlete = req.body.idAthlete;
  let idDiscipline = req.body.idDiscipline;

  registered.collection.deleteOne({'idAthlete': idAthlete, 'idDiscipline': idDiscipline});
  res.json({'message': 'OK'});
});

router.route('/removeAthlete').post((req, res) => {
  let idAthlete = req.body.idAthlete;

  athlete.collection.deleteOne({'id': idAthlete});
  res.json({'message': 'OK'});
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
  let dis = req.body.discipline;
  let gender = req.body.gender;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let location = req.body.location;
  let format = req.body.format;

  discipline.findOne({'name': dis}, (err, d) => {
    if(err)  {
      console.log(err);
      res.status(400);
    }
    else {
      event_location.findOne({'name': location}, (err, loc) => {
        if(err)  {
          console.log(err);
          res.status(400);
        }
        else {
          competition.findOne({'gender': gender, 'idDiscipline': d.get('id')}, (err, di) => {
            if(di == null) {
              competition.findOne({}, (err, comp) => {
                if(err)  {
                  console.log(err);
                  res.status(400);
                }
                else {
                  if(comp == null) {
                    competition.collection.insertOne({'id': 1, 'startDate': startDate, 'endDate': endDate, 
                                                      'gender': gender, 'idDiscipline': d.get('id'), 
                                                      'idLocation': loc.get('id'), 'format': format});
                  }
                  else {
                    competition.collection.insertOne({'id': comp.get('id')+1, 'startDate': startDate, 
                                                      'endDate': endDate, 'gender': gender, 
                                                      'idDiscipline': d.get('id'), 'idLocation': loc.get('id'), 
                                                      'format': format});
                  }
                  res.json({'message': 'OK'});
                }
              }).sort({'id': -1}).limit(1);
            }
            else {
              competition.collection.updateOne({'gender': gender, 'idDiscipline': d.get('id')}, 
                                                { $set: {'startDate': startDate, 'endDate': endDate, 
                                                'idLocation': loc.get('id'), 'format': format}});
              res.json({'message': 'OK'});
            }
          })

        }
      })
    }
  })
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
        console.log(err);
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
        console.log(err);
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
      console.log(err);
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
            "id" : "$d.id",
            "sport" : "$s.name", 
            "status" : "$d.status", 
            "name" : "$d.name", 
            "_id" : 0
        }
    }
  ], (err: any, dis: any) => {
    if(err) {
      console.log(err);
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
            "u.username" : username, 
            "u.password" : password
        }
    }, 
    { 
        "$project" : { 
            "name" : "$u.name", 
            "surname" : "$u.surname", 
            "type" : "$u.type", 
            "nation" : "$n.name", 
            "_id" : 0
        }
    }
  ], (err: any, usr: any) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      res.json(usr);
    }
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
      console.log(err);
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
  user.aggregate([
    { 
        "$project" : { 
            "_id" : 0, 
            "u" : "$$ROOT"
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "u.id", 
            "from" : "Delegating", 
            "foreignField" : "idDelegate", 
            "as" : "d"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$d", 
            "preserveNullAndEmptyArrays" : true
        }
    }, 
    { 
        "$match" : { 
            "u.type" : "competition_delegate"
        }
    }, 
    { 
        "$group" : { 
            "_id" : { 
                "u᎐surname" : "$u.surname", 
                "u᎐id" : "$u.id", 
                "u᎐name" : "$u.name"
            }, 
            "COUNT(d᎐idDelegate)" : { 
                "$sum" : 1
            }
        }
    }, 
    { 
        "$project" : { 
            "id" : "$_id.u᎐id", 
            "name" : "$_id.u᎐name", 
            "surname" : "$_id.u᎐surname", 
            "delegating" : "$COUNT(d᎐idDelegate)", 
            "_id" : 0
        }
    }
  ], (err: any, del: any) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      res.json(del);
    }
  })

});

router.route('/getCompetitions').get((req, res) => {
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
        "$lookup" : { 
            "localField" : "d.id", 
            "from" : "Competitions", 
            "foreignField" : "idDiscipline", 
            "as" : "c"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$c", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
        "$lookup" : { 
            "localField" : "c.idLocation", 
            "from" : "EventLocations", 
            "foreignField" : "id", 
            "as" : "l"
        }
    }, 
    { 
        "$unwind" : { 
            "path" : "$l", 
            "preserveNullAndEmptyArrays" : false
        }
    }, 
    { 
      "$lookup" : { 
          "localField" : "c.id", 
          "from" : "Delegating", 
          "foreignField" : "idCompetition", 
          "as" : "de"
      }
    }, 
    { 
        "$unwind" : { 
            "path" : "$de", 
            "preserveNullAndEmptyArrays" : true
        }
    },
    { 
      "$sort" : { 
          "c.startDate" : 1
      }
    },
    { 
        "$project" : { 
            "id" : "$c.id", 
            "sport" : "$s.name", 
            "discipline" : "$d.name", 
            "gender" : "$c.gender", 
            "startDate" : "$c.startDate", 
            "endDate" : "$c.endDate", 
            "location" : "$l.name", 
            "format" : "$c.format", 
            "idDelegate" : "$de.idDelegate", 
            "_id" : 0
        }
    }
  ], (err: any, comp: any) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      res.json(comp);
    }
  })
});

router.route('/updateCompeting').post((req, res) => {
  let idAthlete = req.body.idAthlete;
  let idCompetition = req.body.idCompetition;
  let isCompeting = req.body.competing;
  let seed = req.body.seed;

  competition.findOne({'id': idCompetition}, (err, comp) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      console.log(isCompeting);
      if(isCompeting) {
        competing.collection.insertOne({'idAthlete': idAthlete, 'idCompetition': idCompetition, 'seed': seed});
      }
      else {
        competing.collection.deleteOne({'idAthlete': idAthlete, 'idCompetition': idCompetition});
      }
      res.json({'message': 'OK'});
    }
  })

});

router.route('/getLocations').get((req, res) => {
  event_location.find({}, (err, loc) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else res.json(loc);
  })
});

router.route('/getAllRegistered').get((req, res) => {
  registered.find({}, (err, reg) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else res.json(reg);
  })
});

router.route('/getNumOfDelegating').post((req, res) => {
  let id = req.body.id;

  delegating.aggregate([
    { 
        "$match" : { 
            "d.idDelegate" : id
        }
    }, 
    { 
        "$group" : { 
            "_id" : { 

            }, 
            "COUNT(d᎐idDelegate)" : { 
                "$sum" : 1
            }
        }
    }, 
    { 
        "$project" : { 
            "COUNT(d᎐idDelegate)" : "$COUNT(d᎐idDelegate)", 
            "_id" : 0
        }
    }
  ], (err: any, del: any) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      res.json(del);
    }
  })

});


router.route('/updateDelegate').post((req, res) => {
  let idCompetition = req.body.idCompetition;
  let idDelegate = req.body.idDelegate;

  delegating.findOne({'idCompetititon': idCompetition}, (err, del) => {
    if(err) {
      console.log(err);
      res.status(400);
    }
    else {
      if(del == null) {
        delegating.collection.insertOne({'idCompetititon': idCompetition, 'idDelegate': idDelegate});
      }
      else {
        delegating.collection.updateOne({'idCompetititon': idCompetition}, 
                { $set: {'idDelegate': idDelegate}});

        res.json({'message': 'OK'});
      }
    }
  })
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));