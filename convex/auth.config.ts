import { AuthConfig } from "convex/server";
export default{
    providers: [
        {
            domain: "https://honest-dingo-74.clerk.accounts.dev/",
            applicationID:"convex",
        },
    ]
}satisfies AuthConfig;