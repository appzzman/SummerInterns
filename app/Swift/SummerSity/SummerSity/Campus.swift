//
//  Campus.swift
//  Summersity
//
//  Created by Timothy McWatters on 5/25/17.
//  Copyright © 2017 Timothy McWatters. All rights reserved.
//

import UIKit
import MapKit

class Campus: NSObject, MKAnnotation {
    var title: String?
    var coordinate: CLLocationCoordinate2D
    var phone: String
    var web: String
    var email: String
    var address: String
    var fax: String
    var facebook: String
    var instagram: String
    var twitter: String
    
    init(title: String, coordinate: CLLocationCoordinate2D, phone: String, web: String, email: String, address: String, fax: String, facebook: String, instagram: String, twitter: String) {
        self.title = title
        self.coordinate = coordinate
        self.phone = phone
        self.web = web
        self.email = email
        self.address = address
        self.fax = fax
        self.facebook = facebook
        self.instagram = instagram
        self.twitter = twitter
    }
}
