//
//  ViewController.swift
//  SummerSity
//
//  Created by Janusz Chudzynski on 5/25/17.
//  Copyright © 2017 Janusz Chudzynski. All rights reserved.
//

import UIKit
extension UIViewController {
    
    func setNavigationBarItem() {
        self.addLeftBarButtonWithImage(UIImage(named: "ic_menu_black_24dp")!)
//        self.addRightBarButtonWithImage(UIImage(named: "ic_notifications_black_24dp")!)
        self.slideMenuController()?.removeLeftGestures()
        self.slideMenuController()?.removeRightGestures()
        self.slideMenuController()?.addLeftGestures()
        self.slideMenuController()?.addRightGestures()
    }
    
    func removeNavigationBarItem() {
        self.navigationItem.leftBarButtonItem = nil
        self.navigationItem.rightBarButtonItem = nil
        self.slideMenuController()?.removeLeftGestures()
        self.slideMenuController()?.removeRightGestures()
    }
}


extension MapViewController : SlideMenuControllerDelegate {
    func leftWillOpen() {
        print("SlideMenuControllerDelegate: leftWillOpen")
    }
    
    func leftDidOpen() {
        print("SlideMenuControllerDelegate: leftDidOpen")
    }
    
    func leftWillClose() {
        print("SlideMenuControllerDelegate: leftWillClose")
    }
    
    func leftDidClose() {
        print("SlideMenuControllerDelegate: leftDidClose")
    }
    
    func rightWillOpen() {
        print("SlideMenuControllerDelegate: rightWillOpen")
    }
    
    func rightDidOpen() {
        print("SlideMenuControllerDelegate: rightDidOpen")
    }
    
    func rightWillClose() {
        print("SlideMenuControllerDelegate: rightWillClose")
    }
    
    func rightDidClose() {
        print("SlideMenuControllerDelegate: rightDidClose")
    }
}


class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.setNavigationBarItem()
    }

    func changeVC(id:String, data:Any?){
        var vcid = ""
        self.slideMenuController()?.closeLeft()
        
        if id == "Main"{
            vcid = "SummerCity"
            let vc = self.storyboard?.instantiateViewController(withIdentifier: vcid)
            self.navigationController?.pushViewController(vc!, animated: true)
        }
        if id == "About"{
            vcid = "About"
            let vc = self.storyboard?.instantiateViewController(withIdentifier: vcid)
            self.navigationController?.pushViewController(vc!, animated: true)
        }
        if id == "Map"{
            vcid = "map"
            let vc = self.storyboard?.instantiateViewController(withIdentifier: vcid)
            self.navigationController?.pushViewController(vc!, animated: true)
        }

        
    }

}

