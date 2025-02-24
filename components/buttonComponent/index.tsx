import { ReactNode } from "react";

type Props = {
    children: ReactNode
    type: "button" | "submit" | "reset",
    onClick?: () => void
    className?: string
}

export const ButtonPrimary = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-primary text-white rounded-md py-2 px-4 hover:bg-primary font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonSuccess = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonWarning = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-yellow-600 text-white rounded-md py-2 px-4 hover:bg-yellow-700 font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonDanger = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-red-600 text-white rounded-md py-2 px-4 hover:bg-red-700 font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonSuccessOutline = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm border-2 bg-white border-green-500 text-green-500 rounded-md py-2 px-4 hover:bg-gray-100 font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonDangerOutline = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm border-2 bg-white border-red-500 text-red-500 rounded-md py-2 px-4  hover:bg-gray-100 font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonInfoOutline = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm border-2 bg-white border-blue-500 text-blue-500 rounded-md py-2 px-4 hover:bg-gray-100 font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}
