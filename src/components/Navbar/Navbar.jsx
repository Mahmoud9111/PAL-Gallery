import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit h-20 flex items-center bg-[#E8E5DF] rounded-full z-50 cursor-pointer group transition-all duration-500 overflow-hidden gap-3">
      <div className="flex items-center h-full px-8">
        <p className="text-lg text-[#212121] font-medium">Menu</p>
      </div>
      <div className="bg-[#212121] rounded-full h-20 w-20 p-4 flex items-center justify-center flex-shrink-0">
        <IoMdMenu className="text-[#E8E5DF] text-3xl transition-transform duration-500 group-hover:rotate-[360deg]" />
      </div>
    </div>
  );
};

export default Navbar;

