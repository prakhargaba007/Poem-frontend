"use client";

import Link from "next/link";
import classes from "./headers.module.css";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []); // Run only once when the component mounts

  async function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    setToken(null);
    router.push("/");
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <h1>Poonam Bhatia</h1>
        </Link>
      </div>
      <nav className={classes.nav}>
        <Link href="/">Home</Link>
        <Link href="/books">Poems</Link>
      </nav>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn}>
          <FaUserCircle size={39} />
        </button>
        <div className={classes.dropdownContent}>
          {!token ? (
            <>
              <Link href="/user/login">
                <button className={classes.loginBtn}>Login</button>
              </Link>
              <Link href="/user/signup">
                <button className={classes.signupBtn}>Signup</button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/user/profile">
                <button className={classes.signupBtn}>profile</button>
              </Link>
              <button onClick={logoutHandler} className={classes.signupBtn}>
                logout
              </button>
            </>
          )}
        </div>
        {/* <div className={classes.dropdownContent}>
          {session?.user ? (
            <>
              <Link href="/user/profile">
                <button className={classes.signupBtn}>profile</button>
              </Link>

              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div> */}
      </div>
    </header>
  );
}
