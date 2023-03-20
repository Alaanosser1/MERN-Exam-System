import React from "react";
import jwt_decode from "jwt-decode";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const decoded = jwt_decode(user.token);
  console.log(decoded);
  return (
    <div>
      <h1 dir="rtl">
        مرحبا {decoded.rank} {decoded.firstName}
      </h1>
    </div>
  );
}
