var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST de la création de l'utilisateur en BDD */
router.post('/sign-up', async function(req, res, next) {

  // créer un user en BDD sur la base du model user

  // renvoi d'une reponse userSaved pour notifier le front 
  res.json();
});

/* POST de la connexion de l'utilisateur + renvoi des erreurs */
router.post('/sign-in', async function(req, res, next) {

  // search l'utilisateur dans la BDD user
  // user trouvé ? connexion allowed : renvoi d'erreur(s)

  // renvoi du result du search + l'utilisateur trouvé + error
  res.json();
});

/* POST Assigner une place de parking à un user */
router.post('/find-a-place', async function(req, res, next) {

  // find une place available dans la BDD parkingspot 
  // avec la query floor.

  // Bonus proposer un étage avec place dispo apres request

  // renvoi du user + de num la place disponible 
  res.json();
});

/* GET chercher la place de parking d'un user */
router.get('/find-my-place', async function(req, res, next) {

  // recuperer l'id user du front et find sa place
  // dans la BDD parkingspot 

  // Bonus renvoyer s'il est en hors forfait (au dessus du tps d'occupation)

  // renvoi du user + sa place (etage et numero)
  res.json();
});

/* POST dé-assigner la place de parking d'un user */
router.post('/leave-parking', async function(req, res, next) {

  // recuperer l'id user du front et find sa place
  // dans la BDD parkingspot 

  // Bonus renvoyer s'il est en hors forfait (au dessus du tps d'occupation)

  // renvoi du user + sa place (etage et numero)
  res.json();
});

/* GET read les infos users */
router.get('/admin-get-info', async function(req, res, next) {

  // recuperer les infos d'un user

  // renvoi des infos 
  res.json();
});

/* UPDATE read update et delete des infos users */
router.update('/admin-update-info', async function(req, res, next) {

  // recuperer les infos d'un user
  // updater les données de l'utilisateur

  // renvoi le user updaté 
  res.json();
});

/* DELETE read update et delete des infos users */
router.delete('/admin-delete-info', async function(req, res, next) {

  // recuperer les infos d'un user
  // delete les données 

  // renvoi du user + result
  res.json();
});

/* POST Créer une place de parking */
router.post('/admin-create-parkingspot', async function(req, res, next) {

  // créer une nouvelle place + new floor ? 
  // Pas de duplicata possible avec les anciennes places

  // renvoi de la nouvelle place + result
  res.json();
});

module.exports = router;
