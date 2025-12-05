class BookContent {
  final String id;
  final String bookId;
  final int chapterNumber;
  final String chapterTitle;
  final String content;

  BookContent({
    required this.id,
    required this.bookId,
    required this.chapterNumber,
    required this.chapterTitle,
    required this.content,
  });

  factory BookContent.fromJson(Map<String, dynamic> json) {
    return BookContent(
      id: json['id'] as String,
      bookId: json['book_id'] as String,
      chapterNumber: json['chapter_number'] as int,
      chapterTitle: json['chapter_title'] as String,
      content: json['content'] as String,
    );
  }
}
