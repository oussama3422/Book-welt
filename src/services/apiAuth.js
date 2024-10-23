import supabase from "./supabase";

export async function signUpApi({ fullName, email, password }) {
  const { data, error } = await supabase.auth?.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    console.error("Signup error:", error);
    if (
      error.message.includes("already registered") ||
      error.message.includes("not authorized")
    ) {
      throw new Error(
        "This email is already registered or the email isn't authorized for sign-up. Please check or try a different email."
      );
    }
    throw new Error(`Sign-up failed: ${error.message}`);
  }
  console.log("Signup successful:", data);
  return data;
}
export async function loginApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.log("error in use loginApi", error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
