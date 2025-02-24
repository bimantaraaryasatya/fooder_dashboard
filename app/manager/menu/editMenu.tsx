"use client"

import { IMenu } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { AlertInfo } from "@/components/alert"
import { ButtonPrimary, ButtonDanger } from "@/components/buttonComponent"
import { InputComponent, InputGroupComponent } from "@/components/inputComponent"
import Modal from "@/components/modal"
import Select from "@/components/select"
import FileInput from "@/components/fileInput"

const EditMenu = ({ selectedMenu }: {selectedMenu: IMenu}) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [menu, setMenu] = useState<IMenu>({...selectedMenu})
    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const [file, setFile] = useState<File | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setMenu({...selectedMenu})
        setIsShow (true)
        if(formRef.current) formRef.current.reset()
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/menu/${selectedMenu.id}`
            const {name, price, description, category} = menu
            const payload = new FormData
            payload.append("name", name || "")
            payload.append("price", price !== undefined ? price.toString() : "0")
            payload.append("description", description || "")
            payload.append("category", category || "")
            if(file !== null) 
                payload.append("picuter", file || "")
            const { data } = await put(url, payload, TOKEN)
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, { hideProgressBar: true, containerId: `toastMenu`, type: `success` })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(data?.message, { hideProgressBar: true, containerId: `toastMenu`, type: `warning` })
            }
        } catch (error) {
            console.log(error);
            toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastMenu`, type: `error` })
        }
    }
    return(
        <div>
            <ToastContainer containerId={`toastMenu`}/>
            <ButtonPrimary type="button" onClick={() => openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </ButtonPrimary>
            <Modal isShow={isShow} onClose={state => setIsShow(false)}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl">Update Menu</strong>
                                <small className="text-slate-400 text-sm">Managers can update both Cashier and Manager roles on this page.</small>
                            </div>
                            <div className="ml-auto">
                                <button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* end modal header */}

                    {/* modal body */}
                    <div className="p-5">
                        <InputGroupComponent id={`name`} type="text" value={menu.name} onChange={val => setMenu({...menu, name: val})} required={true} label="Name" />
                        <InputGroupComponent id={`price`} type="number" value={menu.price.toString()} onChange={val => setMenu({...menu, price: Number(val)})} required={true} label="Price" />
                        <InputGroupComponent id={`description`} type="text" value={menu.description} onChange={val => setMenu({...menu, description: val})} required={true} label="Description"/>
                        <Select id={`category`} value={menu.category} required={true} onChange={val => setMenu({...menu, category: val})}>
                            <option value="">--- Select Category ---</option>
                            <option value="FOOD">Food</option>
                            <option value="SNACK">Snack</option>
                            <option value="DRINK">Drink</option>
                        </Select>
                        <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture" label="Unggah Foto (Max 2MB, PDF/JPG/JPEG/PNG)" onChange={f => setFile(f)} required={false}/>
                    </div>
                    {/* end modal body */}

                    {/* modal footer */}
                        <div className="w-full p-5 flex rounded-b-2xl shadow">
                            <div className="flex ml-auto gap-2">
                                <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                                    Cancel
                                </ButtonDanger>
                                <ButtonPrimary type="submit">
                                    Save
                                </ButtonPrimary>
                            </div>
                        </div>
                    {/* end modal footer */}
                </form>
            </Modal>
        </div>
    )
}

export default EditMenu