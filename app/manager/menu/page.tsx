import { IMenu } from "@/app/types"
import { getCookies } from "@/lib/server-cookies"
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global"
import { get } from "@/lib/api-bridge"
import { AlertInfo } from "@/components/alert"
import Image from "next/image"
import Search from "./search"
import AddMenu from "./addMenu"
import EditMenu from "./editMenu"
import DeleteMenu from "./deleteMenu"

const getMenu = async (search: string): Promise<IMenu[]> => {
    try {
        const TOKEN = await getCookies("token")
        console.log(TOKEN)
        const url = `${BASE_API_URL}/menu?search=${search}`
        const response = await get(url, TOKEN)

        // Pastikan response tidak undefined
        if (!response || !response.data) {
            console.log("Invalid API response", response)
            return []
        }

        const { status, data } = response

        // Pastikan `status` true dan `data` ada sebelum mengaksesnya
        if (status && data.data && Array.isArray(data.data)) {
            return [...data.data]
        }

        return []
    } catch (error) {
        console.log("Error fetching menu:", error)
        return []
    }
}

const MenuPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const menu: IMenu[] = await getMenu(search)
    const category = (cat: string): React.ReactNode => {
        if (cat === "FOOD") {
            return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                Food
            </span>
        }
        if (cat === "SNACK") {
            return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                Snack
            </span>
        }
        return <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
           Drink
        </span>

    }
    return (
        <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
            <h4 className="text-xl font-bold mb-2 text-black">Menu Data</h4>
            <p className="text-sm text-primary mb-4">
            This page displays menu data, allowing menus to view details, 
            search, and manage menu items by adding, editing, or deleting them.
            </p>
            <div className="flex justify-between items-center mb-4">
                {/* Search Bar */}
                <div className="flex items-center w-full max-w-md flex-grow">
                    <Search url={`/manager/menu`} search={search}/>
                </div>

                {/* Add Menu Button */}
                <div className="ml-4">
                    <AddMenu/>
                </div>
            </div>
            {
                menu.length === 0 ?
                    <AlertInfo title="informasi">
                        No data Available
                    </AlertInfo>
                :
                <>
                    <div>
                        {menu.map((data, index) => (
                            <div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
                                <div className="w-full md:w-1/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Profile</small> <br />
                                    <Image
                                        src={`${BASE_IMAGE_MENU}/${data.picture}`} 
                                        alt="Profile Image"
                                        width={65}
                                        height={65}
                                        className="rounded-full border border-gray-300 object-cover w-16 h-16"
                                    />
                                </div>
                                <div className="w-full md:w-2/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Name</small> <br /> {data.name}
                                </div>
                                <div className="w-full md:w-2/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Price</small> <br /> {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(data.price)}
                                </div>
                                <div className="w-full md:w-4/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Description</small> <br /> {data.description}
                                </div>
                                <div className="w-full md:w-1/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Category</small> <br /> {category(data.category)}
                                </div>
                                <div className="w-full md:w-2/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Action</small> <br />
                                    <div className="flex gap-1">
                                        <EditMenu selectedMenu={data}/>
                                        <DeleteMenu selectedMenu={data}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default MenuPage 