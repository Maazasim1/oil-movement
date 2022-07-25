import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function Login() {
    return (
        <div className='flex justify-center pt-10 rounded-lg align-middle h-screen items-center bg-slate-900'>


            <div className='order-1 pt-1.5'>
                <Image
                    className='rounded-r-xl '
                    src="/images/PetrolBlue.png"
                    width={500}
                    height={571}
                    objectFit="cover"
                    Logo="blue car being filled"
                />
            </div>


            <div>
                <form className='bg-slate-200 rounded-l-xl  p-10 px-20 '>
                    <div className='mp-6 pb-10'>
                        <Image
                            src="/images/Cnergyico_Logo.png"
                            width={190}
                            height={100}
                            alt="Logo"
                        />

                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-black ">Access</label>
                        <select type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required>
                            <option>Shipping In</option>
                            <option>Shipping Out</option>
                            <option>Decanting In</option>
                            <option>Decanting Out</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-black ">User Name</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter User Name" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Your password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="flex items-start mb-6">


                    </div>
                    <Link href='/shippingin'>
                        <a type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</a>
                    </Link>
                </form>
            </div>
        </div>
    )
}
