# 📚 Faydabook - Modern Reading Experience

A Flutter-based mobile reading application featuring modern typography, intelligent content formatting, and seamless Airtable integration for dynamic book content.

---

## ✨ Key Features

### 🎨 **Modern Typography System**
- **Lora Serif Font** - Professional French body text with justified alignment
- **Amiri Calligraphic Font** - Authentic Arabic citations with traditional styling
- **Smart Content Parser** - Automatic font selection based on language detection
- **Sepia Reading Theme** - Eye-friendly warm background for extended reading

### 📖 **Reading Experience**
- **4-Chapter Book Structure** - Well-organized content navigation
- **CENTER Tag Support** - Intelligent formatting for poetry and citations
- **Accurate Progress Tracking** - Fixed progress bar (0-100%)
- **Smooth Page Navigation** - Swipe and tap controls

### 🔌 **Backend Integration**
- **Airtable Database** - Live book content delivery
- **Real-time Updates** - Dynamic content without app updates
- **Structured Data** - Organized chapters, titles, and metadata

### 📱 **User Interface**
- **Bottom Navigation** - Home, Library, and Settings screens
- **Material Design 3** - Modern Flutter UI components
- **Minimalist Design** - Distraction-free reading interface
- **Professional App Icon** - Custom-designed branding

---

## 🚀 Quick Start

### **Installation**

**For Android Users:**
1. Download the APK file (47 MB)
2. Enable "Install from Unknown Sources" in Android settings
3. Open the APK and tap Install
4. Launch Faydabook from your app drawer

**For Developers:**
```bash
# Clone the repository (once GitHub is set up)
git clone https://github.com/YOUR_USERNAME/faydabook-app.git

# Navigate to project directory
cd faydabook-app

# Install dependencies
flutter pub get

# Run on connected device/emulator
flutter run
```

---

## 📐 Typography Specifications

### **French Text (Lora)**
```dart
GoogleFonts.lora(
  fontSize: 17,
  height: 1.7,
  fontWeight: FontWeight.w400,
  color: Colors.black87,
)
```

### **Arabic Citations (Amiri)**
```dart
GoogleFonts.amiri(
  fontSize: 20,
  height: 1.8,
  fontWeight: FontWeight.w700,
  color: Colors.black87,
)
```

### **French Poetry (Lora Italic)**
```dart
GoogleFonts.lora(
  fontSize: 17,
  height: 1.8,
  fontWeight: FontWeight.w500,
  fontStyle: FontStyle.italic,
  color: Colors.black87,
)
```

**For detailed typography guide, see [TYPOGRAPHY_GUIDE.md](./TYPOGRAPHY_GUIDE.md)**

---

## 🛠️ Technical Stack

### **Framework & Language**
- **Flutter**: 3.35.4
- **Dart**: 3.9.2

### **Key Dependencies**
```yaml
dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.2.1      # Lora & Amiri fonts
  http: ^1.5.0              # Airtable API calls
  provider: ^6.1.5+1        # State management
  shared_preferences: ^2.5.3 # Local storage
  hive: ^2.2.3              # Document database
  hive_flutter: ^1.1.0      # Hive Flutter integration
```

### **Platform Support**
- ✅ **Android**: 7.0+ (API 24+)
- ✅ **Web**: Chrome, Firefox, Safari, Edge

### **Build Configuration**
- **minSdkVersion**: 24 (Android 7.0)
- **targetSdkVersion**: 34 (Android 14)
- **compileSdkVersion**: 36 (Plugin compatibility)

---

## 📂 Project Structure

```
faydabook-app/
├── lib/
│   ├── main.dart                    # App entry point
│   ├── models/
│   │   └── book_content.dart        # Book data model
│   ├── screens/
│   │   ├── home/
│   │   │   └── home_screen.dart     # Home screen
│   │   ├── library/
│   │   │   └── library_screen.dart  # Library screen
│   │   ├── settings/
│   │   │   └── settings_screen.dart # Settings screen
│   │   ├── reader_screen.dart       # Main reading view
│   │   └── main_navigation.dart     # Bottom navigation
│   ├── services/
│   │   └── airtable_service.dart    # Airtable API integration
│   ├── utils/
│   │   └── content_parser.dart      # CENTER tag parser
│   └── providers/
│       └── book_provider.dart       # State management
├── android/                         # Android configuration
├── web/                            # Web configuration
├── assets/                         # App icons and assets
├── TYPOGRAPHY_GUIDE.md             # Detailed typography docs
├── CHANGELOG.md                    # Version history
└── README.md                       # This file
```

---

## 🎯 Content Formatting

### **CENTER Tag Syntax**

**For Arabic Citations:**
```
Normal French text here...

[CENTER]
Arabic citation text
[/CENTER]

More French text...
```

**For French Poetry:**
```
Prose text continues...

[CENTER]
French poetry line
Another poetic line
[/CENTER]

Back to prose...
```

### **Smart Detection**
The parser automatically:
1. Detects Arabic vs. French content
2. Applies Amiri font (20px, bold) for Arabic
3. Applies Lora Italic (17px, medium) for French
4. Centers text and adds spacing

---

## 🔧 Development

### **Building for Production**

**Android APK:**
```bash
flutter build apk --release
```

**Android App Bundle (Google Play):**
```bash
flutter build appbundle --release
```

**Web:**
```bash
flutter build web --release
```

### **Testing**

**Run Tests:**
```bash
flutter test
```

**Analyze Code:**
```bash
flutter analyze
```

### **Environment Setup**

**Required:**
- Flutter SDK 3.35.4
- Dart SDK 3.9.2
- Android SDK (API 24-36)
- Java 17 (OpenJDK)

---

## 📊 Performance

### **APK Size**
- **Release APK**: 47 MB
- **App Bundle**: 40 MB

### **Font Loading**
- Google Fonts cached after first load
- Minimal impact on app startup
- Font subsetting reduces bundle size

### **Reading Performance**
- Smooth 60fps scrolling
- Lazy content loading
- Efficient widget rendering

---

## 🔐 Security & Privacy

### **Data Collection**
- No personal data collection
- No analytics tracking
- No third-party SDKs

### **Airtable Connection**
- Read-only access to book content
- Secure HTTPS connections
- No user data sent to backend

### **Permissions**
- Internet (for Airtable and font loading)
- No storage, camera, or location permissions

---

## 📱 Screenshots

*(Add screenshots here once available)*

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Development Team**
- Modern typography implementation
- Airtable integration
- Flutter app development

---

## 🙏 Acknowledgments

### **Fonts**
- **Lora** by Cyreal - [Google Fonts](https://fonts.google.com/specimen/Lora)
- **Amiri** by Khaled Hosny - [Google Fonts](https://fonts.google.com/specimen/Amiri)

### **Technologies**
- Flutter Framework by Google
- Airtable for content management
- Google Fonts for typography

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the CHANGELOG for recent updates

---

## 🗺️ Roadmap

### **Version 1.1** (Planned)
- [ ] User-adjustable font sizes
- [ ] Theme toggle (Light/Dark/Sepia)
- [ ] Bookmarking system
- [ ] Search functionality

### **Version 1.2** (Planned)
- [ ] Offline reading mode
- [ ] Multi-book library
- [ ] Reading statistics
- [ ] Social sharing features

### **Version 2.0** (Future)
- [ ] Audio narration
- [ ] Additional language support
- [ ] Cloud sync
- [ ] Advanced typography controls

---

## 📈 Version

**Current Version**: 1.0.0  
**Release Date**: November 30, 2025  
**Status**: Production Ready

---

## 🔗 Links

- **Documentation**: [TYPOGRAPHY_GUIDE.md](./TYPOGRAPHY_GUIDE.md)
- **Changelog**: [CHANGELOG.md](./CHANGELOG.md)
- **Issue Tracker**: GitHub Issues (once repository is created)

---

**Built with ❤️ using Flutter**

*Last Updated: November 30, 2025*
