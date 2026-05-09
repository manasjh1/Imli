# Class and Subject-Based Quiz System - Complete Setup Guide

## Overview

Your quiz system now supports 5 classes (Class 1-5), each with the same subjects (Mathematics, English, Science, Social Studies, Hindi). Users select their class to take a quiz containing all questions for that class across all subjects combined.

## Architecture

### Database Structure

```
classes (5 predefined classes)
    ↓
subjects (5 predefined subjects, shared across all classes)
    ↓
questions (linked to both class and subject)
    ├── question_options (MCQ answers)
    └── sections (optional grouping)
```

### Data Flow

**Admin Adding Questions:**
```
Admin Portal (/admin/questions)
    ↓ Select Class (1-5)
    ↓ Select Subject (Math, English, etc)
    ↓ Add Question & Options
    ↓ Save to Supabase
```

**User Taking Quiz:**
```
Class Selection Page (/test)
    ↓ Click "Start Quiz" on desired class
    ↓ Quiz Start Screen (/test/quiz?classId=...)
    ↓ Answer all questions from that class
    ↓ View Results & Score
    ↓ Option to Retake or Select Different Class
```

## Key Features

### For Administrators

1. **Class-Aware Question Entry**
   - MCQ editor includes Class dropdown (1-5)
   - Subject dropdown with predefined subjects
   - Questions are automatically tagged with class and subject
   - All questions for a class are included in that class's quiz

2. **Question Management**
   - Create questions for specific classes
   - Questions appear immediately in the quiz
   - Delete questions if needed
   - Support for 9 question types (MCQ implemented)

### For Students

1. **Class Selection**
   - Clear interface showing all 5 classes
   - "Start Quiz" button on each class card
   - Responsive design for mobile and desktop

2. **Quiz Experience**
   - Questions from all subjects combined into one quiz
   - Progress bar showing completion percentage
   - Previous/Next navigation
   - Automatic answer validation
   - Detailed results with score and answer review

3. **Results Display**
   - Percentage score with pass/fail indicator
   - Review of each question and user's answer
   - Option to retake the same class quiz
   - Option to select a different class

## Setup Checklist

- [x] Database schema created (classes, subjects, questions, question_options, sections)
- [x] Default classes inserted (Class 1-5)
- [x] Default subjects inserted (Math, English, Science, Social Studies, Hindi)
- [x] API routes created (/api/classes, /api/subjects, /api/questions, /api/question-options)
- [x] Admin portal updated with class and subject selection
- [x] MCQ editor enhanced with dropdowns
- [x] Class selection page created (/test)
- [x] Quiz page updated (/test/quiz)
- [x] Results and scoring functionality
- [x] Build verified and working

## Testing Instructions

### 1. Add a Question for Class 1, Mathematics

1. Navigate to `http://localhost:3000/admin/questions`
2. Create a new section (e.g., "Introduction")
3. Click "Add Question" → "MCQ"
4. Fill in:
   - Class: **Class 1**
   - Subject: **Mathematics**
   - Question: "What is 2 + 2?"
   - Options: A) 3, B) 4 (mark as correct), C) 5, D) 6
   - Click "Save Question"

### 2. Take the Quiz

1. Navigate to `http://localhost:3000/test`
2. You should see 5 class cards
3. Click "Start Quiz" on **Class 1**
4. Click "Start Quiz" on the start screen
5. Answer your question
6. Click "Finish" to see results

### 3. Test Another Class

1. From results page, click "Back to Classes"
2. Click on a different class (e.g., Class 2)
3. The quiz should show "No questions available" (since you didn't add any for that class)

### 4. Add Questions to Multiple Classes

1. Repeat step 1 for different classes
2. Verify each class only shows its own questions

## API Endpoints Reference

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create a new class

### Subjects
- `GET /api/subjects` - Get all subjects
- `POST /api/subjects` - Create a new subject

### Questions
- `GET /api/questions?classId={classId}` - Get questions for a class
- `POST /api/questions` - Create question (requires classId, subjectId)
- `DELETE /api/questions?id={id}` - Delete a question

### Question Options
- `GET /api/question-options?questionId={id}` - Get options for a question
- `POST /api/question-options` - Create an option
- `DELETE /api/question-options?id={id}` - Delete an option

## Database Queries

### Check Classes
```sql
SELECT * FROM classes ORDER BY "order";
```

### Check Subjects
```sql
SELECT * FROM subjects ORDER BY "order";
```

### Count Questions by Class
```sql
SELECT class_id, COUNT(*) as count 
FROM questions 
WHERE class_id IS NOT NULL 
GROUP BY class_id;
```

### Get Questions for Class 1
```sql
SELECT q.*, COUNT(qo.id) as option_count
FROM questions q
LEFT JOIN question_options qo ON q.id = qo.question_id
WHERE q.class_id = '(CLASS-1-UUID-HERE)'
GROUP BY q.id;
```

## Customization Options

### Add More Subjects
```sql
INSERT INTO subjects (name, "order") VALUES ('Art', 6);
```

### Change Subject Names
```sql
UPDATE subjects SET name = 'Physics' WHERE name = 'Science';
```

### Modify Class Names
```sql
UPDATE classes SET name = 'Grade 1' WHERE name = 'Class 1';
```

### Disable Class
```sql
-- Soft delete by updating a boolean if you add an is_active column
-- Or delete directly (will cascade to all questions)
DELETE FROM classes WHERE id = '(CLASS-UUID)';
```

## Important Notes

1. **Classes and Subjects are Global**
   - All 5 classes see the same 5 subjects
   - Questions belong to one class and one subject
   - A quiz shows all questions for the selected class (all subjects combined)

2. **Cascading Deletes**
   - Deleting a class deletes all its questions
   - Deleting a question deletes all its options
   - Be careful with deletions!

3. **Performance**
   - Indexes are created on class_id and subject_id for fast queries
   - Quiz loads all questions for a class on page load
   - Consider pagination if questions exceed 100+

4. **Scoring**
   - Only MCQ questions currently supported
   - Score = number of correct answers / total questions
   - Pass threshold = 50%

## Troubleshooting

### Classes don't appear on /test page
- Check: `SELECT COUNT(*) FROM classes;`
- Should return 5 rows
- Verify Supabase connection in browser console

### No questions in quiz
- Check question's class_id is not NULL: `SELECT class_id FROM questions LIMIT 1;`
- Verify you selected a class when creating the question
- Check URL has correct classId: `/test/quiz?classId=...`

### Quiz shows wrong questions
- Verify questions have correct class_id
- Check API response: Open browser DevTools → Network → /api/questions?classId=...

### Build errors
- Run `pnpm install` to ensure all dependencies
- Clear .next folder: `rm -rf .next`
- Rebuild: `pnpm build`

## Future Enhancements

1. **Support other question types** (True/False, Fill Blanks, Audio, etc.)
2. **User accounts and history** - Track which classes users completed
3. **Subject-specific quizzes** - Option to quiz on one subject instead of full class
4. **Timed quizzes** - Add time limits per question or overall
5. **Question difficulty levels** - Tag questions as Easy/Medium/Hard
6. **Analytics dashboard** - Admin sees pass rates, popular questions, etc.
7. **Randomized question order** - Shuffle questions each time
8. **Question pools** - Randomly select subset of questions for variety

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review database schema in Supabase console
3. Check browser console (F12) for error messages
4. Review API responses in Network tab
5. Check server logs in terminal running `pnpm dev`
