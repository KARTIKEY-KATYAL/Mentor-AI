import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const createNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" }, // Event type: user.create
  async ({ event, step }) => {
    const { user } = event.data; // Access user data from the event

    if (!user?.primaryEmailAddress?.emailAddress) {
      throw new Error("Email is required to create a new user.");
    }

    // Run a check to see if the user exists in the database, then create if not
    const result = await step.run(
      "Check User and Create new if not Exist",
      async () => {
        // Check if user exists in DB
        const existingUser = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user.primaryEmailAddress.emailAddress));

        console.log(`result: ${JSON.stringify(existingUser)}`);

        // If user does not exist, insert them into the DB
        if (existingUser.length === 0) {
          console.log("User not found, adding to DB...");

          const UserResp = await db
            .insert(USER_TABLE)
            .values({
              name: user.fullName, // Assuming fullName is available in the event data
              email: user.primaryEmailAddress.emailAddress, // Using email
            })
            .returning({ id: USER_TABLE.id });

          console.log("User created with ID:", UserResp);

          return { message: `User created: ${user.fullName}` };
        } else {
          console.log("User already exists in the database.");
          return { message: "User already exists" };
        }
      }
    );

    return result;
  }
);