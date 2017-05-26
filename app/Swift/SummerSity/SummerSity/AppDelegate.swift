//
//  AppDelegate.swift
//  SummerSity
//
//  Created by Janusz Chudzynski on 5/25/17.
//  Copyright © 2017 Janusz Chudzynski. All rights reserved.
//

import UIKit

class Colors{
    static let main:UIColor = UIColor(red: 0, green: 76/255.0, blue: 151/255.0, alpha: 1)
    static let secondary:UIColor = UIColor(red: 0, green: 122/255.0, blue: 51/255.0, alpha: 1)
}


@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let menu = storyboard.instantiateViewController(withIdentifier: "menu") as! MenuViewController
        let main = storyboard.instantiateViewController(withIdentifier: "map") as! MapViewController
                
        
        let nvc: UINavigationController = UINavigationController(rootViewController: main)
        UINavigationBar.appearance().tintColor = Colors.main
        menu.mainViewController = main
        menu.title = "SummerSity"
        
        let menuNvc: UINavigationController = UINavigationController(rootViewController: menu)
        
        let slideMenuController = SlideMenuController(mainViewController: nvc, leftMenuViewController: menuNvc)
        slideMenuController.delegate = main
        
        self.window?.rootViewController = slideMenuController
        self.window?.makeKeyAndVisible()
        
        
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }


}

