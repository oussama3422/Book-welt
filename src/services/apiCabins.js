import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  console.log(data);
  return data;
}

// export async function createEditCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startWith?.(supabaseUrl);

//   // https://lcpiyvmcrgapmbzoepkv.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg?t=2024-09-25T21%3A07%3A01.413Z
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   //1. create && Edit Cabin
//   let query = supabase.from("cabins");
//   // A . Create
//   if (!id) {
//     query = query.insert([{ ...newCabin, image: imagePath }]);
//   }
//   // A . Edit
//   if (id) {
//     query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
//   }
//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be deleted");
//   }
//   console.log("data", data);

//   //2. Upload Image
//   if (hasImagePath) {
//     return data;
//   }
//   // const avatarFile = event.target.files[0];
//   const { error: StorageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   // 3.  Trying to delete Cabin if occurred an error

//   if (StorageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.log(StorageError);
//     throw new Error(
//       "Cabin could not upload it  and the Cabin could not be created "
//     );
//   }
//   return data;
// }

export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");
  if (!id) {
    // Creating a new cabin
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    // Editing an existing cabin
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error(
      id ? "Cabin could not be updated." : "Cabin could not be created."
    );
  }

  if (hasImagePath) {
    return data;
  }

  const { error: StorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (StorageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(StorageError);
    throw new Error(
      "Cabin could not be created and image could not be uploaded."
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  console.log(data);
  return data;
}
