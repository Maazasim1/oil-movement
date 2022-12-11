import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';



export default function Login() {




  const [isLogin, setIsLogin] = useState(true);
  const [LoadModal, setLoadModal] = useState(false);;
  const userInputRef = useRef();
  const passwordInputRef = useRef();
  const AccessInputRef = useRef();
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enteredUserName = userInputRef.current.value;
    const enteredpassword = passwordInputRef.current.value;
    const enteredAccess = AccessInputRef.current.value;

    if (isLogin) {
      setLoadModal(true);
      const result = await signIn('credentials', {
        redirect: false,
        username: enteredUserName,
        password: enteredpassword,
        level: enteredAccess,
      }
      );
      setLoadModal(false);


      if (!result.error && enteredAccess === 'Shipping In') {
        // set some auth state
        router.replace('/shippingin');
      }
      if (!result.error && enteredAccess === 'Admin') {
        // set some auth state
        router.replace('/Admin');
      }
      if (!result.error && enteredAccess === 'Shipping Out') {
        // set some auth state
        router.replace('/shippingout');
      }
      if (result.error) {
        alert("Worng Credential");
      }
    }
    else {
      alert("wrong credentials")
    }

  }


  return (
    <div className='flex justify-center pt-10 align-middle h-screen items-center bg-Orange'>
     
      {
        LoadModal ?
            <div className='absolute top-[25%] left-[25%] w-[50%] h-[50%] bg-white z-10 rounded-lg shadow-lg border-4 border-Orange'>
            <div role="status" className='flex flex-col space-y-5 justify-center items-center h-full'>
              <svg aria-hidden="true" className="mr-2 w-8 h-8 text-headBlue animate-spin dark:text-gray-600 fill-Orange" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <h3 className='font-mono text-xl'>
                Logging In
              </h3>
            </div>
            </div>
            :<></>
          }

            <div className='order-1'>
              <div className='bg-loginPeach pl-10 pr-10'>
                <Image
                  className='rounded-r-xl '
                  src="/images/PetrolBlue.svg"
                  width={500}
                  height={565}
                  objectFit="contain"
                  Logo="blue car being filled"
                />
              </div>
            </div>


            <div>
              <form className='bg-white rounded-l-xl  p-10 px-20' onSubmit={submitHandler}>
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
                  <select type="email" id="email" className="bg-gray-50 border border-Orange text-gray-900 text-sm rounded-lg  focus:border-Orange block w-full p-2.5 " ref={AccessInputRef} required>
                    <option>Shipping In</option>
                    <option>Shipping Out</option>
                    <option>Decanting In</option>
                    <option>Decanting Out</option>
                    <option>Admin</option>
                    <option>Shift In-charge (SIC)</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black ">User Name</label>
                  <input type="text" id="email" className="bg-white border text-gray-900 text-sm rounded-lg  focus:border-Orange block w-full p-2.5" placeholder="Enter User Name" ref={userInputRef} required />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Your password</label>
                  <input type="password" id="password" className="bg-white border text-gray-900 text-sm rounded-lg  focus:border-Orange block w-full p-2.5" ref={passwordInputRef} required />
                </div>
                <div className="flex items-start mb-6">


                </div>

                <button type="submit" className="text-white bg-Orange hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>

              </form>
            </div>
          </div>
    )
}
