"use client";

import { useState, useEffect } from "react";
import {
  StarIcon,
  TrashIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import axiosInstance from "../lib/axios.instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IUser {
  id: string;
  name: string;
  role: string;
}

interface IProperty {
  id: string;
  name: string;
  location: string;
  price: number;
}

interface IFavourite extends IProperty {
  favId: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [favourites, setFavourites] = useState<IFavourite[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ── Load User Data ──
  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser({
        id: u._id,
        name: `${u.firstName} ${u.lastName}`,
        role: u.role,
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // ── Fetch Properties & Favourites ──
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [propsRes, favRes] = await Promise.all([
          axiosInstance.get("/property/list"),
          axiosInstance.get("/favourite/list"),
        ]);

        const props: IProperty[] = propsRes.data.properties.map((p: any) => ({
          id: p._id,
          name: p.propertyName,
          location: p.propertyLocation,
          price: p.propertyPrice,
        }));

        const favs: IFavourite[] = favRes.data.favourites.map((f: any) => {
          const property = props.find((p) => p.id === f.propertyId);
          return {
            id: property?.id || f.propertyId,
            name: property?.name || "Unknown Property",
            location: property?.location || "Location Private",
            price: property?.price || 0,
            favId: f._id,
          };
        });

        setProperties(props);
        setFavourites(favs);
      } catch (err) {
        toast.error("Unable to synchronize with the portal");
      }
    };
    fetchData();
  }, [user]);

  // ── Toggle Favourite Logic ──
  const toggleFavourite = async (property: IProperty | IFavourite) => {
    const exists = favourites.find((f) => f.id === property.id);
    try {
      if (exists) {
        await axiosInstance.delete(`/favourite/remove/${exists.favId}`);
        setFavourites(favourites.filter((f) => f.id !== property.id));
        toast.success("Removed from your collection");
      } else {
        if (!user) throw new Error("Session expired");
        const { data } = await axiosInstance.post(
          `/favourite/add/${property.id}`,
          {
            propertyId: property.id,
            userId: user.id,
          },
        );
        setFavourites([
          ...favourites,
          { ...property, favId: data.favourite._id },
        ]);
        toast.success("Added to your collection");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf8]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-[#b8975a]/20 border-t-[#b8975a] rounded-full animate-spin" />
          <p className="text-[0.7rem] text-[#7a7a82] tracking-[.3em] uppercase font-medium">
            Initializing
          </p>
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen w-full flex flex-col md:grid md:grid-cols-[260px_1fr] bg-[#fafaf8] font-['DM_Sans',sans-serif] selection:bg-[#b8975a]/20">
      {/* ── Mobile Header ── */}
      <div className="md:hidden flex items-center justify-between p-5 bg-[#0d0d12] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border border-[#b8975a] rotate-45 flex items-center justify-center">
            <div className="w-0.5 h-0.5 bg-[#b8975a]" />
          </div>
          <span className="text-[#b8975a] text-[0.65rem] tracking-[.3em] uppercase font-semibold">
            Luxe Estate
          </span>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white"
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* ── Sidebar ── */}
      <aside
        className={`
        ${isMenuOpen ? "flex" : "hidden"} 
        md:flex flex-col justify-between p-10 bg-[#0d0d12] fixed inset-0 z-40 md:sticky md:top-0 md:h-screen overflow-hidden
      `}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[60%] bg-[#b8975a]/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <div className="hidden md:flex items-center gap-3 mb-12">
            <div className="w-6 h-6 border border-[#b8975a] rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-[#b8975a]" />
            </div>
            <span className="text-[#b8975a] text-[0.65rem] tracking-[.3em] uppercase font-semibold">
              Luxe Estate
            </span>
          </div>

          <div className="flex items-center gap-4 mb-10 p-4 rounded-sm bg-white/[0.03] border border-white/[0.08]">
            <div className="w-10 h-10 rounded-sm bg-[#b8975a] flex items-center justify-center text-white font-medium text-sm shadow-lg">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">
                {user.name}
              </p>
              <p className="text-[#b8975a] text-[0.6rem] uppercase tracking-widest mt-0.5">
                {user.role}
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            <a
              href="#properties"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-sm text-[0.8rem] transition-all bg-[#b8975a]/10 text-[#d4b483] border-l-2 border-[#b8975a]"
            >
              Properties
            </a>
            <a
              href="#favourites"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-sm text-[0.8rem] text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
            >
              <span>Favourites</span>
              {favourites.length > 0 && (
                <span className="text-[0.6rem] bg-[#b8975a] text-white px-2 py-0.5 rounded-full">
                  {favourites.length}
                </span>
              )}
            </a>
          </nav>
        </div>

        <div className="relative z-10">
          <h1 className="text-white font-light leading-tight text-3xl mb-8 font-['Cormorant_Garamond']">
            Discover <br /> your{" "}
            <em className="text-[#d4b483] italic">sanctuary.</em>
          </h1>
          <button
            onClick={handleLogout}
            className="w-full py-3 text-[0.7rem] tracking-[.2em] uppercase text-white/30 border border-white/10 rounded-sm hover:border-[#b8975a] hover:text-[#b8975a] transition-all"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="px-4 py-8 sm:px-6 sm:py-10 md:px-12 lg:px-20 overflow-y-auto">
        <header className="mb-8 sm:mb-12">
          <p className="text-[#b8975a] uppercase tracking-[.25em] text-[0.6rem] font-bold mb-2">
            Private Portal
          </p>
          <h2 className="text-[#0d0d12] text-2xl sm:text-3xl md:text-[2.8rem] font-light font-['Cormorant_Garamond'] leading-tight">
            Welcome, {user.name.split(" ")[0]}
          </h2>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-[0.8rem] text-[#7a7a82]">
            <span>{properties.length} Available Listings</span>
            <span className="hidden sm:block w-px h-4 bg-[#e2e0d8]" />
            <span>{favourites.length} Saved to Collection</span>
          </div>
        </header>

        {/* ── Properties Grid ── */}
        <section id="properties" className="mb-14 sm:mb-20">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <h3 className="text-xl font-['Cormorant_Garamond'] text-[#0d0d12] whitespace-nowrap">
              Curated Properties
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#e2e0d8] to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {properties.map((property) => {
              const isFav = favourites.some((f) => f.id === property.id);
              return (
                <div
                  key={property.id}
                  className="group bg-white border border-[#e2e0d8] rounded-sm transition-all duration-500 hover:border-[#b8975a] hover:shadow-[0_20px_50px_-20px_rgba(184,151,90,0.15)] relative"
                >
                  <button
                    onClick={() => toggleFavourite(property)}
                    className="absolute top-4 right-4 p-2.5 rounded-full z-20 group/star transition-all duration-300 active:scale-90"
                  >
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${isFav ? "bg-[#b8975a]/10 scale-100" : "bg-white/80 opacity-0 group-hover/star:opacity-100 group-hover/star:scale-110 shadow-sm"}`}
                    />
                    {isFav ? (
                      <StarIconSolid className="relative w-6 h-6 text-[#b8975a] drop-shadow-md scale-110" />
                    ) : (
                      <StarIcon className="relative w-6 h-6 text-[#c8c4ba] group-hover/star:text-[#b8975a] group-hover/star:scale-110 transition-all" />
                    )}
                  </button>

                  <div className="aspect-[4/3] bg-[#f4f3ef] overflow-hidden relative">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b8975a] via-transparent to-transparent" />
                    <div className="w-full h-full flex items-center justify-center text-4xl font-['Cormorant_Garamond'] text-[#b8975a]/30 italic">
                      {property.name.charAt(0)}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h4 className="text-[#0d0d12] font-medium text-base sm:text-lg mb-1">
                      {property.name}
                    </h4>
                    <p className="text-[#7a7a82] text-sm flex items-center gap-1.5 mb-4 sm:mb-6">
                      <span className="w-1 h-1 rounded-full bg-[#b8975a]" />{" "}
                      {property.location}
                    </p>
                    <div className="flex items-center gap-2 justify-between pt-4 sm:pt-5 border-t border-[#f0ede6]">
                      <span className="text-lg sm:text-xl font-['Cormorant_Garamond'] text-[#0d0d12]">
                        ${property.price.toLocaleString()}
                      </span>
                      <span
                        className={`text-[0.65rem] uppercase tracking-widest px-2 sm:px-3 py-1 rounded-full ${isFav ? "bg-[#b8975a] text-white" : "bg-[#f4f3ef] text-[#7a7a82]"}`}
                      >
                        {isFav ? "Saved" : "Available"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Favourites Table ── */}
        <section id="favourites">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <h3 className="text-xl font-['Cormorant_Garamond'] text-[#0d0d12] whitespace-nowrap">
              Favourite Collection
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#e2e0d8] to-transparent" />
          </div>

          {favourites.length === 0 ? (
            <div className="py-16 sm:py-20 text-center border-2 border-dashed border-[#e2e0d8] rounded-sm">
              <StarIcon className="w-10 h-10 text-[#e2e0d8] mx-auto mb-4" />
              <p className="text-[#7a7a82] text-sm uppercase tracking-widest">
                No saved properties found
              </p>
            </div>
          ) : (
            <div className="bg-white border border-[#e2e0d8] rounded-sm overflow-x-auto">
              <div className="min-w-[560px]">
                <div className="grid grid-cols-[1fr_140px_120px_60px] sm:grid-cols-[1fr_200px_150px_80px] gap-3 sm:gap-4 px-4 sm:px-8 py-4 bg-[#fafaf8] border-b border-[#e2e0d8] text-[0.65rem] uppercase tracking-[.2em] text-[#7a7a82] font-bold">
                  <span>Property</span>
                  <span>Location</span>
                  <span>Valuation</span>
                  <span className="text-right">Action</span>
                </div>

                {favourites.map((fav) => (
                  <div
                    key={fav.favId}
                    className="grid grid-cols-[1fr_140px_120px_60px] sm:grid-cols-[1fr_200px_150px_80px] gap-3 sm:gap-4 px-4 sm:px-8 py-4 sm:py-6 items-center border-b border-[#f0ede6] last:border-0 hover:bg-[#fcfcfb] transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f4f3ef] rounded-sm flex-shrink-0 flex items-center justify-center font-['Cormorant_Garamond'] text-[#b8975a] text-xl">
                        {fav.name.charAt(0)}
                      </div>
                      <p className="text-[#0d0d12] font-medium text-sm truncate">
                        {fav.name}
                      </p>
                    </div>
                    <p className="text-[#7a7a82] text-sm truncate">
                      {fav.location}
                    </p>
                    <p className="text-[#0d0d12] font-['Cormorant_Garamond'] text-base sm:text-lg">
                      ${fav.price.toLocaleString()}
                    </p>
                    <div className="text-right">
                      <button
                        onClick={() => toggleFavourite(fav)}
                        className="p-2 sm:p-3 rounded-full text-[#c8c4ba] hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
                      >
                        <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
