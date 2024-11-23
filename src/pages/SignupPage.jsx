import dowearlogo from '../assets/dowear-logo.svg'

function SignUpPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full sm:w-[60%] lg:w-[60%] p-6"> 
    
                {/* Logo, heading, and description */}
                <div className="text-left">
                    <img 
                        src={dowearlogo} 
                        alt="DoWear Logo" 
                        className="w-[100px]" 
                    />
                    <div className="mt-5">
                        <h1 className="text-4xl font-bold">Sign Up</h1>
                        <p className="text-sm text-[#979797] mt-2">Create an account to use dowear.</p>
                    </div>
                </div>

                {/* Forms container */}
                <div className="flex flex-wrap gap-4 md:gap-8 mt-8">
                    {/* Left column (email address and city address dropdown) */}
                    <div className="flex flex-col w-full sm:w-[48%]">
                        <form className="flex flex-col">
                            <label htmlFor="email" className="text-md font-medium">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="email"
                                className="w-full p-4 mt-2 border border-[#D3D3D3] rounded-[14px] text-sm focus:outline-none"
                            />
                        </form>

                        <form className="flex flex-col mt-4">
                            <label htmlFor="city" className="text-md font-medium">City Address</label>
                            <select
                                id="city"
                                defaultValue=""
                                className="w-full py-4 px-3 mt-2 border border-[#D3D3D3] rounded-[14px] text-sm focus:outline-none text-[#979797]"
                            >
                                <option value="" disabled className="text-sm text-[#454141]">select city</option>
                                {/* Temporary values for dropdown */}
                                <option value="city1" className="text-black">City 1</option>
                                <option value="city2" className="text-black">City 2</option>
                                <option value="city3" className="text-black">City 3</option>
                            </select>
                        </form>
                    </div>

                    {/* Right Column (username and password) */}
                    <div className="flex flex-col w-full sm:w-[48%]">
                        <form className="flex flex-col">
                            <label htmlFor="username" className="text-md font-medium">Username</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="username"
                                className="w-full p-4 mt-2 border border-[#D3D3D3] rounded-[14px] text-sm focus:outline-none"
                            />
                        </form>

                        <form className="flex flex-col mt-4">
                            <label htmlFor="password" className="text-md font-medium">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="password"
                                className="w-full p-4 mt-2 border border-[#D3D3D3] rounded-[14px] text-sm focus:outline-none"
                            />
                        </form>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-10 flex justify-center">
                    <button className="w-[70%] sm:w-[40%] py-3 bg-dowear-red text-white rounded-lg focus:outline-none focus:ring-2">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
