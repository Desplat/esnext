const lg = console.log;
let favoriteCityId = 'rome';
lg(favoriteCityId);
favoriteCityId = 'paris';
lg(favoriteCityId);

const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro'];
lg(citiesId);
//citiesId = []; //Assignment to constant variable.
citiesId.push('tokyo');
lg(citiesId);

function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city, temperature };
}

const weather = getWeather(favoriteCityId);
lg(weather);

const {
    city: city,
    temperature: temperature
} = weather

lg(city, temperature);

const [parisId, nyId, ...othersCitiesId] = citiesId;
lg(parisId, nyId, othersCitiesId.length);

class Trip {

    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    toString() {
        return `Trip [ ${this.id}, ${this.name}, ${this.imageUrl}, ${this.price}]`;
    }

    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg')
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice;
    }
}

let parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');
lg(parisTrip);
lg(parisTrip.name);

lg(parisTrip.toString());
parisTrip.price = 100;
lg(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();
lg(defaultTrip.toString());

class FreeTrip extends Trip {

    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this.price = 0;
    }

    toString() {
        return `Free${super.toString()}`;
    }
}

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');
lg(freeTrip.toString());
lg('*************************');


class TripService {

    constructor() {
        // Set of 3 trips

        let tripParis = new Trip('paris', 'Paris', 'img/paris.jpg');
        let tripNantes = new Trip('nantes', 'Nantes', 'img/nantes.jpg');
        let tripRio = new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');

        this.service = new Set();

        this.service.add(tripParis);
        this.service.add(tripNantes);
        this.service.add(tripRio);

    }

    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                // ici l'exécution du code est asynchrone

                // TODO utiliser resolve et reject en fonction du résultat de la recherche

                this.service.forEach(element => {
                    if (element.name === tripName) {
                        resolve(element);
                        return;
                    }
                })
                reject(`No trip with name : ${tripName}`);

            }, 2000)
        });
    }
}

class PriceService {

    constructor() {
        // Map of 2 trips
        // 'paris' --> price = 100
        // 'rio-de-janeiro' --> price = 800)
        // no price for 'nantes'
        this.prices = new Map();

        this.prices.set('paris', 100);
        this.prices.set('rio-de-janeiro', 800);

    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                // ici l'exécution du code est asynchrone

                // TODO utiliser resolve et reject en fonction du résultat de la recherche
                if (this.prices.has(tripId)) {

                    resolve(this.prices.get(tripId));
                }
                else {
                    reject(`No price found for id : ${tripId}`);
                }

            }, 2000)
        });
    }
}

const tripService = new TripService();
const priceService = new PriceService();

tripService.findByName('Paris')
    .then(id => {
        lg(`Trip found : ${id}`);
    }, error => {
        lg(error);
    }
    );

tripService.findByName('Toulouse')
    .then(id => {
        lg(`Trip found : ${id}`);
    }, error => {
        lg(error);
    }
    );

tripService.findByName('Rio de Janeiro')
    .then(trip => {
        priceService.findPriceByTripId(trip.id)
            .then(id => {
                lg(`Price found : ${id}`);
            }, error => {
                lg(error);
            }
            );
    }, error => {
        lg(error);
    }
    )

tripService.findByName('Nantes')
    .then(trip => {
        priceService.findPriceByTripId(trip.id)
            .then(id => {
                lg(`Price found : ${id}`);
            }, error => {
                lg(error);
            }
            );
    }, error => {
        lg(error);
    }
    )
