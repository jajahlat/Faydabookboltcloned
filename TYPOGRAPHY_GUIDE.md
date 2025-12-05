# Faydabook - Modern Typography & Styling Guide

## Overview
This document describes the modern styling and formatting implemented in the Faydabook reader application.

---

## 📚 Typography System

### 1. **French Text - Lora Serif Font**

**Font**: Google Fonts - Lora  
**Use Case**: Main body text (French content)

**Specifications**:
- **Font Size**: 17px
- **Line Height**: 1.7
- **Font Weight**: 400 (Regular)
- **Text Alignment**: Justified
- **Color**: `Colors.black87` (rgba(0, 0, 0, 0.87))
- **Characteristics**: Classic serif typeface optimized for long-form reading

**Why Lora?**
- Designed specifically for screen reading
- Excellent readability at smaller sizes
- Professional appearance suitable for literary content
- Balanced letterforms with moderate contrast

---

### 2. **French Poetry - Lora Italic**

**Font**: Google Fonts - Lora (Italic)  
**Use Case**: Centered French poetry and quotes

**Specifications**:
- **Font Size**: 17px
- **Line Height**: 1.8
- **Font Weight**: 500 (Medium)
- **Font Style**: Italic
- **Text Alignment**: Centered
- **Color**: `Colors.black87`
- **Characteristics**: Elegant italic variant for emphasis

**Why Italic?**
- Distinguishes poetic content from prose
- Maintains visual hierarchy
- Traditional literary formatting convention

---

### 3. **Arabic Citations - Amiri Calligraphic**

**Font**: Google Fonts - Amiri  
**Use Case**: Arabic text, citations, and quotes

**Specifications**:
- **Font Size**: 20px (larger than French text)
- **Line Height**: 1.8
- **Font Weight**: 700 (Bold)
- **Font Style**: Regular (with calligraphic features)
- **Text Alignment**: Centered
- **Color**: `Colors.black87`
- **Characteristics**: Classical Arabic calligraphic style

**Why Amiri?**
- Traditional Naskh calligraphic style
- Excellent Arabic character rendering
- Cultural authenticity
- High readability for Arabic script
- Larger size compensates for script complexity

---

## 🎨 Color Palette

### Reading Experience Colors

**Background**:
- **Color**: `#F4F1E8` (Sepia/Cream)
- **Purpose**: Reduces eye strain during extended reading
- **Effect**: Warm, paper-like appearance

**Primary Accent**:
- **Color**: `#00796B` (Teal/Green)
- **Use**: AppBar, progress indicators, buttons
- **Purpose**: Professional, calming contrast

**Text Color**:
- **Color**: `Colors.black87` (rgba(0, 0, 0, 0.87))
- **Purpose**: High readability without harsh contrast

---

## 📐 Layout & Spacing

### Text Padding
- **Normal Text**: Bottom padding of 12px
- **Centered Text**: Vertical padding of 16px (top and bottom)
- **Purpose**: Creates comfortable reading rhythm

### Line Height
- **Body Text**: 1.7 (generous spacing for readability)
- **Centered Text**: 1.8 (extra space for emphasis)

---

## 🏷️ Content Formatting Tags

### CENTER Tag Parser

**Syntax**: `[CENTER]text content[/CENTER]`

**Behavior**:
1. Automatically detects Arabic vs. French content
2. Applies appropriate font (Amiri for Arabic, Lora Italic for French)
3. Centers text horizontally
4. Adds vertical spacing

**Example**:
```
Normal French text here...

[CENTER]
Arabic citation in Amiri font
[/CENTER]

More French text...

[CENTER]
French poetry in Lora Italic
[/CENTER]
```

---

## 🎯 Design Principles

### 1. **Readability First**
- Font sizes optimized for mobile screens
- Generous line height prevents text crowding
- Justified alignment for prose, centered for poetry

### 2. **Cultural Respect**
- Authentic Arabic typography with Amiri
- Larger font size for Arabic script complexity
- Bold weight for emphasis and clarity

### 3. **Visual Hierarchy**
- Clear distinction between body text and citations
- Italic styling for poetic content
- Consistent spacing creates reading rhythm

### 4. **Eye Comfort**
- Sepia background reduces blue light
- Black87 text avoids harsh pure black
- Warm color palette for extended reading sessions

---

## 🔧 Technical Implementation

### Content Parser
**File**: `lib/utils/content_parser.dart`

**Features**:
- Regex-based CENTER tag detection
- Automatic Arabic script detection
- Style application based on content type
- Widget-based rendering for Flutter

### Smart Font Selection
```dart
bool isArabic = _containsArabic(centeredText);
style: isArabic 
    ? (arabicStyle ?? _defaultArabicStyle())  // Amiri
    : (centeredStyle ?? _defaultCenteredStyle())  // Lora Italic
```

### Arabic Detection
Uses Unicode ranges:
- `\u0600-\u06FF` - Arabic
- `\u0750-\u077F` - Arabic Supplement
- `\u08A0-\u08FF` - Arabic Extended-A
- `\uFB50-\uFDFF` - Arabic Presentation Forms-A
- `\uFE70-\uFEFF` - Arabic Presentation Forms-B

---

## 📱 Responsive Design

All typography scales appropriately for different screen sizes while maintaining readability and hierarchy.

**Base Font Sizes**:
- French: 17px (scales with system font size settings)
- Arabic: 20px (scales with system font size settings)

---

## 🎓 Best Practices

1. **Always use CENTER tags** for citations and poetry
2. **Maintain consistent paragraph spacing** in content
3. **Test with both French and Arabic content** to verify rendering
4. **Avoid manual styling** - let the parser handle formatting
5. **Keep line lengths reasonable** (sepia background helps with long lines)

---

## 📊 Performance

**Font Loading**:
- Google Fonts cached locally after first load
- Minimal impact on app performance
- Font subsetting reduces bundle size

**Rendering**:
- Widget-based approach for efficient Flutter rendering
- Lazy loading of content for smooth scrolling

---

## 🔄 Version History

**Version 1.0.0** (Current)
- Implemented Lora font for French text
- Implemented Amiri font for Arabic text
- Added CENTER tag parser
- Sepia reading theme
- Fixed progress bar (0-100% accurate)
- Proper chapter sorting (1-4)

---

## 📞 Contact & Support

For questions about typography implementation or styling updates, refer to the project documentation or contact the development team.

---

*Last Updated: November 30, 2025*
*Faydabook v1.0.0*
