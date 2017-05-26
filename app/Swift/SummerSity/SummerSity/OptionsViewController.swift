//
//  OptionsViewController.swift
//  SummerSity
//
//  Created by Janusz Chudzynski on 5/25/17.
//  Copyright © 2017 Janusz Chudzynski. All rights reserved.
//

import UIKit

class OptionsViewController: UIViewController {
    @IBOutlet weak var tableView: UITableView!
    let array = DataSource.locations()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
        tableView.delegate = self
        
        self.title = "Options"
        self.navigationItem.title = "Options"

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

extension OptionsViewController: UITableViewDelegate, UITableViewDataSource{
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    //    (mainViewController! as! MapViewController).changeVC(id: self.array[indexPath.row], data: nil)
        let campus = array[indexPath.row]
        
        
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        //        return menus.count
        return array.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)

        cell.textLabel?.text = array[indexPath.row].title!
        let price = 2000 + arc4random()%5000
        cell.detailTextLabel?.text = "Average Cost: $\(price)"
        cell.imageView?.image = UIImage(named: "")
        cell.detailTextLabel?.textColor = Colors.secondary.withAlphaComponent(0.6)
        cell.detailTextLabel?.font = UIFont.systemFont(ofSize: 8)
        cell.textLabel?.textColor = Colors.main
        
        
        return cell
    }
    
    
}
