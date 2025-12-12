# Pritam Kudale — AI/ML Portfolio Website

A modern, responsive portfolio website tailored for an **AI/ML Engineer / GenAI Research Specialist** profile. It highlights selected work (LLM routing, vector search, CV), core skills, a brief experience snapshot, and credentials.

## ✨ Highlights

- **Professional AI/ML framing**: impact-oriented summary and metrics
- **Core Skills**: grouped skills with tags (no “percent bars”)
- **Selected Work**: real project cards with public links when available
- **Experience Snapshot**: short, portfolio-style timeline (not a full resume)
- **Credentials**: certifications, education, and community impact
- **Static-friendly contact form**: opens a pre-filled **mailto:** message (works on GitHub Pages)

## 🧱 Tech Stack

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Poppins, Fira Code)

## 📁 Project Structure

```
updated_portfolio/
├── index.html
├── styles.css
├── script.js
├── Pritam-Kudale-Resume.pdf
└── README.md
```

## 🚀 Deploy to GitHub Pages

1. Push the folder contents to your GitHub Pages repo (e.g. `pritamkudale.github.io`).
2. In GitHub: **Settings → Pages → Deploy from a branch**.
3. Select the branch and root folder.

## ✏️ Customization Checklist

### 1) Update social links
Edit `index.html`:
- GitHub
- LinkedIn
- Email
- Any publications / papers (optional)

### 2) Add/replace projects
In `index.html`, update cards under **Selected Work**:
- Title
- Description
- Tags
- Live demo link
- Paper / GitHub link

> Tip: for private/proprietary work, keep the card but point links to `#contact`.

### 3) Update the resume file
Replace `Pritam-Kudale-Resume.pdf` with your latest resume (same filename) so the download button stays working.

### 4) Contact form behavior
`script.js` uses a mailto-based flow. If you want a real form backend later:
- Formspree, Netlify Forms, or a custom API endpoint.

## 📄 License

This project can be used and modified freely (MIT-style).
