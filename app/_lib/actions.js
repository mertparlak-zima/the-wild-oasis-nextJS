"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut, auth } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signInAction(formData) {
  const provider = formData.get("provider");

  await signIn(provider, { redirectTo: "/account" });
}

export async function singOutAction() {
  await signOut();
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const nationalIdRegex = /^[a-zA-Z0-9]{6,12}$/;

  if (!nationalIdRegex.test(nationalID)) {
    throw new Error("Wrong format national ID");
  }

  const updateData = { nationality, nationalID, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session?.user?.guestId);

  if (error) throw new Error("Guest could not be updated");
  console.log("Guest profile update was succeeded!");

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const entries = Object.fromEntries(formData.entries());
  const id = entries.id;

  const updatedFields = {
    numberGuests: Number(entries.numGuests),
    observations: entries.observations.slice(0, 1000),
  };

  if (!updatedFields && !id) {
    throw new Error("Someting went wrong, try again!");
  }

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .eq("guestId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${id}`);
  console.log("Booking update was succeeded!");
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  console.log(bookingData);
  console.log(formData);

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numberGuests: Number(formData.get("numnGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmeed",
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .eq("guestId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  console.log("Booking was succeeded!");
  redirect("/cabins/thankyou");
}
