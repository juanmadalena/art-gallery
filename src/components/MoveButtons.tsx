import { useContext } from "react"
import useDetectDevice from "../hooks/useDetectDevice"
import { PermissionContext } from "../contexts/permissionContext/PermissionContext"

function MoveButtons() {

    const { isMobile } = useDetectDevice()
    const { permission } = useContext(PermissionContext)

    const handleAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>, key: string, action: 'keydown' | 'keyup') => {
        e.stopPropagation()
        e.preventDefault()
        e.bubbles = false;
        const event = new KeyboardEvent(action, {code: key})
        window.dispatchEvent(event)
    }

    const KEYS = [
        {
            code: 'KeyW',
            desktopTitle: 'W',
            mobileTitle: '↑',
            column: 2,
            row: 1,
        },
        {
            code: 'KeyS',
            desktopTitle: 'S',
            mobileTitle: '↓',
            column: 2,
            row: 2,
        },
        {
            code: 'KeyA',
            desktopTitle: 'A',
            mobileTitle: '←',
            column: 1,
            row: 2,
        },
        {
            code: 'KeyD',
            desktopTitle: 'D',
            mobileTitle: '→',
            column: 3,
            row: 2,
        },
        {
            code: 'ArrowLeft',
            desktopTitle: '',
            mobileTitle: '↪️',
            column: 1,
            row: 1,
        },
        {
            code: 'ArrowRight',
            desktopTitle: '',
            mobileTitle: '↩️',
            column: 3,
            row: 1,
        },
    ]

    return (
        <>
            <div 
                className={"select-none"}
                style={{position:'absolute', bottom:30, left:30, zIndex:20, display:"grid", gridTemplateColumns: "repeat(3, 1fr)", gap:4}}
            >
                <h1>{permission}</h1>
                {
                    KEYS.map((key, index) => {
                        if (!isMobile && permission !== 'granted' && (key.code === 'ArrowLeft' || key.code === 'ArrowRight')) return null
                        else {
                            return (
                                <button 
                                    key={index}
                                    onTouchStart={(e) => handleAction(e, key.code, "keydown")}
                                    onTouchEnd={(e) => handleAction(e,key.code, "keyup")}
                                    onMouseDown={(e) => handleAction(e, key.code, "keydown")} 
                                    onMouseUp={(e) => handleAction(e,key.code, "keyup")} 
                                    style={{gridColumn: key.column, gridRow: key.row,}}
                                    className={"h-10 w-10 rounded-md text-white cursor-pointer font-semibold bg-opacity-50 bg-neutral-800 active:bg-opacity-90"}
                                >
                                    {
                                        isMobile ? key.mobileTitle : key.desktopTitle
                                    }
                                </button>
                            )
                        }
                    })
                }
            </div>
        </>
    )
}

export default MoveButtons;