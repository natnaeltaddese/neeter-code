import type { Course } from "../types"
import { algorithmsBeginner } from "./algorithms-beginner/course"

// Single source of truth for mock course data.
// Replace with a real data source when the backend is ready.
export const COURSES: Course[] = [algorithmsBeginner]
