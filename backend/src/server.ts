import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';

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
  
});

router.route('/getAllDisciplines').post((req, res) => {
  let idSport = req.body.idSport;
});

router.route('/updateDiscipline').post((req, res) => {
  let idDiscipline = req.body.idDiscipline;
  let status = req.body.status;
});

router.route('/login').post((req, res) => {
  let username = req.body.username;
  let password = req.body.password;
});

router.route('/register').post((req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let name = req.body.name;
  let surname = req.body.surname;
  let nation = req.body.nation;
  let email = req.body.email;
  let type = req.body.type;
});

router.route('/getAllUsers').get((req, res) => {
  
});

router.route('/updateUser').post((req, res) => {
  let idUser = req.body.idUser;
  let status = req.body.status;
});

router.route('/getCompetitionDelegates').get((req, res) => {
  
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));