import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs/promises";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/posts", async (req, res) => {
    try {
      // Read posts data from JSON file
      const postsData = await fs.readFile(
        path.resolve(process.cwd(), "client/src/data/posts.json"),
        "utf-8"
      );
      const posts = JSON.parse(postsData);
      
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Error fetching posts" });
    }
  });

  // Get single post content by id and language
  app.get("/api/posts/:postId/:language", async (req, res) => {
    try {
      const { postId, language } = req.params;
      
      // Validate language parameter
      if (language !== "en" && language !== "pt-br") {
        return res.status(400).json({ message: "Invalid language" });
      }
      
      // Read post markdown file
      const filePath = path.resolve(
        process.cwd(),
        `client/src/posts/${postId}/${language}.md`
      );
      
      try {
        const content = await fs.readFile(filePath, "utf-8");
        res.json({ 
          id: postId,
          language,
          content
        });
      } catch (fileError) {
        // Handle case where post file doesn't exist
        console.error(`Post file not found: ${filePath}`, fileError);
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Error fetching post" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
