# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SoloPhoto is a single-page web application for AI-powered photo generation and editing. The application is built as a standalone HTML file with embedded CSS and JavaScript, designed as an Indonesian-language photo tool with English branding ("SoloPhoto: AI Photo Studio").

## Architecture

**Technology Stack:**
- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide icons (via CDN)
- **AI Integration**: Google Gemini API (Gemini 2.5 Flash)
- **Deployment**: Static file hosting (no build process required)

**Application Structure:**
- Single-file architecture (`index.html`) containing all HTML, CSS, and JavaScript
- Tab-based navigation system with 6 main features
- Modal-based UI for image viewing and editing
- Responsive design with mobile navigation
- Component-based JavaScript organization within the single file

## Core Features

The application consists of 6 main modules, each accessible via tab navigation:

1. **Product Photography (`ps-*` variables)**
   - Upload product images
   - Generate professional product shots with different lighting, moods, and locations
   - Edit generated images with custom instructions

2. **Virtual Try-On (`vto-*` variables)**
   - Upload product and model images
   - Generate virtual try-on photos
   - Two modes: product-only and product-with-model

3. **Pre-wedding Photos (`pw-*` variables)**
   - Upload couple photos
   - Generate romantic pre-wedding scenes
   - Multiple style options and backgrounds

4. **Model Generator (`gg-*` variables)**
   - Upload multiple images (2-5)
   - AI-powered magic prompt generation
   - Create composite images from multiple sources

5. **Photo Editor (`edit-*` variables)**
   - Upload images for editing
   - Apply AI-based edits with text instructions

6. **Text + Image Combination (`combine-*` variables)**
   - Combine text with images
   - Generate text-based image compositions

## Key JavaScript Patterns

**Element Management:**
- DOM elements are cached in constants at script initialization
- Naming convention: `{module}{elementName}` (e.g., `psGenerateBtn`, `vtoProductPreview`)
- Modular variable scoping per feature

**State Management:**
- Global state variables for uploaded data (e.g., `psImageData`, `vtoProductData`)
- Image data stored as `{base64, mimeType}` objects
- Loading states managed via button HTML updates

**API Integration:**
- All API calls use Google Gemini API with empty API key (placeholder)
- Consistent error handling and loading states
- Base64 image encoding for API payloads
- Response parsing for base64 image data

**Event Handling:**
- Delegated event listeners for dynamic content
- Consistent patterns for upload areas and option selection
- Modal management with backdrop and escape key support

## Development Workflow

**Local Development:**
1. Open `index.html` directly in a web browser
2. No build process or package management required
3. All dependencies loaded via CDN

**Making Changes:**
1. Edit `index.html` directly
2. Refresh browser to see changes
3. Use browser developer tools for debugging

**API Configuration:**
- API keys are currently empty placeholders
- Update `apiKey` variables in JavaScript sections to enable functionality
- All API endpoints use Google Gemini API

## File Structure

```
SoloPhoto/
├── index.html          # Complete application (HTML + CSS + JS)
└── CLAUDE.md          # This documentation file
```

## Common Tasks

**Adding New Features:**
- Follow existing naming conventions for variables and functions
- Add new tab following the pattern in `switchTab()` function
- Include loading states and error handling
- Use consistent modal patterns for image display

**API Integration:**
- Update `apiKey` variables with actual API keys
- Modify API endpoints if switching to different AI services
- Maintain consistent payload structure for API calls

**Content Constraints (Sharia Compliance):**
- All AI-generated content must follow strict Sharia compliance constraints
- No humans, animals, living creatures, religious symbols, human figures, faces, or bodies
- No content related to wine, alcohol, bars, gambling, music, discotic venues, home theaters, or other prohibited elements
- Only furniture, decor items, architectural elements, wall art, plants, and inanimate objects allowed
- These constraints are automatically added by the merge-prompts.js script during prompt generation

**Styling Updates:**
- Modify CSS variables in `:root` for theme changes
- Use Tailwind utility classes for rapid styling
- Maintain responsive design patterns

## Important Notes

- The application uses Indonesian language throughout the UI
- All image processing happens client-side before API calls
- No server-side processing or database required
- The application is designed for static hosting
- API calls will fail without proper API key configuration