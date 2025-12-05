import 'package:flutter/material.dart';

enum AppTheme { light, dark, sepia }

class ThemeProvider extends ChangeNotifier {
  AppTheme _currentTheme = AppTheme.sepia;

  AppTheme get currentTheme => _currentTheme;

  ThemeMode get themeMode {
    switch (_currentTheme) {
      case AppTheme.light:
        return ThemeMode.light;
      case AppTheme.dark:
        return ThemeMode.dark;
      case AppTheme.sepia:
        return ThemeMode.system; // Sepia uses custom colors in theme
    }
  }

  void setTheme(AppTheme theme) {
    _currentTheme = theme;
    notifyListeners();
  }

  Color get backgroundColor {
    switch (_currentTheme) {
      case AppTheme.light:
        return const Color(0xFFFFFFFF);
      case AppTheme.dark:
        return const Color(0xFF1A1A1A);
      case AppTheme.sepia:
        return const Color(0xFFF4F1E8);
    }
  }

  Color get cardColor {
    switch (_currentTheme) {
      case AppTheme.light:
        return const Color(0xFFF5F5F5);
      case AppTheme.dark:
        return const Color(0xFF2A2A2A);
      case AppTheme.sepia:
        return const Color(0xFFF9F6F0);
    }
  }

  Color get textColor {
    switch (_currentTheme) {
      case AppTheme.light:
        return Colors.black87;
      case AppTheme.dark:
        return Colors.white;
      case AppTheme.sepia:
        return Colors.black87;
    }
  }
}
