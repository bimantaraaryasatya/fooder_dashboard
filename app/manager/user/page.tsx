import { IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert"
import Image from "next/image"
import Search from "./search";

const getUser = async (search: string): Promise<IUser[]> => {
    try {
        const TOKEN = await getCookies("token")
        const url = `${BASE_API_URL}/user?search=${search}`
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

const UserPage = async ({searchParams}: {searchParams: {[key:string] : string | string[] | undefined }}) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const user : IUser[] = await getUser(search)
    return(
        <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
            <h4 className="text-xl font-bold mb-2 text-black">User Data</h4>
            <p className="text-sm text-primary mb-4">
            This page displays user data, including Cashier and Manager roles. Users can view details,
            search, and manage data by adding, editing, or deleting users
            </p>
            <div className="flex justify-between items-center mb-4">
                {/* Search Bar */}
                <div className="flex items-center w-full max-w-md flex-grow">
                    <Search url={`/manager/user`} search={search}/>
                </div>
            </div>
            {
                user.length === 0 ?
                    <AlertInfo title="informasi">
                        No data Available
                    </AlertInfo>
                :
                <>
                    <div>
                        {user.map((data, index) => (
                            <div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
                                <div className="w-full md:w-2/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Profile</small> <br />
                                    <Image
                                        src={`${BASE_IMAGE_PROFILE}/${data.profile_picture}`} 
                                        alt="Profile Image"
                                        width={65}
                                        height={65}
                                        className="rounded-full border border-gray-300 object-cover w-16 h-16"
                                    />
                                </div>
                                <div className="w-full md:w-2/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Name</small> <br /> {data.name}
                                </div>
                                <div className="w-full md:w-3/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Email</small> <br /> {data.email}
                                </div>
                                <div className="w-full md:w-3/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Role</small> <br /> {data.role}
                                </div>
                                <div className="w-full md:w-2/12 p-2 text-black">
                                    <small className="text-sm font-bold text-primary">Action</small> <br />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default UserPage