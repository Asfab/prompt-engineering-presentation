/**
 * Single source of truth for slide metadata.
 * Used by server.js (API) and remote.html (phone controller).
 * Order must match src/slides/index.js exactly.
 */
export const slidesData = [
  {
    title: "You Now Have a Superpower",
    notes: `• Most use ChatGPT like Google Search — miss 90%
• Same tool, very different results — skill gap is real

❝ "How many have used ChatGPT?"
❝ "How many feel they're getting the BEST results?"

→ Gap between hands = what today is about`,
  },
  {
    title: "What Even IS an LLM?",
    notes: `• Predicts next word — not thinking, pattern matching
• Doesn't know truth — knows probability
• "Capital of France is ___" → Paris 97%

❝ "If it just predicts words… what does that mean for how we write inputs?"

→ Hallucinations = completing a pattern, not lying`,
  },
  {
    title: "What is Prompt Engineering?",
    notes: `• Model takes words literally — garbage in, garbage out
• Weak: "Write code for login" → useless
• Strong: "Python Flask, JWT, return JSON, handle errors" → usable

❝ "What specifically changed between the two prompts?"

→ PE is communication design, not a bag of tricks`,
  },
  {
    title: "Anatomy of a Great Prompt",
    notes: `• Role → Context → Task → Format → Constraint
• Let animation build — pause between each block
• Right panel shows them assembled

❝ "What happens if we remove the Role?"
❝ "Which block do most people skip?"

→ Each block removes one type of ambiguity`,
  },
  {
    title: "See the Difference for Yourself",
    notes: `• Weak: "Explain APIs" → generic, no structure
• Strong: all 5 blocks → analogy + code + 3 steps
• Colour legend maps words to building blocks

❝ "What in the strong prompt caused the analogy?"

→ Let typing play in silence — contrast does the talking`,
  },
  {
    title: "The Prompting Toolkit — Part 1",
    notes: `• Zero-Shot: just ask — simple tasks
• Few-Shot: show examples — pattern tasks
• Chain-of-Thought: reason step by step — complex tasks

❝ "When would you NOT want it to show its reasoning?"

→ Few-shot steers semantic direction, not just format`,
  },
  {
    title: "The Prompting Toolkit — Part 2",
    notes: `• Role: doctor vs teacher vs comedian → different outputs
• Constraint: more constraints = more predictable
• Structured output: expects JSON, gets prose → app crashes
• System prompt: processed first, carries more weight

❝ "What would a system prompt for a student chatbot look like?"

→ Structured output is a hard requirement in production`,
  },
  {
    title: "What Can You Actually Do?",
    notes: `• 6 cards: Write · Learn · Code · Analyze · Brainstorm · Plan
• No setup, no API keys needed

❝ "Which category would you try tonight?"
— ask 2–3 students to share

→ Biggest barrier is inertia, not access`,
  },
  {
    title: "Build a Better Prompt — Take Home",
    notes: `• Weak: "Explain machine learning" — rewrite with 3+ techniques
• Free: ChatGPT · Gemini · Claude
• Self-check: consistent? specific? reusable?

❝ "What's the first prompt you'll try tonight?"

→ Screenshot this slide. Precise instructions, not questions.`,
  },
  {
    title: "Why Prompts Fail",
    notes: `• Ambiguity · Contradictions · Missing context · Injection · Token limits
• Wrong output → more context
• Ignored instructions → move to END

❝ "Has anyone seen AI give a confident but wrong answer?"
❝ "What if users could type 'Ignore all previous instructions'?"

→ Instruction at end often wins — recency bias`,
  },
  {
    title: "When Prompts Aren't Enough",
    notes: `• Fine-tune for: consistent style, domain vocab, format at scale
• NOT from scratch — redirecting existing knowledge
• Intern analogy: brilliant new grad → 6 months in, knows your company

❝ "Think of a Kerala-specific use case for a locally fine-tuned model?"

→ Fine-tuning teaches HOW — not WHAT. That's RAG.`,
  },
  {
    title: "Fine-Tuning Techniques: The Full Map",
    notes: `• SFT → Instruction Tuning → RLHF (progression)
• Instruction tuning = how GPT-3 became ChatGPT
• RLHF: humans rank A vs B → Reward Model → RL update

❝ "Who are the humans doing the ranking — what job is that?"

→ Data labeling: real market, multilingual demand, real jobs`,
  },
  {
    title: "Prompting vs. Fine-Tuning: Decision Framework",
    notes: `• Prompting: one-off, fast iteration, no training data
• Fine-tuning: consistent style at scale, cost optimisation
• New factual knowledge → neither → RAG (last row)

❝ "Why can't you fine-tune a model on your docs to make it 'know' your company?"

→ Fine-tune = HOW to respond. RAG = WHAT to know.`,
  },
  {
    title: "RAG: When the Model Needs a Library Card",
    notes: `• Problem: cutoff · hallucinations · private data not in training
• Flow: Query → Embed → Vector Search → Chunks → LLM → Grounded answer
• Vector DB stores MEANING not text — semantic ≠ keyword

❝ "Search for 'bank' vs searching for meaning of 'financial institution'?"

→ ChromaDB + free LLM API + a PDF = buildable this week`,
  },
  {
    title: "Evaluation: How Do You Know It's Working?",
    notes: `• LLM-as-Judge: GPT-4 grades GPT-3.5 at scale
• Metrics: Accuracy · Relevance · Latency · Cost · Failure Rate
• Tools: RAGAS · DeepEval · LangSmith

❝ "How would you test 10,000 queries per day manually?"

→ Build eval BEFORE deploy — not after users complain`,
  },
  {
    title: "Design Your Own AI Product — Take Home",
    notes: `• 5 questions: Name · User · Approach · Data · How to measure
• Examples on slide: Crop Doctor · Malayalam Tutor · Drug Advisor
• Step one: write a system prompt and see what happens

❝ "What local problem would an outsider not even know exists?"
❝ "Who exactly is your user — what does their day look like?"

→ Best ideas come from local pain points outsiders can't see`,
  },
]
