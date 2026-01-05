# Top Bar and Bottom Footer Prompt

## Top Navigation Bar

### HTML/JSX Structure:
```jsx
<div className="header-top">
  <img 
    src={logoImage} 
    alt="Logo" 
    className="header-logo" 
    onClick={() => openMenu()}
  />
  <nav className="header-nav">
    <a href="#services">Services</a>
    <a href="#contact" onClick={handleContactClick}>Contact us</a>
  </nav>
</div>
```

### CSS Styles:
```css
/* Header */
.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
}

.header-logo {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.header-logo:hover {
  transform: scale(1.05);
}

.header-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.header-nav a {
  color: #fff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: opacity 0.3s ease;
}

.header-nav a:hover {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .header-nav {
    gap: 1rem;
    font-size: 0.85rem;
  }
}
```

---

## Bottom Footer / Links Bar

### HTML/JSX Structure:
```jsx
<footer className="footer">
  <a href="#privacy">Privacy Policy</a>
  <div className="social-links">
    <a href="#facebook">Facebook</a>
    <span>/</span>
    <a href="https://www.instagram.com/yourhandle/" target="_blank" rel="noopener noreferrer">Instagram</a>
    <span>/</span>
    <a href="#linkedin">LinkedIn</a>
  </div>
</footer>
```

### CSS Styles:
```css
/* Footer */
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  position: relative;
  z-index: 1;
}

.footer a {
  color: #fff;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.footer a:hover {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.social-links span {
  opacity: 0.5;
}

@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
```

---

## Dark Theme Context

Both components are styled for a **dark background (#000)** with white text. If your other website uses a different color scheme, adjust:
- `color: #fff;` → your text color
- `background: #000;` → your background color
- `border-bottom: 1px solid rgba(255, 255, 255, 0.1);` → your border color
- Hover opacity values as needed
