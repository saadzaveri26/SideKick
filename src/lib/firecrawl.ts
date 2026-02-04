import Firerawl from "@mendable/firecrawl-js";

export const firecrawl = new Firerawl({
    apiKey: process.env.FIRECRAWL_API_KEY! ,
});