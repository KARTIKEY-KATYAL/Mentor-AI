"use client";
import { USER_TABLE } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

function Provider({ children }) {
  const { user } = useUser();

  const CheckUserExist = async () => {
    // Ensure user object and email are available
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        // Check if user already exists in the database
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user.primaryEmailAddress.emailAddress));

        console.log(`result: ${JSON.stringify(result)}`);

        // If user does not exist, insert into DB
        if (result.length === 0) {
          console.log("User not found, adding to DB...");

          const UserResp = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });

          console.log("User added to DB:", UserResp);
        } else {
          console.log("User already exists in the database.");
        }
      } catch (error) {
        console.error("Error checking or inserting user:", error);
      }
    }
    const resp = await axios.post('/api/create-user',{user:user})
    console.log(resp);    
  };

  useEffect(() => {
    if (user) {
      CheckUserExist();
    }
  }, [user]); // Dependency on user, run CheckUserExist when user is available or changes.

  return <div>{children}</div>;
}

export default Provider;
