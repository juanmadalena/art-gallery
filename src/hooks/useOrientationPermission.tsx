import { useState } from "react";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<'granted' | 'denied'>;
  }

function useOrientationPermission() {

    const [permission, setPermission] = useState<string>('prompt');

    const requestPermission = (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission;

    const iOS = typeof requestPermission === 'function';
    
    const request = () => {
      if(!iOS) return
      requestPermission()
      .then(response => {
        if(response === 'granted') {
          setPermission('granted')
          window.addEventListener('deviceorientation', (event) => {
            console.log(event.alpha, event.beta, event.gamma)
          })
        }else{
          setPermission('denied')
        }
      })
      .catch((e) => {
        alert(e.message)
        setPermission(JSON.stringify(e))
      })
    }

    return {
        request,
        permission
    }

}

export default useOrientationPermission