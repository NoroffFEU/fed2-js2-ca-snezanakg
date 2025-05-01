export function authGuard(redirectTo = "/src/js/ui/auth/login.js") {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to view this page.");
    window.location.href = redirectTo;
  }
}