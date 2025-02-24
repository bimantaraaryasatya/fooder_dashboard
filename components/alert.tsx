import { ReactNode } from "react";

type Prop = {
    children: ReactNode
    title: string
}

export const AlertInfo = ({ children, title }: Prop) => {
    return (
        <div className="my-2 bg-sky-200 rounded-md text-sky-800 px-4 py-3 shadow-md border-l-4 border-sky-800" role="alert">
            <div className="flex gap-1">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-lg">{title}</p>
                    <div className="text-sm">{children}</div>
                </div>
            </div>
        </div>
    )
}

export const AlertSuccess = ({ children, title }: Prop) => {
    return (
        <div className="my-2 bg-green-200 rounded-md text-green-800 px-4 py-3 shadow-md border-l-4 border-green-800" role="alert">
            <div className="flex gap-1">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2.5 2.5L16 9"/>
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-lg">{title}</p>
                    <div className="text-sm">{children}</div>
                </div>
            </div>
        </div>
    )
}

export const AlertWarning = ({ children, title }: Prop) => {
    return (
        <div className="my-2 bg-yellow-200 rounded-md text-yellow-800 px-4 py-3 shadow-md border-l-4 border-yellow-800" role="alert">
            <div className="flex gap-1">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4.5M12 16.5h.008v.008H12v-.008z"/>
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-lg">{title}</p>
                    <div className="text-sm">{children}</div>
                </div>
            </div>
        </div>
    )
}

export const AlertDanger = ({ children, title }: Prop) => {
    return (
        <div className="my-2 bg-red-200 rounded-md text-red-800 px-4 py-3 shadow-md border-l-4 border-red-800" role="alert">
            <div className="flex gap-1">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6"/>
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-lg">{title}</p>
                    <div className="text-sm">{children}</div>
                </div>
            </div>
        </div>
    )
}