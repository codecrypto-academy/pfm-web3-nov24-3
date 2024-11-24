import { redirect } from "next/navigation";

export const redirectToUnauthorized = () => {
  console.log("Redirecting to unauthorized hook!!!!")
  redirect("/unauthorized");
};

export const redirectToUnauthenticated = () => {
  console.log("Redirecting to unauthenticated hook!!!!")
  redirect("/unauthenticated");
}; 