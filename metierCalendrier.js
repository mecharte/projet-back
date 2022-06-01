const creneaux = require('./creneau');
//liste de RDV
let liste = [];
let listeP =[];
let idRdv=0;
let idCreneau=0;
let listParticipe=[];
let idPers=0;

//constructeur de rdv permet de definir les attributs necessaires pour creer un rendez vous
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
    this.listParticipe=[];
}

//constructeur avec structure
function Personne(personne){
    this.id =personne.id;
    this.nom =personne.nom;
    this.prenom = personne.prenom;
    this.listParticipe=[];

}
//fonction qui permet d'ajouter un rdv dans la listeParticipe
//liste => correspond a la liste des rdv
//listeParticipe => correspond a la liste des rdv pour lequel le profil participe
var ajouterDansListeParticipe = function () {
    for(let i=0;i<liste.length;i++)
    listParticipe[i]=liste[i];
    return listParticipe;
}

//Methode Metier
// Pour ajouter un creneau
//tmpCreneau => correspond au creneau temporaire creer pour inserer les données voulues
//liste => correspond a la liste des rdv
//liste[i].listeCreneau => correspond a la liste des creneaux d'un
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

//fonction qui permet de recuperer un creneau de la liste.listeCreneau
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

//get listeParticipe permet de recuperer la listeParticipe
var recupererListeParticipe = function () {
    return Object.values(listParticipe);
}

// Lister les Rdv permet de recuperer les objets preésents dans la liste
var lister = function () {
    return Object.values(liste);
}

//lister personne permet de recuperer les objets presents dans la listePers
var listerP = function () {
    return Object.values(listeP);
}

// Pour trouver la place d'un creneau dans liste rendez-vous
//pos = position du creneau
//liste => correspond a la liste de rdv
//liste[i].listeCreneaux => correspond a la liste des creneaux d'un rdv
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
//fonction qui permet de cloturer un rdv ce qui bloque le creneau qui possede le plus de ok des participants
//this.isCloturer => permet de savoir si le bouton a ete clique
//nbOKMAX => correspond au nombreMax de personne ayant vote pour un creneau d'un rdv
//positionNBokMAX => correspond a la position dans la liste du creneau qui possede le plus de ok d'un rdv
//listeCloturer => correspond a la nouvelle liste qui possedera que le creneau qui possede le plus de ok
//this.detail.listeCreneaux => correspond a la liste du creneau
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
//fonction qui permet d'ajouter un + au bouton ok
//this.detail => correspond au rdv
//this.detail.listeCreneaux => liste des creneaux du rdv
//positionCreneau => correspond au creneau pour lequel on vas ajouter un + au bouton ok
var ajouterOK = function (idRdv, idCreneau) {
    let pos = getPositionCreneau(idRdv,idCreneau);
    liste[idRdv].listeCreneaux[pos].numOK++;
}
//fonction qui permet d'ajouter un + au bouton ko
//this.detail => correspond au rdv
//this.detail.listeCreneaux => liste des creneaux du rdv
//positionCreneau => correspond au creneau pour lequel on vas ajouter un + au bouton ko
var ajouterKO = function (idRdv, idCreneau) {
    let pos = getPositionCreneau(idRdv,idCreneau);
    liste[idRdv].listeCreneaux[pos].numKO++;
}
//Ajout personne
//listeP => correspond a la liste des personnes
var ajouterPers = function(personne) {
    //On ajoute à notre liste une personne
    listeP[idPers] = new Personne(personne);
    listeP[idPers].id = idPers;
    idPers++;
    return listeP[idPers-1]
}
//Ajout rdv
//lsite => correspond a la liste des rdv
var ajouter = function (rdv) {
    //On ajoute à notre liste le nouveau theme
    liste[idRdv] = new Rdv(rdv);
    liste[idRdv].id = idRdv;
    idRdv++;
    return liste[idRdv - 1]
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
exports.recupererListeParticipe=recupererListeParticipe;
exports.ajouterPers = ajouterPers;