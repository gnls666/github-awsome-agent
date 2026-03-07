# Cold Review Checklist

Review in this order:

1. Spec alignment
   - Template choice still matches the request
   - Required fields, pages, or routes exist
   - Declared `postGeneration.tasks` were actually completed
2. Generated project integrity
   - Imports, exports, and filenames still line up
   - Mock API/types/UI remain consistent
   - New files are placed where the template expects them
3. UX and behavior gaps
   - Loading, error, and empty states are present where needed
   - Navigation and labels are coherent
   - Obvious edge cases are not ignored
4. Complexity check
   - No unnecessary abstractions for simple template changes
   - No dead config or duplicated logic introduced during customization
5. Verification gap
   - Note tests or commands that were not run
