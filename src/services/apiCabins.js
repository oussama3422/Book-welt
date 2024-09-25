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

export async function createCabin(newCabin) {
  // https://lcpiyvmcrgapmbzoepkv.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg?t=2024-09-25T21%3A07%3A01.413Z
  const ImageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const ImagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. create Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  console.log(data);

  //2. Upload Image
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
