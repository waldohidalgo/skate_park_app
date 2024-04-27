export default async function postLogin(form) {
  try {
    return await axios.post("/login", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return error;
  }
}
