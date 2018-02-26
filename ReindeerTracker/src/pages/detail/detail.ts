
import { NavController, NavParams } from 'ionic-angular';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation'; 
declare var google;

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: string = "AIzaSyA4JravLPxlSKJZ9gadEoSmv27MPH00xAI";
  markers: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public nav: NavController, public connectivityService: ConnectivityService, private geolocation: Geolocation) {
    console.log("ID IS:" + this.navParams.get('item').id) //Data die je meekrijgt van de homepage
    this.loadGoogleMaps();
  }
  data: IReindeer[] = 
  [
    {
      "id": 1,
      "activity":  new Date(2018,2,23,14,2),
      "status": true,
      "battery": 98,
      "lat":51.347732,
      "long":4.705509,
      "name":'sven',
      "age":4
    }
  ]

  ionViewDidLoad() {
    console.log('ionViewDidLoad Maps');
      
      
  }
  loadGoogleMaps(){
 
    this.addConnectivityListeners();
 
  if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();
 
    if(this.connectivityService.isOnline()){
      console.log("online, loading map");
 
      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }
 
      let script = document.createElement("script");
      script.id = "googleMaps";
 
      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
      }
 
      document.body.appendChild(script); 
 
    }
  }
  else {
 
    if(this.connectivityService.isOnline()){
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }
 
  }

 
  }

  initMap(){
 
    this.mapInitialised = true;
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true
      }

      
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      this.addMarker(51.24013,4.41485,"4");

      var Showplan = new google.maps.Polyline({
        path:[
          new google.maps.LatLng(51.23013,4.41585),
          new google.maps.LatLng(51.25013,4.31585),
          new google.maps.LatLng(51.23083,4.45585),
          new google.maps.LatLng(51.24013,4.41485),
        ],
        strokeColor:"#FF0000",
        strokeOpacity:0.8,
        strokeWeight:4
      });
      Showplan.setMap(this.map);


    });
 
  }

  disableMap(){
    console.log("disable map");
  }
 
  enableMap(){
    console.log("enable map");
  }
 
  addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadGoogleMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    window.addEventListener('online', onOnline, false);
    window.addEventListener('offline', onOffline, false);

    
 
  }
 

  addMarker(lat: number, lng: number, lbl: string,): void {

    let latLng = new google.maps.LatLng(lat, lng);
    var image = 'https://thumb.ibb.co/dfB2fx/deer.png';
     

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      //label: lbl,
      icon:image
    });

    this.markers.push(marker);

  }

  openDetail(item : any){
    this.nav.push(DetailPage, {
      item : item
  });

  }
}



interface IReindeer
{
id : number;
activity : Date;
status : boolean;
battery : number;
lat: number;
long: number;
name: string;
age: number;

}
