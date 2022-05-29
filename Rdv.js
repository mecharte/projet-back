//test
module.exports = class Rdv {

    constructor(titre, date, heureD, heureF) {
        this._id =0;
        this._titre = titre;
        this._date = date;
        this._description = description;
        this._heureD = heureD;
        this._heureF = heureF;
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id= value;
    }

    get titre() {
        return this._titre;
    }

    set titre(value) {
        this._titre = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get description(){
        return this._description;
    }

    set id(value){
        this._description= value;
    }

    get heureD() {
        return this._heureD;
    }

    set heureD(value) {
        this._heureD = value;
    }

    get heureF() {
        return this._heureF;
    }

    set heureF(value) {
        this._heureF = value;
    }
}