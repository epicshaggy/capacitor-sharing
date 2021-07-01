import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 */
@objc(Sharing)
public class Sharing: CAPPlugin {
    
   @objc func share(_ call: CAPPluginCall) {
        guard let fileNames = call.getArray("fileNames", String.self) else {
            call.reject("No file names were provided.")
            return
        }
    
        guard let base64Values = call.getArray("base64Values", String.self) else{
            call.reject("No base64 values were provided.")
            return
        }
    
        var urls = [URL]()
    
    
        for (i, base64) in base64Values.enumerated(){
            let url = FileManager.default.temporaryDirectory.appendingPathComponent(fileNames[i])
            
            guard let data = Data(base64Encoded: base64) else {
                call.reject("Invalid base64 parameter.")
                return
            }
            
            do{
                try data.write(to: url)
            }catch{
                call.reject("Failed to cache files.")
                return
            }
            
            urls.append(url)
        }
    
        
        DispatchQueue.main.async {
            let activityViewController = UIActivityViewController(activityItems: urls, applicationActivities: nil)
            
            
            guard let mainView = self.bridge?.viewController?.view else {
                call.reject("Unable to get viewController.view")
                return
            }
            
            activityViewController.popoverPresentationController?.sourceView = mainView
            activityViewController.popoverPresentationController?.sourceRect =
                CGRect(x: mainView.center.x,
                       y: mainView.bounds.size.height,
                       width: 0,
                       height: 0)
            
            self.bridge?.presentVC(activityViewController, animated: true, completion: {
                call.resolve()
            })
        }
    }
}
