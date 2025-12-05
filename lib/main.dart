import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'core/providers/library_provider.dart';
import 'core/providers/theme_provider.dart';
import 'screens/main_navigation.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => LibraryProvider()),
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, child) {
        return MaterialApp(
          title: 'Faydabook',
          debugShowCheckedModeBanner: false,
          theme: _buildTheme(themeProvider.themeMode),
          home: const MainNavigation(),
        );
      },
    );
  }

  ThemeData _buildTheme(ThemeMode mode) {
    final baseColor = const Color(0xFF00796B);
    
    Color scaffoldBg;
    Color cardBg;
    Brightness brightness;
    
    switch (mode) {
      case ThemeMode.light:
        scaffoldBg = const Color(0xFFF4F1E8);
        cardBg = Colors.white;
        brightness = Brightness.light;
        break;
      case ThemeMode.dark:
        scaffoldBg = const Color(0xFF1A1A1A);
        cardBg = const Color(0xFF2A2A2A);
        brightness = Brightness.dark;
        break;
      case ThemeMode.system:
      default:
        scaffoldBg = const Color(0xFFF4F1E8);
        cardBg = const Color(0xFFF9F6F0);
        brightness = Brightness.light;
    }

    return ThemeData(
      brightness: brightness,
      primaryColor: baseColor,
      scaffoldBackgroundColor: scaffoldBg,
      cardColor: cardBg,
      colorScheme: ColorScheme.fromSeed(
        seedColor: baseColor,
        brightness: brightness,
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: baseColor,
        foregroundColor: Colors.white,
        elevation: 0,
        titleTextStyle: GoogleFonts.lora(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: Colors.white,
        ),
      ),
      bottomNavigationBarTheme: BottomNavigationBarThemeData(
        backgroundColor: scaffoldBg,
        selectedItemColor: baseColor,
        unselectedItemColor: Colors.grey,
        selectedLabelStyle: const TextStyle(fontSize: 12),
        unselectedLabelStyle: const TextStyle(fontSize: 12),
      ),
      useMaterial3: true,
    );
  }
}
