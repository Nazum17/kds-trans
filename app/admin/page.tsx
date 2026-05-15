"use client";

import { useState } from "react";

export default function AdminPage() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (
      username === "admin" &&
      password === "kds123"
    ) {
      setLoggedIn(true);
    } else {
      alert("Username atau password salah");
    }
  }

  if (!loggedIn) {
    return (

      <main className="admin-login">

        <form
          className="admin-form"
          onSubmit={handleLogin}
        >

          <h1>Login Admin</h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Masuk Dashboard
          </button>

        </form>

      </main>
    );
  }

  return (

    <main className="admin-dashboard">

      <h1>Dashboard Admin</h1>

      <div className="admin-grid">

        <div className="admin-card">
          <h3>Rental Mobil</h3>
          <p>Edit halaman rental mobil.</p>
        </div>

        <div className="admin-card">
          <h3>Paket Wisata</h3>
          <p>Edit halaman paket wisata.</p>
        </div>

        <div className="admin-card">
          <h3>Tentang Kami</h3>
          <p>Edit halaman tentang kami.</p>
        </div>

        <div className="admin-card">
          <h3>Cara Pemesanan</h3>
          <p>Edit cara pemesanan.</p>
        </div>

      </div>

    </main>
  );
}