import { useState } from "react";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<'granted' | 'denied'>;
  }

function useOrientationPermission() {

    const [permission, setPermission] = useState<'prompt' | 'granted' | 'denied' | 'error' | 'notIOS'>('prompt');

    const requestPermission = (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission;

    const iOS = typeof requestPermission === 'function';
    
    const request = () => {
      if(!iOS) return setPermission('notIOS')
      requestPermission()
      .then(response => {
        if(response === 'granted') {
          setPermission('granted')
        }else{
          setPermission('denied')
        }
      })
      .catch(() => {
        setPermission('error')
      })
    }

    return {
        request,
        permission
    }

}

export default useOrientationPermission