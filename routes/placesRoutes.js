const express = require('express');
const HttpError = require('../common/HttpError');
const { v4: uuidv4 } = require('uuid')

const router = express.Router();

let places = 
    [
        {
           "id":"1",
           "userId": "1",
           "address":{
              "street":"Kulas Light",
              "suite":"Apt. 556",
              "city":"Gwenborough",
              "zipcode":"92998-3874",
              "geo":{
                 "lat":"54.5295628",
                 "lng":"-1.0951832"
              }
           },
           "image": "https://upload.wikimedia.org/wikipedia/commons/8/82/The_market_cross%2C_Guisborough_-_geograph.org.uk_-_1628717.jpg",
           "title":"",
           "description":""
        },
        {
           "id":"2",
           "userId": "2",
           "address":{
              "street":"Victor Plains",
              "suite":"Suite 879",
              "city":"New Yourk",
              "zipcode":"90566-7771",
              "geo":{
                 "lat":"40.7484405",
                 "lng":"-73.9878531"
              }
           },
           "image": "https://media.timeout.com/images/101705309/1372/772/image.jpg",
           "title":"",
           "description":""
        },
     ];

router.get('/', (req, res, next) => {
    res.json(places);
})

router.post('/', (req, res, next) => {
    const newPlace = {...req.body, id: uuidv4()};
    places.push(newPlace);
    res.status(201).json(newPlace);
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const selectedPlace = places.find(e => e.id === id)
    if(!selectedPlace) {
        return next(new HttpError('Places not found', 404));
    }
    res.json(selectedPlace);
})

router.patch('/:id', function(req, res, next) {
    const id = req.params.id;
    const selectedPlace = places.find(e => e.id === id)
    if(!selectedPlace) {
        return next(new HttpError('Places not found', 404));
    }
    res.json(selectedPlace);
})

router.delete('/:id', function(req,res,next){
    const id = req.params.id;
    places = places.filter(place => place.id !== id);
    res.status(200).json({message: 'success'});
})

router.get('/users/:id', (req, res, next) => {
    const id = req.params.id;
    const selectedPlaces = places.filter(e => e.userId === id)
    if(!selectedPlaces.length) {
        return next(new HttpError('Not found', 404));
    }
    res.json(selectedPlaces);
})

module.exports = router;