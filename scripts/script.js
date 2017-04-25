

Array.prototype.indexOf || (Array.prototype.indexOf = function(d, e) {
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var c = Object(this),
        b = c.length >>> 0;
    if (0 === b) return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a] === d) return a;
        a++
    }
    return -1
});

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB1As1MtKDc7iNA5GEqf0W6f_k1bQNzJFE",
    authDomain: "summerhousing-5c0cf.firebaseapp.com",
    databaseURL: "https://summerhousing-5c0cf.firebaseio.com",
    projectId: "summerhousing-5c0cf",
    storageBucket: "summerhousing-5c0cf.appspot.com",
    messagingSenderId: "493524743868"
  };
  firebase.initializeApp(config);



  /**Helper for getting collections*/
  function getCollection(collectionName){
    var promise = new RSVP.Promise(function(fulfill, reject) {
    firebase.database().ref(collectionName).on("value", function(snapshot) {
        // console.log(snapshot);
        let array = []
        // let colleges = snapshot.val();

        snapshot.forEach(function(snap){
            var el = snap.val()
            el.key = snap.key
            array.push(el)
          });
          fulfill(array)
      });
    });
    return promise
  }

  function initMap() {
    var fl_cen = {lat:28.6648, lng:-84.5158}

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: fl_cen
    });

    getCollection('contact').then(function(contacts){
      contacts.forEach(function(contact){
              var myLatLng = {lat:contact.latitude , lng: contact.longitude};
              var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                animation: google.maps.Animation.DROP,
                title: contact.fullname,
                icon: "images/"+contact.iconURL,
                key1:contact.key
              });
              setTimeout(function () {

              }, 200);
              marker.set("key", contact.key)
              // console.log(marker.key);
             marker.addListener('click', toggleBounce);
        });
    });

  }
