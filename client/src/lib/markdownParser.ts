// A simple markdown parser for our blog posts
export function parseMarkdown(markdown: string): string {
  if (!markdown) return "";
  
  // Replace headers
  markdown = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  markdown = markdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  markdown = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  
  // Replace bold
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace italic
  markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace code blocks
  markdown = markdown.replace(/```([^`]*?)```/gs, '<pre><code>$1</code></pre>');
  
  // Replace inline code
  markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Replace unordered lists
  let inList = false;
  const lines = markdown.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^- (.*)$/)) {
      if (!inList) {
        lines[i] = '<ul>\n<li>' + lines[i].replace(/^- (.*)$/, '$1') + '</li>';
        inList = true;
      } else {
        lines[i] = '<li>' + lines[i].replace(/^- (.*)$/, '$1') + '</li>';
      }
    } else if (inList) {
      lines[i-1] += '\n</ul>';
      inList = false;
    }
  }
  if (inList) {
    lines.push('</ul>');
  }
  markdown = lines.join('\n');
  
  // Replace ordered lists
  inList = false;
  const olLines = markdown.split('\n');
  for (let i = 0; i < olLines.length; i++) {
    if (olLines[i].match(/^\d+\. (.*)$/)) {
      if (!inList) {
        olLines[i] = '<ol>\n<li>' + olLines[i].replace(/^\d+\. (.*)$/, '$1') + '</li>';
        inList = true;
      } else {
        olLines[i] = '<li>' + olLines[i].replace(/^\d+\. (.*)$/, '$1') + '</li>';
      }
    } else if (inList) {
      olLines[i-1] += '\n</ol>';
      inList = false;
    }
  }
  if (inList) {
    olLines.push('</ol>');
  }
  markdown = olLines.join('\n');
  
  // Replace blockquotes
  inList = false;
  const bqLines = markdown.split('\n');
  for (let i = 0; i < bqLines.length; i++) {
    if (bqLines[i].match(/^> (.*)$/)) {
      if (!inList) {
        bqLines[i] = '<blockquote>\n<p>' + bqLines[i].replace(/^> (.*)$/, '$1') + '</p>';
        inList = true;
      } else {
        bqLines[i] = '<p>' + bqLines[i].replace(/^> (.*)$/, '$1') + '</p>';
      }
    } else if (inList) {
      bqLines[i-1] += '\n</blockquote>';
      inList = false;
    }
  }
  if (inList) {
    bqLines.push('</blockquote>');
  }
  markdown = bqLines.join('\n');
  
  // Replace links
  markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Replace paragraphs (must be done last)
  markdown = markdown.split('\n\n').map(paragraph => {
    if (
      !paragraph.includes('<h1>') && 
      !paragraph.includes('<h2>') && 
      !paragraph.includes('<h3>') && 
      !paragraph.includes('<ul>') && 
      !paragraph.includes('<ol>') && 
      !paragraph.includes('<blockquote>') &&
      !paragraph.includes('<pre>') &&
      paragraph.trim()
    ) {
      return '<p>' + paragraph + '</p>';
    }
    return paragraph;
  }).join('\n\n');
  
  return markdown;
}
