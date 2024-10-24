import supabase, { supabaseUrl } from "./supabase";

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

export async function updateUserApi({ password, fullName, avatar }) {
  let updatedData;
  if (password) {
    updatedData = { password };
  }
  if (fullName) {
    updatedData = { data: { fullName } };
  }
  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (!avatar) {
    return data;
  }
  if (error) {
    throw new Error(error.message);
  }
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  // Upload die avatar

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  // update avatar in user
  const { data: updatedUser, error: error2 } =await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) {
    throw new Error(error2.message);
  }

  return updatedUser;
}
