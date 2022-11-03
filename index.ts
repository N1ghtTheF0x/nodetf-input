class NInput
{
    private __methods: Array<NInput.Method> = [
        {
            init(input)
            {
                window.addEventListener("keydown",(ev) =>
                {
                    ev.preventDefault()
                    input.keys[ev.key] = true
                })
                window.addEventListener("keyup",(ev) =>
                {
                    ev.preventDefault()
                    input.keys[ev.key] = false
                })
            },
        },
        {
            init(input)
            {
                window.addEventListener("mousedown",(ev) =>
                {
                    ev.preventDefault()
                    input.keys[`Mouse${NInput.MouseButton[ev.button]}`] = true
                })
                window.addEventListener("mouseup",(ev) =>
                {
                    ev.preventDefault()
                    input.keys[`Mouse${NInput.MouseButton[ev.button]}`] = false
                })
                window.addEventListener("mousemove",(ev) =>
                {
                    ev.preventDefault()
                    input.mousePosition = {x: ev.x,y: ev.y}
                })
                window.addEventListener("contextmenu",(ev) => ev.preventDefault())
            }
        },
        {
            init(input)
            {
                window.addEventListener("gamepadconnected",(ev) =>
                {
                    ev.preventDefault()
                    const gamepad = ev.gamepad
                    input.gamepads[gamepad.index] = gamepad
                })
                window.addEventListener("gamepaddisconnected",(ev) =>
                {
                    ev.preventDefault()
                    const gamepad = ev.gamepad
                    input.gamepads[gamepad.index] = null
                })
            },
            update(input)
            {
                input.gamepads = [...navigator.getGamepads()]    
            },
        }
    ]
    keys: NInput.Keys = {}
    gamepads: ReturnType<Navigator["getGamepads"]> = []
    mousePosition: NInput.Position = {x: 0,y: 0}
    addMethod(...methods: Array<NInput.Method>)
    {
        this.__methods.push(...methods)
    }
    update()
    {
        for(const method of this.__methods) if(method.update) method.update(this)
    }
    init()
    {
        for(const method of this.__methods) method.init(this)
    }
}

namespace NInput
{
    export interface Keys
    {
        [key: string]: boolean
    }
    export interface Position
    {
        x: number
        y: number
    }
    export interface Method
    {
        init: (input: NInput) => void
        update?: (input: NInput) => void
    }
    export enum MouseButton
    {
        Left,
        Middle,
        Right,
        Button4,
        Button5
    }
}

export default NInput