"use client";
import "./navbar.css";

export default function ProtectedNavbar() {
  return (
    <div className="bg-background navbar__container">
      <nav className="container navbar">
        <div>Global Search</div>
        <div className="navbar__right">
          <div>Notification</div>
          <div>Avatar</div>
        </div>
      </nav>
    </div>
  );
}
