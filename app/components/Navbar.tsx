"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Rental Mobil", path: "/rental-mobil" },
    { name: "Paket Wisata", path: "/paket-wisata" },
    { name: "Tentang Kami", path: "/tentang-kami" },
    { name: "Cara Pemesanan", path: "/cara-pemesanan" },
    { name: "Syarat & Ketentuan", path: "/syarat-ketentuan" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <Image src="/images/Logo.jpeg" alt="KDS Trans" width={30} height={30} className="nav-logo-img" />
          <span>KDS Trans</span>
        </Link>
        
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                href={link.path} 
                className={pathname === link.path ? "active" : ""}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <a href="https://wa.me/6285143010008?text=Halo%20KDS%20Trans" target="_blank" className="btn-wa nav-wa">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.512A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.726.889.928-3.63-.234-.373A9.818 9.818 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/>
          </svg>
          WhatsApp
        </a>

        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}