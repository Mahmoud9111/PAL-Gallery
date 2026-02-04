import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit h-20 p-8 px-2 flex items-center justify-end gap-4 bg-[#f4efe7] rounded-full z-50 cursor-pointer group transition-all duration-500">
      <div>
        {/* <p className="text-[12px] pl-4 hover:font-bold">Menu</p> */}
        <div className="p-8 text-[#2a2725]">
          <button className="text-xl hover:font-bold">Menu</button>
        </div>
      </div>
      <div className="bg-[#2a2725] rounded-full p-6">
        <IoMdMenu className="text-[#b1a696] text-2xl transition-transform duration-500 group-hover:rotate-[360deg]" />
      </div>
    </div>
  );
};

export default Navbar;
