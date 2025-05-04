export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
      case "/":
        await import("./src/js/router/views/home.js");
        break;
      case "/auth/login/":
        await import("./src/js/router/views/login.js");
        break;
      case "/auth/register/":
        await import("./src/js/router/views/register.js");
        break;
      case "/post/create/":
        await import("./src/js/router/views/postCreate.js");
        break;
      case "/profile/":
        await import("./src/js/router/views/profile.js");
        break;
      default:
        await import("./src/js/router/views/notFound.js");
    }
  }
  