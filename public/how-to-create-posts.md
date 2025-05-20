# How to Create Posts for PrimerDev Blog

This guide will walk you through the process of creating and adding new posts to your PrimerDev blog.

## Post Structure

Each blog post consists of:

1. **Metadata** - Information about the post stored in the application
2. **Content Files** - Markdown files containing the actual content in different languages

## Step 1: Add Post Metadata

Add your post information to the posts data array in `client/src/data/posts.ts`:

```typescript
export const posts: Post[] = [
  {
    id: "your-post-slug", // URL-friendly identifier
    title: {
      en: "Your Post Title in English",
      "pt-br": "Your Post Title in Portuguese"
    },
    date: "2025-05-20", // Publication date in YYYY-MM-DD format
    tags: ["tag1", "tag2"], // Relevant tags for categorization
    coverImage: "/path/to/cover/image.jpg", // Cover image path
    description: {
      en: "Brief description of your post in English",
      "pt-br": "Brief description of your post in Portuguese"
    },
    folder: "your-post-folder" // Folder name containing markdown files
  },
  // Other posts...
];
```

## Step 2: Create Content Files

1. Create a new folder in `client/src/posts/your-post-folder`
2. Add markdown files for each supported language:
   - `en.md` - English content
   - `pt-br.md` - Portuguese content

### Markdown Content Structure

Each markdown file should have:

```markdown
# Post Title

Your post content written in Markdown format. 

## Section Heading

You can use all standard Markdown features:

- Bullet lists
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- ![Images](path-to-image.jpg)
- Code blocks with syntax highlighting:

```javascript
function example() {
  console.log("Hello world!");
}
```

## Step 3: Images and Assets

1. Place any images used in your post in the `public/images` directory
2. Reference them in your markdown using relative paths:

```markdown
![Image description](/images/your-image.jpg)
```

## Step 4: Verify Your Post

After adding your post:

1. Check that it appears on the home page
2. Verify that it renders correctly in both languages
3. Test that all links and images work properly

## Markdown Formatting Tips

- Use headings (`#`, `##`, `###`) to structure your content
- Keep paragraphs concise and break up text with subheadings
- Include code samples with proper syntax highlighting
- Use images to illustrate concepts
- Link to relevant resources when appropriate

## Multilingual Content Guidelines

When creating content in multiple languages:

1. Don't simply translate word-for-word; adapt content to be natural in each language
2. Consider cultural differences and examples that might resonate with different audiences
3. Keep content consistent across languages (same topics covered, similar length)
4. Update both language versions when making corrections or updates

---

By following these guidelines, you'll be able to create high-quality, multilingual blog posts that engage your readers and maintain a consistent standard across your PrimerDev blog.