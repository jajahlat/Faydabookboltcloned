import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ContentParser {
  static List<Widget> parse(
    String content, {
    TextStyle? normalStyle,
    TextStyle? centeredStyle,
    TextStyle? arabicStyle,
  }) {
    List<Widget> widgets = [];
    final centerRegex = RegExp(r'\[CENTER\](.*?)\[/CENTER\]', dotAll: true);
    
    int lastIndex = 0;
    
    for (var match in centerRegex.allMatches(content)) {
      if (match.start > lastIndex) {
        String normalText = content.substring(lastIndex, match.start).trim();
        if (normalText.isNotEmpty) {
          widgets.add(Padding(
            padding: const EdgeInsets.only(bottom: 12.0),
            child: Text(
              normalText,
              textAlign: TextAlign.justify,
              style: normalStyle ?? _defaultNormalStyle(),
            ),
          ));
        }
      }
      
      String centeredText = match.group(1)?.trim() ?? '';
      if (centeredText.isNotEmpty) {
        bool isArabic = _containsArabic(centeredText);
        widgets.add(Padding(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          child: Center(
            child: Text(
              centeredText,
              textAlign: TextAlign.center,
              style: isArabic 
                  ? (arabicStyle ?? _defaultArabicStyle())
                  : (centeredStyle ?? _defaultCenteredStyle()),
            ),
          ),
        ));
      }
      
      lastIndex = match.end;
    }
    
    if (lastIndex < content.length) {
      String remainingText = content.substring(lastIndex).trim();
      if (remainingText.isNotEmpty) {
        widgets.add(Padding(
          padding: const EdgeInsets.only(bottom: 12.0),
          child: Text(
            remainingText,
            textAlign: TextAlign.justify,
            style: normalStyle ?? _defaultNormalStyle(),
          ),
        ));
      }
    }
    
    return widgets;
  }
  
  static bool _containsArabic(String text) {
    return RegExp(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]').hasMatch(text);
  }
  
  static TextStyle _defaultNormalStyle() {
    return GoogleFonts.lora(
      fontSize: 17, 
      height: 1.7, 
      color: Colors.black87,
      fontWeight: FontWeight.w400,
    );
  }
  
  static TextStyle _defaultCenteredStyle() {
    return GoogleFonts.lora(
      fontSize: 17, 
      height: 1.8, 
      fontWeight: FontWeight.w500, 
      fontStyle: FontStyle.italic, 
      color: Colors.black87,
    );
  }
  
  static TextStyle _defaultArabicStyle() {
    return GoogleFonts.amiri(
      fontSize: 20, 
      height: 1.8, 
      fontWeight: FontWeight.w700, 
      color: Colors.black87,
    );
  }
}
