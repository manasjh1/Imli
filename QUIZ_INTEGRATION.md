# Admin to Quiz Integration - Complete Setup

## Overview
The admin portal is now fully connected to the quiz display using Supabase as the backend database. Questions added by administrators are instantly available in the quiz portal for users to take.

## Database Schema

### Tables Created:
1. **sections** - Quiz sections/categories
   - `id` (UUID) - Primary key
   - `title` (TEXT) - Section name
   - `order` (INTEGER) - Display order
   - `created_at`, `updated_at` - Timestamps

2. **questions** - Quiz questions
   - `id` (UUID) - Primary key
   - `text` (TEXT) - Question text
   - `type` (TEXT) - Question type (mcq, audio, image, true_false, fill_blanks, match_columns, written, sequence, custom)
   - `section_id` (UUID FK) - Reference to parent section
   - `data` (JSONB) - Additional question data
   - `order` (INTEGER) - Display order
   - `created_at`, `updated_at` - Timestamps

3. **question_options** - MCQ answer options
   - `id` (UUID) - Primary key
   - `question_id` (UUID FK) - Reference to parent question
   - `text` (TEXT) - Option text
   - `is_correct` (BOOLEAN) - Whether this is the correct answer
   - `order` (INTEGER) - Display order
   - `created_at` - Timestamp

### Indexes Created:
- `idx_questions_section_id` - Fast section lookups
- `idx_questions_type` - Filter by question type
- `idx_question_options_question_id` - Fast option lookups
- `idx_sections_order` - Sort sections
- `idx_questions_order` - Sort questions

## API Routes

### `/api/sections` - Section Management
- **GET** - Retrieve all sections with their questions and options
- **POST** - Create a new section
- **PUT** - Update section title
- **DELETE** - Delete a section (cascades to all questions)

### `/api/questions` - Question Management
- **GET** - Retrieve questions (optionally filtered by sectionId)
- **POST** - Create a new question
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
- Navigate to question editors via query parameters

### MCQ Editor (`/app/admin/questions/mcq/page.tsx`)
- Receives `sectionId` from query parameter
- Saves questions and options to Supabase API
- Form validation for question data
- Supports single and multiple correct answers

### Quiz Display (`/app/test/page.tsx`)
- **Start Screen** - Shows all sections and question count
- **Quiz Questions** - Displays questions one at a time
- **Answer Selection** - Radio button selection for MCQ options
- **Results Screen** - Shows score, percentage, and answer review
- **Navigation** - Previous/Next buttons with progress bar
- Automatically disables "Finish" button if no answer selected

## User Flow

### For Administrators:
1. Go to `/admin/questions`
2. Create sections by clicking "Add New Section"
3. Within each section, click "Add Question"
4. Select "MCQ" question type
5. Fill in question text and options
6. Mark correct answer(s)
7. Click "Save Question" - saves to Supabase

### For Quiz Takers:
1. Go to `/test` (accessible from dashboard)
2. Review quiz information on start screen
3. Click "Start Quiz"
4. Answer each question by selecting an option
5. Use Previous/Next buttons to navigate
6. Click "Finish" to complete the quiz
7. View results with score and answer review

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

1. **Add a Section:**
   - Navigate to `/admin/questions`
   - Click "Add New Section" and enter a title

2. **Add a Question:**
   - Click "Add Question" within a section
   - Select "MCQ"
   - Fill in the question and options
   - Mark the correct answer
   - Click "Save Question"

3. **View in Quiz:**
   - Navigate to `/test`
   - Click "Start Quiz"
   - Your question should appear

## Troubleshooting

### No questions appear in quiz:
- Verify Supabase integration is connected
- Check environment variables are set correctly
- Ensure you've added at least one section with questions
- Check browser console for any API errors

### Can't save questions:
- Verify the section ID is being passed correctly
- Check Supabase connection status
- Look for validation errors (question text, options filled)
- Check browser console for detailed error messages

### Database errors:
- Verify all three tables were created successfully
- Check that indexes were created
- Ensure proper foreign key relationships exist
