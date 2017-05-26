//
//  ViewController.swift
//  Summersity
//
//  Created by Timothy McWatters on 5/25/17.
//  Copyright © 2017 Timothy McWatters. All rights reserved.
//

import UIKit
import MapKit

class MapViewController: UIViewController, MKMapViewDelegate {

    let initialLocation = CLLocation(latitude: 27.6648, longitude: -84)
    let regionRadius: CLLocationDistance = 375000
    var locationManager: CLLocationManager!

    
    @IBOutlet weak var mapView: MKMapView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.setNavigationBarItem()
        centerMapOnLocation(location: initialLocation)
        
        let locations = DataSource.locations()

        mapView.addAnnotations(locations)
        self.title = "SummerSity"
        self.navigationItem.title = "SummerSity"
    }

    func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
        let identifier = "Campus"
        
        if annotation is Campus {
            var annotationView = mapView.dequeueReusableAnnotationView(withIdentifier: identifier)
            
            if annotationView == nil {
                annotationView = MKPinAnnotationView(annotation: annotation, reuseIdentifier: identifier)
                annotationView!.canShowCallout = true
                
                let btn = UIButton(type: .detailDisclosure)
                annotationView!.rightCalloutAccessoryView = btn
            }
            else {
                annotationView!.annotation = annotation
            }
            return annotationView
        }
        return nil
    }
    
    func mapView(_ mapView: MKMapView, annotationView view: MKAnnotationView, calloutAccessoryControlTapped control: UIControl) {
                let campus = view.annotation as! Campus
        let placeName = campus.title
        let placePhone = campus.phone
        
        let ac = UIAlertController(title: placeName, message: "Would you like to know more?", preferredStyle: .alert)
        let ok = UIAlertAction(title: "OK", style: .default) { (action) in
            
            let detailsVc = self.storyboard?.instantiateViewController(withIdentifier: "details")
            self.navigationController?.pushViewController(detailsVc!, animated: true)
        }
        ac.addAction(ok)
        ac.addAction(UIAlertAction(title: "Cancel", style: .cancel))
        
        present(ac, animated: true)
       
         
    
        
 }
    
    func centerMapOnLocation(location:CLLocation) {
        let coordianteRegion = MKCoordinateRegionMakeWithDistance(location.coordinate, regionRadius * 2.0, regionRadius * 2.0)
        mapView.setRegion(coordianteRegion, animated: true)
    }

    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    func changeVC(id:String, data:Any?){
        var vcid = ""
        
        if id == "Main"{
            vcid = "SummerCity"
            let vc = self.storyboard?.instantiateViewController(withIdentifier: vcid)
            self.navigationController?.pushViewController(vc!, animated: true)
        }
        if id == "About"{
            vcid = "about"
            let vc = self.storyboard?.instantiateViewController(withIdentifier: vcid)
            self.navigationController?.pushViewController(vc!, animated: true)
        }
        if id == "Options"{
            vcid = "options"
            let vc = self.storyboard?.instantiateViewController(withIdentifier: vcid)
            self.navigationController?.pushViewController(vc!, animated: true)
        }
        
        if id == "Map"{
            vcid = "map"
            let vc = self.storyboard?.instantiateViewController(withIdentifier: vcid)
            self.navigationController?.pushViewController(vc!, animated: true)
        }
        
        self.slideMenuController()?.closeLeft()

        
    }


}

