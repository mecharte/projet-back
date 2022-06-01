const express = require('express');
const bodyparser = require('body-parser');
const metier = require('./metierCalendrier','./Pers');

//Parser JSON
app = express();
app.use(express.json());

//Pour lancer l'application Angular.js avec ng serve
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

//Ajouter Rdv
app.post('/api/rdv',function (req,res){
    //récupérer paramètres
    var Rdv = req.body;
    //métier
    var objres = metier.ajouter(Rdv);

    //forger resultat
    if ((typeof objres === 'undefined') || (typeof objres === {}))
    {
        res.status(400).json({});}
    else res.status(201).json(objres);
});

//Ajouter rdv dans liste Participe
app.post('/api/listeParticipe',function (req,res){
    //métier
    var id = req.params.id;
    var objres = metier.ajouterDansListeParticipe();
    //forger resultat
    if ((typeof objres === 'undefined') || (typeof objres === {}))
    {
        res.status(400).json({});}
    else res.status(201).json(objres);
});

//Lister listeParticipe
app.get('/api/listeParticipe',function (req,res){
    res.status(200).json(metier.recupererListeParticipe());
});

//Lister Rdv
    app.get('/api/rdv',function (req,res){
        res.status(200).json(metier.lister());
    });

//Rechercher
        app.get('/api/rdv/:id',function (req,res){
            //1
            var id = req.params.id;

            //2
            var objres = metier.getRdv(id);

            //3
            if ((typeof objres === 'undefined') || (typeof objres === {}))
                res.status(404).json({});
            else res.status(200).json(objres);

});

//cloturer creneau
app.post('/api/rdv/:id/cloturer', function(req,res){
    let idRdv = req.params.id
    metier.cloturerRDV(idRdv);
})

//AjouterOK
        app.post('/api/rdv/ajouterOK/:id', function(req,res){
            let idRdv = req.params.id
            let idCreneau = req.body.id
            metier.ajouterOK(idRdv, idCreneau);
        })

//AjouterKO
app.post('/api/rdv/ajouterKO/:id', function(req,res){
    let idRdv = req.params.id
    let idCreneau = req.body.id
    metier.ajouterKO(idRdv, idCreneau);
})

app.listen(3000, function (){
    console.log('Serveur running.....')
});

//Route qui sert à ajouter un creneau à un rdv grace à son id
app.post('/api/rdv/:id/ajouterCreneau', function (req, res) {
    //On récupère l'id qui est dans l'url
    let id = req.params.id;

    //On récupère le creneau passé en post
    let creneau = req.body;
    //On appelle la méthode pour ajouter le creneau à notre theme
  var objret=metier.ajouterCreneau(id, creneau);
    //On vérifie qu'il soit bien existant/instancier
    if ((typeof objret === 'undefined')) {
        //Erreur 404, L'objet n'existe pas ou n'a pas été trouvé
        res.status(404).json({message: "Ce rdv n'existe pas"});
    } else {
        //Code 201, confirme la création de l'objet
        res.status(201).json(objret);
    }
});

//Ajouter Pers
app.post('/api/pers/',function (req,res){

    //récupérer paramètres
    var Pers = req.body;
    //métier
    var obj = metier.ajouterPers(Pers);
    console.log(obj);

    //forger resultat
    if ((typeof obj === 'undefined') || (typeof obj === {}))
    {
        res.status(400).json({});}
    else res.status(201).json(obj);
});

//Lister Pers
app.get('/api/pers',function (req,res){
    res.status(200).json(metier.listerP());
});