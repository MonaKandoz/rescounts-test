export const displayErrorMsg = (msg) => {
  let displayError = document.getElementById("display-error");
  displayError.style.display = "block";
  displayError.innerHTML = `${msg}`;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
};


export const signInApi = (formFileds)=>{
    fetch("https://api-dev.rescounts.com/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formFileds,
        notification:
          "cRgQJvGam-u0UE2iV4vgCI:APA91bH5Qlt7jzbrySQwITgs6PFypMY3hE3dR9ZgMf5ZDJYhIYCfB8d36PqrFrZAq8ygX-qHzKk0F3vwpd9DzzJx39auJzf83krHIxao2DXSV9hlfETIl4eAuNqLk9VfHLA6142-KoDF",
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          displayErrorMsg("*invalid email or password");
        } else if (res.status === 200) {
          return res.clone().json();
        } else {
          console.log(res.json());
        }
      })
      .then((json) => {
        alert(`Welcome back ${json.user.lastName}`);
      })
      .catch((error) => console.error(error));
}


export const signUpApi = (formFileds)=>{
    fetch("https://api-dev.rescounts.com/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formFileds,
        allowsSMS: true,
        notification:
          "cRgQJvGam-u0UE2iV4vgCI:APA91bH5Qlt7jzbrySQwITgs6PFypMY3hE3dR9ZgMf5ZDJYhIYCfB8d36PqrFrZAq8ygX-qHzKk0F3vwpd9DzzJx39auJzf83krHIxao2DXSV9hlfETIl4eAuNqLk9VfHLA6142-KoDF",
      }),
    })
      .then((res) => {
        if (res.status === 409) {
          displayErrorMsg(
            "rescounts account exists using this email please go to login page"
          );
          return;
        } else if (res.status === 201) {
          return res.clone().json();
        } else {
          console.log(res.json());
          return;
        }
      })
      .then((json) => {
        alert(`Thank you for sign-up ${json.user.lastName} `);
      })
      .catch((error) => console.error(error));
}