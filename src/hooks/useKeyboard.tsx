import { useCallback, useEffect, useState } from "react";

function actionByKey(key: string) {
    const keys: { [key: string]: string } = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
    }
    return keys[key]
}

function useKeyboard(){

    const [keyPressed, setKeyPressed] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
    })
    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const action = actionByKey(e.code)
        if (!action) return
        setKeyPressed((state) => ({ ...state, [action]: true }))
    }, [])

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        const action = actionByKey(e.code)
        if (!action) return
        setKeyPressed((state) => ({ ...state, [action]: false }))
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return { keyPressed }
}

export default useKeyboard