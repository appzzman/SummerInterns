//
//  MenuViewController.swift
//  SummerSity
//
//  Created by Janusz Chudzynski on 5/25/17.
//  Copyright © 2017 Janusz Chudzynski. All rights reserved.
//

import UIKit

class VCS{
    static  let array = ["Map", "Options", "About"]
}


class MenuViewController: UIViewController {
    
    @IBOutlet weak var tableView: UITableView!
    let array = VCS.array
    
    var mainViewController:UIViewController?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
        tableView.delegate = self
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}

extension MenuViewController: UITableViewDelegate, UITableViewDataSource{
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        (mainViewController! as! MapViewController).changeVC(id: self.array[indexPath.row], data: nil)
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        //        return menus.count
        return array.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.accessoryType = .disclosureIndicator
        cell.textLabel?.textColor = Colors.main
        cell.textLabel?.text = array[indexPath.row]
        switch indexPath.row {
        case 0:
            cell.imageView?.image = UIImage(named:"Map-50")
        case 1:
            cell.imageView?.image = UIImage(named:"University-50")
        case 2:
            cell.imageView?.image = UIImage(named:"About-50")
        default: break
            
        }
        
        return cell
    }

    
}

