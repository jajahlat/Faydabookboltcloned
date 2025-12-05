import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/book_content.dart';
import '../models/book.dart';

class AirtableService {
  // TODO: Move this to environment variables or secure storage
  // For now, this is a placeholder - replace with your actual Airtable token
  static const String token = 'YOUR_AIRTABLE_TOKEN_HERE';
  static const String baseId = 'appgPSSYUhvMip4KJ';
  static const String booksTable = 'Books';
  static const String contentTable = 'Book%20Content';
  
  static Map<String, String> get headers => {
    'Authorization': 'Bearer $token',
    'Content-Type': 'application/json',
  };

  static Future<List<Book>> fetchBooks() async {
    final url = 'https://api.airtable.com/v0/$baseId/$booksTable';
    final response = await http.get(Uri.parse(url), headers: headers);

    if (response.statusCode != 200) {
      throw Exception('Failed to load books: ${response.statusCode}');
    }

    final data = json.decode(response.body);
    final records = data['records'] as List;

    return records.map((record) {
      final fields = record['fields'] as Map<String, dynamic>;
      return Book.fromJson(fields, record['id'] as String);
    }).toList();
  }

  static Future<List<BookContent>> fetchBookContent(String bookId) async {
    final url = 'https://api.airtable.com/v0/$baseId/$contentTable';
    final response = await http.get(Uri.parse(url), headers: headers);

    if (response.statusCode != 200) {
      throw Exception('Failed to load content: ${response.statusCode}');
    }

    final data = json.decode(response.body);
    final records = data['records'] as List;

    final filteredRecords = records.where((record) {
      final fields = record['fields'] as Map<String, dynamic>;
      final linkedBookIds = fields['book_id'] as List?;
      return linkedBookIds != null && linkedBookIds.contains(bookId);
    }).toList();

    final chapters = filteredRecords.map((record) => _parseBookContent(record)).toList();
    chapters.sort((a, b) => a.chapterNumber.compareTo(b.chapterNumber));
    
    return chapters;
  }

  static BookContent _parseBookContent(Map<String, dynamic> record) {
    final fields = record['fields'] as Map<String, dynamic>;
    final id = record['id'] as String;

    return BookContent(
      id: id,
      bookId: (fields['book_id'] as List?)?.first ?? '',
      chapterNumber: fields['chapter_number'] ?? 1,
      chapterTitle: fields['chapter_title'] ?? 'Chapter',
      content: fields['content'] ?? '',
    );
  }
}
