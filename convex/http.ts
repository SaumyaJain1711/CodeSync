import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error(
        "CLERK_WEBHOOK_SECRET is not set in environment variables"
      );
    }

    const svixId = request.headers.get("svix-id");
    const svixTimestamp = request.headers.get("svix-timestamp");
    const svixSignature = request.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response("Missing Svix headers", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);

    let event: WebhookEvent;

    try {
      event = wh.verify(body, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Webhook verification failed:", err);

      return new Response("Invalid webhook", {
        status: 400,
      });
    }

    if (event.type === "user.created") {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
      } = event.data;

      const email = email_addresses[0]?.email_address ?? "";

      const name = `${first_name ?? ""} ${last_name ?? ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          clerkId: id,
          email,
          name,
          image: image_url,
        });
      } catch (err) {
        console.error("Error creating user:", err);

        return new Response("Failed to create user", {
          status: 500,
        });
      }
    }

    return new Response("Webhook processed successfully", {
      status: 200,
    });
  }),
});

export default http;