import assert from "node:assert/strict"
import {
  getAllChapterParams,
  getChapter,
  getChapterToc,
  getFirstChapter,
} from "../lib/courses"
import { getProblem } from "../lib/problems"
import { practiceLists, practiceProblems, practiceTopics } from "../lib/practice"

const firstAlgorithmsChapter = getFirstChapter("algorithms-beginner")
assert.ok(firstAlgorithmsChapter, "algorithms-beginner should have chapters")

const chapter = getChapter("algorithms-beginner", firstAlgorithmsChapter.slug)
assert.ok(chapter, "first algorithms chapter should be resolvable")

const params = getAllChapterParams()
assert.ok(params.length > 0, "chapter static params should not be empty")
assert.ok(
  params.some(
    (p) =>
      p.course === "algorithms-beginner" &&
      p.chapter === firstAlgorithmsChapter.slug
  ),
  "static params should include the first algorithms chapter"
)

const toc = getChapterToc(`
## Overview

\`\`\`ts
## Not a heading
\`\`\`

### Details
## Overview
`)
assert.deepEqual(
  toc.map((item) => item.id),
  ["overview", "details", "overview-2"],
  "TOC should ignore code fences and de-dupe repeated headings"
)

const showcase = getProblem("unknown-showcase-id")
assert.equal(
  showcase.title,
  practiceProblems[0].title,
  "unknown problem IDs should fall back to the showcase problem"
)
assert.ok(
  showcase.workspace.starterCode.python.includes("class DynamicArray"),
  "showcase workspace should include Python starter code"
)

for (const list of practiceLists) {
  const problems = practiceProblems.filter((p) => p.listIds.includes(list.id))
  assert.ok(problems.length > 0, `${list.title} should include problems`)
}

const topicIds = new Set(practiceTopics.map((topic) => topic.id))
for (const problem of practiceProblems) {
  assert.ok(
    topicIds.has(problem.topicId),
    `${problem.title} should reference a known topic`
  )
}

console.log("Content validation passed.")
