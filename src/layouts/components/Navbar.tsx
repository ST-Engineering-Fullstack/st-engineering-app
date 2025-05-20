import { IMAGES } from "../../utils/theme"

const Navbar = () => {
  return (
      <div>
          <div className="text-sm text-white w-full">
   <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow-sm">

       <a href="#">
           <img className="h-9" src={IMAGES.LOGO.ST_LOGO} alt="dummyLogoDark"/>
       </a>
   </nav>
</div>
    </div>
  )
}

export default Navbar