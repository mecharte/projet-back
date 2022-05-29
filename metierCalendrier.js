const creneaux = require('./creneau');
//liste de RDV
let liste = [];
let listeP =[];
let idRdv=0;
let idCreneau=0;

function Rdv(id,titre,description){
    this.id =id;
    this.titre =titre;
    this.description = description;
    this.listeCreneaux=[];
}

//constructeur avec structure
function Rdv(Rdv) {
    this.id = Rdv.id;
    this.titre = Rdv.titre;
    this.description = Rdv.description;
    this.listeCreneaux=[];
}
//constructeur TOUS les membres
function Personne(id,nom,prenom){
    this.id =id;
    this.nom =nom;
    this.prenom = prenom;
    this.listeParticipe=[];
}

//constructeur avec structure
function Personne(personne){
    this.id =personne.id;
    this.nom =personne.nom;
    this.prenom = personne.prenom;
    this.listeParticipe=[];

}

var ajouterDansListeParticipe = function (idRdv) {
    let tmprdv = liste;
    let i=0;
    while(tmprdv[idRdv].listeCreneaux[i].numOK<=0)
    {
        i++;
    }
    //On ajoute à notre listeParticipe le nouveau theme
    listeParticipe[idProfil].push(tmprdv[idRdv]);
    idPers++;
    return listeParticipe[idPers - 1]
}
//Methode Metier
//Ajout
var ajouter = function (rdv) {
    //On ajoute à notre liste le nouveau theme
    liste[idRdv] = new Rdv(rdv);
    liste[idRdv].id = idRdv;
    idRdv++;
    return liste[idRdv - 1]
}

// Pour ajouter un creneau
var ajouterCreneau = function (id, creneau){
    let tmpcreneau = creneau;
    //On force l'id en fonction du back
    tmpcreneau.id = idCreneau;
    //Ajoute le creneau au rdv grace a id passe dans paramètres
    liste[id].listeCreneaux.push(tmpcreneau);
    idCreneau++;
    //On retourne notre liste de creneau
    return liste[id].listeCreneaux[idCreneau-1];
}

var getListeCreneaux = function(id)
{
    //Si liste est undefined, on retourne {}
    if (typeof liste[id].listeCreneaux === 'undefined') return {};
    //On retourne notre rdv
    else return liste[id].listeCreneaux;
}
// Pour retourner un Rdv avec son id
var getRdv = function (id) {

    //Si le Rdv à cet indice est undefined, on retourne {} pour signe d'erreur, car il n'existe pas
    if (typeof liste[id] === 'undefined') return {};
    //On retourne notre rdv
    else return liste[id];
}

//get listeParticipe
var getlisteParticipe = function () {
    return Object.values(listeParticipe);
}

// Lister les Rdv
var lister = function () {
    return Object.values(liste);
}

//lister personne
var listerP = function () {
    return Object.values(listeP);
}

// Pour trouver la place d'un creneau dans liste rendez-vous
var getPositionCreneau = function (idRDV,idCreneau){
    let pos = -1;
    for(let i =0; i < liste[idRDV].listeCreneaux.length; i++){
        if (liste[idRDV].listeCreneaux[i].id == idCreneau)
        {
            pos = i;
            break;
        }
    }
    return pos;
}
var cloturerRDV = function (idRDV)
{
    let nbOKMAX=0;
    let positionNBokMAX=-1;
    //recuperer le nb participants le plus grands
    for(let i =0;i<liste[idRDV].listeCreneaux.length;i++)
    {
        if(liste[idRDV].listeCreneaux[i].numOK>nbOKMAX)
        {
            nbOKMAX = liste[idRDV].listeCreneaux[i].numOK;
            positionNBokMAX=i;
        }
    }
    //ajout du creneaux dans une nouvelle liste
    let listeCloturer=[];
    listeCloturer[0]=liste[idRDV].listeCreneaux[positionNBokMAX];
    //ajout de cette liste dans la liste du rdv
    liste[idRDV].listeCreneaux=listeCloturer;
}

var ajouterOK = function (idRdv, idCreneau) {
    let pos = getPositionCreneau(idRdv,idCreneau);
    liste[idRdv].listeCreneaux[pos].numOK++;
}

var ajouterKO = function (idRdv, idCreneau) {
    let pos = getPositionCreneau(idRdv,idCreneau);
    liste[idRdv].listeCreneaux[pos].numKO++;
}

exports.ajouter = ajouter;
exports.getRdv = getRdv;
exports.lister = lister;
exports.listerP = listerP;
exports.ajouterCreneau = ajouterCreneau;
exports.getListeCreneaux = getListeCreneaux;
exports.ajouterOK = ajouterOK;
exports.ajouterKO = ajouterKO;
exports.cloturerRDV = cloturerRDV;
exports.ajouterDansListeParticipe=ajouterDansListeParticipe;
exports.getlisteParticipe=getlisteParticipe;