//
//  DataSource.swift
//  Summersity
//
//  Created by Timothy McWatters on 5/25/17.
//  Copyright © 2017 Timothy McWatters. All rights reserved.
//

import UIKit
import MapKit

class DataSource: NSObject {
    //Static method - no need to initialize the instance of the class
    class func locations()->[Campus]{
        let FAU = Campus(title: "Florida Atlantic University", coordinate: CLLocationCoordinate2D(latitude: 26.390367, longitude: -80.099314), phone: "561-297-2880", web: "http://www.fau.edu/housing/", email: "housing@fau.edu", address: "777 Glades Road, Bldg. 46, Boca Raton, FL 33431", fax: "561-297-2881", facebook: "https://www.facebook.com/FAUHousing/", instagram: "https://www.instagram.com/fauhousing/", twitter: "https://twitter.com/housingfau")
        
        
        let FIU = Campus(title: "Florida International University", coordinate: CLLocationCoordinate2D(latitude: 25.773687, longitude: -80.373297), phone: "305-348-4190", web: "http://studentaffairs.fiu.edu/campus-services/housing-and-residential-life/conferences/summer-internship-housing/index.php", email: "housing@fiu.edu", address: "11200 SW 8th St. UT 121 Miami, FL 33199", fax: "305-348-4295", facebook: "https://www.facebook.com/LiveFIU", instagram: "https://www.instagram.com/LiveFIU/", twitter: "https://twitter.com/FIUHousing")
        
        
        let FPU = Campus(title: "Florida Polytecnic University", coordinate: CLLocationCoordinate2D(latitude: 25.818887, longitude: -80.327641), phone: "863-874-8779", web: "https://floridapolytechnic.org/student-life/residence-hall/", email: "live@floridapolystudentliving.com", address: "4700 Research Way Lakeland, FL 33805", fax: "N/A", facebook: "https://www.facebook.com/FloridaPolyStudentLiving", instagram: "https://www.instagram.com/flpolyhousing/", twitter: "https://twitter.com/flpolyhousing")
        
        
        let NCF = Campus(title: "New College of Florida", coordinate: CLLocationCoordinate2D(latitude: 27.401364, longitude: -82.55674), phone: "941-487-5000", web: "https://www.ncf.edu/campus-life/residential-life/", email: "N/A", address: "5800 Bay Shore Road Sarasota, FL 34243", fax: "N/A", facebook: "https://www.facebook.com/newcollegeofflorida", instagram: "https://www.instagram.com/newcollegeoffl/", twitter: "https://twitter.com/NewCollegeofFL")
        
        
        let UCF = Campus(title: "University of Central Florida", coordinate: CLLocationCoordinate2D(latitude: 28.606645, longitude: -81.199824), phone: "407-823-4663", web: "http://www.housing.ucf.edu/intern", email: "conferencehousing@ucf.edu", address: "12851 Gemini Blvd South Orlando, FL 32816", fax: "407-823-3831", facebook: "https://www.facebook.com/UCFHousing", instagram: "N/A", twitter: "https://twitter.com/UCFHousing")
        
        
        let UF = Campus(title: "University of Florida", coordinate: CLLocationCoordinate2D(latitude: 29.646104, longitude: -82.355066), phone: "352-392-2171", web: "http://www.housing.ufl.edu/conferenceservices/summerprograms/intern/", email: "ConferenceServices@housing.ufl.edu", address: "SW 13th Street and Museum Rd Gainsville, FL 32611", fax: "N/A", facebook: "https://www.facebook.com/UFHousingConferences", instagram: "https://www.instagram.com/UFHousingConferences/", twitter: "https://twitter.com/UFHousing")
        
        
        let UNF = Campus(title: "University of North Florida", coordinate: CLLocationCoordinate2D(latitude: 30.266408, longitude: -81.507264), phone: "904-620-4663", web: "https://www.unf.edu/housing/", email: "housing@unf.edu", address: "1 UNF Drive Bldg 14b Jacksonville, FL 32224", fax: "904-620-4670", facebook: "https://www.facebook.com/UNFHRL", instagram: "https://www.instagram.com/unf_hrl/", twitter: "https://twitter.com/UNF_HRL")
        
        
        let USFMC = Campus(title: "University of South Florida Main Campus", coordinate: CLLocationCoordinate2D(latitude: 28.062195, longitude: -82.413852), phone: "813-974-0001", web: "http://www.usf.edu/student-affairs/housing/housing-options/intern-housing.aspx", email: "sa-housinghelp@usf.edu", address: "4202 E. Fowler Ave RAR 229 Tampa, FL 33612", fax: "N/A", facebook: "https://www.facebook.com/usfhousing", instagram: "https://twitter.com/usfhousing", twitter: "https://www.instagram.com/usfhousing/")
        
        
        let USFSP = Campus(title: "University of South Florida St Pete Campus", coordinate: CLLocationCoordinate2D(latitude: 27.771555, longitude: -82.6349), phone: "727-873-5101", web: "http://www.usfsp.edu/housing/", email: "housing@usfsp.edu", address: "500 University Way South St Petersburg, FL 33701", fax: "N/A", facebook: "N/A", instagram: "N/A", twitter: "N/A")
        
        
        let UWF = Campus(title: "University of West Florida", coordinate: CLLocationCoordinate2D(latitude: 30.549843, longitude: -87.215991), phone: "850-474-2463", web: "http://uwf.edu/offices/housing-and-residence-life/options/camps-conferences-and-interns/", email: "housing@uwf.edu", address: "Bldg 19 11000 University Pkwy Pensacola, FL 32514", fax: "N/A", facebook: "https://www.facebook.com/uwfhousing", instagram: "https://www.instagram.com/uwfhousing/", twitter: "https://twitter.com/uwfhousing")
        
        return [FAU, FIU, FPU, NCF, UCF, UF, UNF, USFMC, USFSP, UWF]
    }
}
