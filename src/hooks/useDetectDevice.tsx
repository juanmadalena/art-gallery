import { useMemo } from 'react'

export default function useDetectDevice() {
    
    
    const isMobile = useMemo(() => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }, [])

    return {
        isMobile
    }
}
