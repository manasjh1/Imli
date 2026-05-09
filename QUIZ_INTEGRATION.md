# Admin to Quiz Integration with Classes and Subjects

## Overview
The admin portal is fully connected to the quiz display using Supabase. The system supports 5 classes (Class 1-5) with the same subjects in each class (Mathematics, English, Science, Social Studies, Hindi). Questions are organized by class and subject, and users select a class to take the quiz.

## Database Schema

### Tables Created:
1. **classes** - Education classes (Class 1-5)
   - `id` (UUID) - Primary key
   - `name` (TEXT UNIQUE) - Class name (Class 1, Class 2, etc.)
   - `order` (INTEGER) - Display order
   - `created_at`, `updated_at` - Timestamps

2. **subjects** - Study subjects (same across all classes)
   - `id` (UUID) - Primary key
   - `name` (TEXT UNIQUE) - Subject name (Mathematics, English, Science, etc.)
   - `order` (INTEGER) - Display order
   - `created_at` - Timestamp

3. **sections** - Quiz sections/categories
   - `id` (UUID) - Primary key
   - `title` (TEXT) - Section name
   - `order` (INTEGER) - Display order
   - `created_at`, `updated_at` - Timestamps

4. **questions** - Quiz questions
   - `id` (UUID) - Primary key
   - `text` (TEXT) - Question text
   - `type` (TEXT) - Question type (mcq, audio, image, true_false, fill_blanks, match_columns, written, sequence, custom)
   - `section_id` (UUID FK) - Reference to parent section
   - `class_id` (UUID FK) - Reference to class
   - `subject_id` (UUID FK) - Reference to subject
   - `data` (JSONB) - Additional question data
   - `order` (INTEGER) - Display order
   - `created_at`, `updated_at` - Timestamps

5. **question_options** - MCQ answer options
   - `id` (UUID) - Primary key
   - `question_id` (UUID FK) - Reference to parent question
   - `text` (TEXT) - Option text
   - `is_correct` (BOOLEAN) - Whether this is the correct answer
   - `order` (INTEGER) - Display order
   - `created_at` - Timestamp

### Indexes Created:
- `idx_questions_section_id` - Fast section lookups
- `idx_questions_type` - Filter by question type
- `idx_questions_class_id` - Fast class lookups
- `idx_questions_subject_id` - Fast subject lookups
- `idx_question_options_question_id` - Fast option lookups
- `idx_sections_order` - Sort sections
- `idx_questions_order` - Sort questions
- `idx_classes_order` - Sort classes
- `idx_subjects_order` - Sort subjects
- `idx_subjects_name` - Unique constraint on subject names

### Default Data:
**Classes:** Class 1, Class 2, Class 3, Class 4, Class 5
**Subjects:** Mathematics, English, Science, Social Studies, Hindi

## API Routes

### `/api/classes` - Class Management
- **GET** - Retrieve all classes (sorted by order)
- **POST** - Create a new class

### `/api/subjects` - Subject Management
- **GET** - Retrieve all subjects (sorted by order)
- **POST** - Create a new subject

### `/api/sections` - Section Management
- **GET** - Retrieve all sections with their questions and options
- **POST** - Create a new section
- **PUT** - Update section title
- **DELETE** - Delete a section (cascades to all questions)

### `/api/questions` - Question Management
- **GET** - Retrieve questions (optionally filtered by `sectionId` or `classId`)
- **POST** - Create a new question (requires `classId` and `subjectId`)
- **PUT** - Update question text/data
- **DELETE** - Delete a question (cascades to options)

### `/api/question-options` - Option Management
- **GET** - Retrieve options (optionally filtered by questionId)
- **POST** - Create a new option
- **PUT** - Update option
- **DELETE** - Delete an option

## Updated Components

### Admin Portal (`/app/admin/questions/page.tsx`)
- Loads sections and questions from Supabase
- Create new sections
- Edit section titles
- Delete sections and questions
- Navigate to question editors via query parameters with class and subject filters

### MCQ Editor (`/app/admin/questions/mcq/page.tsx`)
- **Class Selection** - Dropdown to select Class (1-5)
- **Subject Selection** - Dropdown to select Subject (Mathematics, English, etc.)
- **Question Text** - Input field for the question
- **Multiple Answers Toggle** - Enable if multiple options are correct
- **Answer Options** - Add/remove options with correct answer marking
- Form validation before saving
- Saves questions and options to Supabase API

### Class Selection Page (`/app/test/page.tsx`)
- **Overview** - Displays all 5 classes in a card grid
- **Class Cards** - Shows Class name (e.g., "Class 1") with "Start Quiz" button
- Responsive design for mobile and desktop
- Loads classes from `/api/classes`

### Quiz Display (`/app/test/quiz/page.tsx`)
- **Start Screen** - Shows class name and total question count
- **Quiz Questions** - Displays questions from selected class (all subjects combined)
- **Answer Selection** - Radio button selection for MCQ options
- **Progress Bar** - Visual progress indicator
- **Results Screen** - Shows score, percentage, and answer review
- **Navigation** - Previous/Next buttons with disabled state management
- Automatically disables "Finish" button if no answer selected
- "Back to Classes" button to return to class selection

## User Flow

### For Administrators:
1. Go to `/admin/questions`
2. Create sections by clicking "Add New Section"
3. Within each section, click "Add Question"
4. Select "MCQ" question type
5. **Select Class** (Class 1-5) from dropdown
6. **Select Subject** (Mathematics, English, Science, etc.) from dropdown
7. Fill in question text and options
8. Mark correct answer(s)
9. Click "Save Question" - saves to Supabase with class and subject

### For Quiz Takers:
1. Go to `/test` (accessible from dashboard "Start a Test")
2. See all 5 classes displayed as cards
3. Click "Start Quiz" on desired class
4. Review class information and total questions on start screen
5. Click "Start Quiz" to begin
6. Answer each question by selecting an option
7. Use Previous/Next buttons to navigate through questions
8. Click "Finish" on the last question to complete the quiz
9. View results with score, percentage, and answer review
10. Click "Retake Quiz" to try again or "Back to Classes" to select a different class

## Configuration

### Environment Variables Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

These are automatically configured when Supabase integration is connected.

## Key Features

✅ **Real-time Sync** - Questions appear instantly in quiz after creation
✅ **Multiple Sections** - Organize questions into different categories
✅ **Flexible Question Types** - Support for 9 different question types
✅ **Score Calculation** - Automatic scoring based on correct answers
✅ **Answer Review** - Users can see their answers after completing the quiz
✅ **Responsive Design** - Works on mobile, tablet, and desktop
✅ **Database Validation** - Foreign key constraints ensure data integrity
✅ **Cascading Deletes** - Deleting a section removes all its questions

## Testing the Integration

1. **Verify Classes and Subjects:**
   - Navigate to `/test`
   - You should see 5 class cards (Class 1-5)
   - Click any "Start Quiz" button to proceed

2. **Add a Question:**
   - Navigate to `/admin/questions`
   - Click "Add New Section" and enter a title
   - Click "Add Question" within the section
   - Select "MCQ"
   - Select a Class from the dropdown (e.g., "Class 1")
   - Select a Subject from the dropdown (e.g., "Mathematics")
   - Fill in the question and options
   - Mark the correct answer
   - Click "Save Question"

3. **View in Quiz:**
   - Navigate to `/test`
   - Click "Start Quiz" on the class where you added the question
   - The start screen should show the question count
   - Click "Start Quiz" to begin answering questions
   - Your question should appear in the quiz

4. **Test Different Classes:**
   - Add questions to different classes
   - Verify each class shows only its own questions
   - Confirm subject filtering works correctly

## Troubleshooting

### No classes appear on /test page:
- Verify Supabase integration is connected
- Check that the classes table has default data (Class 1-5)
- Run: `SELECT * FROM classes;` in Supabase SQL editor
- Check browser console for API errors

### No questions appear in quiz:
- Verify you selected a class AND subject when creating the question
- Check that the question's class_id and subject_id are not NULL
- Run: `SELECT * FROM questions WHERE class_id IS NOT NULL;` in Supabase
- Ensure the question's class_id matches the selected class

### Can't save questions:
- Verify class dropdown has selected a value
- Verify subject dropdown has selected a value
- Check Supabase connection status
- Look for validation errors (question text, options filled)
- Check browser console for detailed error messages

### Database errors:
- Verify all 5 tables created: classes, subjects, sections, questions, question_options
- Check that indexes were created
- Ensure proper foreign key relationships exist
- Verify default classes and subjects were inserted:
  - `SELECT * FROM classes;`
  - `SELECT * FROM subjects;`
