"use client"

import React, { useState } from "react"
import { AlertWarning } from "../alert"

type Props = {
    disabled?: boolean,
    acceptTypes: string[],
    onChange: (file: File | null) => void,
    className?: string,
    required: boolean,
    id?: string,
    label?: string,
    maxSize?: number
}

const FileInput = (props: Props) => {
    const [message, setMessage] = useState("")
    const limitSize = props.maxSize
    const acceptTypes = props.acceptTypes.join()
    const handleFileInput = (event: React.ChangeEvent, callback: (data: File | null) => void) : void => {
        const target = event.target as HTMLInputElement;
        
        // Pastikan ada file yang dipilih
        if (!target.files || target.files.length === 0) {
            setMessage("No file selected");
            callback(null);
            return;
        }
    
        let currentFile: File = target.files[0];
        setMessage("");
    
        // Handle ketika file tidak sesuai
        if (!props.acceptTypes.includes(currentFile.type)) {   
            target.value = "";
            setMessage(`'${currentFile.type}' is invalid file type. The allowed file types are ${acceptTypes}`);
            callback(null);
            return;
        }
    
        // Handle jika ukuran file terlalu besar
        if (currentFile.size > (2 * 1024 * 1024)) {
            target.value = "";
            setMessage(`Your file is oversize`);
            callback(null);
            return;
        }
    
        callback(currentFile);
    };    
    return (
        <div className="w-full flex flex-col gap-1 my-2">
            <strong className="text-xs font-bold text-slate-500">{props.label}</strong>
            <input type={`file`} className={`text-sm w-full rounded-md p-2 bg-slate-50 border border-white focus:border-slate-500 focus:outline-none ${props.className}`} disabled={props.disabled} accept={acceptTypes} id={props.id} onChange={e => handleFileInput(e, props.onChange)}/>
            {
                message !== "" ? 
                    <AlertWarning title="Peringatan">
                        {message}
                    </AlertWarning> 
                :
                    <>
                    </>
            }
        </div>
    )
}

export default FileInput