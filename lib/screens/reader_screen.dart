import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/book_content.dart';
import '../services/airtable_service.dart';
import '../utils/content_parser.dart';

class ReaderScreen extends StatefulWidget {
  final String bookId;
  
  const ReaderScreen({super.key, required this.bookId});

  @override
  State<ReaderScreen> createState() => _ReaderScreenState();
}

class _ReaderScreenState extends State<ReaderScreen> {
  late PageController _pageController;
  int _currentPage = 0;
  bool _showControls = true;
  
  List<BookContent> _chapters = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: 0);
    _loadBookContent();
  }

  Future<void> _loadBookContent() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final chapters = await AirtableService.fetchBookContent(widget.bookId);
      
      setState(() {
        _chapters = chapters;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _toggleControls() {
    setState(() {
      _showControls = !_showControls;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        backgroundColor: const Color(0xFFF4F1E8),
        body: const Center(
          child: CircularProgressIndicator(color: Color(0xFF00796B)),
        ),
      );
    }

    if (_error != null || _chapters.isEmpty) {
      return Scaffold(
        backgroundColor: const Color(0xFFF4F1E8),
        appBar: AppBar(
          backgroundColor: const Color(0xFF00796B),
          title: const Text('Error'),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.error_outline, size: 64, color: Colors.red),
                const SizedBox(height: 16),
                const Text(
                  'Failed to load book content',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 16),
                if (_error != null)
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.red.shade50,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.red.shade200),
                    ),
                    child: Text(
                      'Error: $_error',
                      style: const TextStyle(fontSize: 12, color: Colors.red),
                      textAlign: TextAlign.center,
                    ),
                  ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _loadBookContent,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF00796B),
                  ),
                  child: const Text('Retry'),
                ),
              ],
            ),
          ),
        ),
      );
    }

    final totalPages = _chapters.length;

    return Scaffold(
      backgroundColor: const Color(0xFFF4F1E8),
      body: GestureDetector(
        onTap: _toggleControls,
        child: Stack(
          children: [
            SafeArea(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (page) {
                  setState(() {
                    _currentPage = page;
                  });
                },
                itemCount: totalPages,
                itemBuilder: (context, index) => _buildChapterPage(_chapters[index]),
              ),
            ),

            if (_showControls)
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: Container(
                  color: const Color(0xFFF4F1E8).withValues(alpha: 0.95),
                  child: SafeArea(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Row(
                        children: [
                          IconButton(
                            icon: const Icon(Icons.arrow_back),
                            onPressed: () => Navigator.pop(context),
                          ),
                          const Spacer(),
                          Text(
                            'Comprendre La Fayda',
                            style: GoogleFonts.lora(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const Spacer(),
                          const SizedBox(width: 48),
                        ],
                      ),
                    ),
                  ),
                ),
              ),

            if (_showControls)
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: Container(
                  color: const Color(0xFFF4F1E8).withValues(alpha: 0.95),
                  child: SafeArea(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            _chapters[_currentPage].chapterTitle,
                            style: GoogleFonts.lora(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            textAlign: TextAlign.center,
                          ),
                          const SizedBox(height: 12),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Page ${_currentPage + 1}',
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              Text(
                                'of $totalPages',
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: Colors.black54,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          ClipRRect(
                            borderRadius: BorderRadius.circular(4),
                            child: LinearProgressIndicator(
                              value: totalPages > 0 ? ((_currentPage + 1) / totalPages).clamp(0.0, 1.0) : 0,
                              backgroundColor: Colors.black12,
                              valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF00796B)),
                              minHeight: 6,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${(totalPages > 0 ? (((_currentPage + 1) / totalPages) * 100).clamp(0.0, 100.0) : 0).toStringAsFixed(0)}% complete',
                            style: const TextStyle(
                              color: Colors.black54,
                              fontSize: 10,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildChapterPage(BookContent chapter) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 80),
          
          if (_chapters.length > 1) ...[
            Text(
              'Chapitre ${chapter.chapterNumber}',
              style: GoogleFonts.lora(
                fontSize: 16,
                fontWeight: FontWeight.w500,
                color: const Color(0xFF00796B),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              chapter.chapterTitle,
              style: GoogleFonts.lora(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 24),
            const Divider(color: Colors.black26),
            const SizedBox(height: 24),
          ],
          
          Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: ContentParser.parse(
              chapter.content,
              normalStyle: GoogleFonts.lora(
                fontSize: 17,
                height: 1.7,
                fontWeight: FontWeight.w400,
              ),
              centeredStyle: GoogleFonts.lora(
                fontSize: 17,
                height: 1.8,
                fontWeight: FontWeight.w500,
                fontStyle: FontStyle.italic,
              ),
              arabicStyle: GoogleFonts.amiri(
                fontSize: 20,
                height: 1.8,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          
          const SizedBox(height: 120),
        ],
      ),
    );
  }
}
