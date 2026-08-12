/**
 * Case studies. Claims here come from the published paper, the repository
 * source, or the repository README. Where a number appears it is quoted from
 * the paper's own tables.
 */

export type DiagramStage = {
  label: string;
  detail?: string;
  items?: string[];
};

export type Diagram = {
  /** Rendered under the figure. */
  caption: string;
  /** Read by screen readers in place of the visual flow. */
  description: string;
  stages: DiagramStage[];
  /** Optional note describing the feedback edge of a loop. */
  loop?: string;
};

export type ProjectSection = {
  heading: string;
  body: string;
};

export type ResultTable = {
  caption: string;
  note?: string;
  columns: string[];
  rows: { cells: string[]; highlight?: boolean }[];
};

/** Three figures worth reading before the prose. Every one is sourced. */
export type Highlight = {
  value: string;
  label: string;
  note: string;
};

/**
 * A demonstration of the diacritization task itself: the same sentence as it
 * is written and as it is pronounced. It illustrates the problem, and is not
 * presented as model output.
 */
export type DiacriticDemo = {
  plain: string;
  diacritized: string;
  translation: string;
  caption: string;
};

/** Real lines from the prototype's own prompt and flow, shown as a transcript. */
export type Transcript = {
  turns: { role: "agent" | "caller"; text: string }[];
  note: string;
};

export type Project = {
  slug: string;
  title: string;
  titleArabic?: string;
  year: string;
  kind: "Research" | "System" | "Prototype";
  /** One line, no marketing. */
  summary: string;
  context: string;
  sections: ProjectSection[];
  stack: string[];
  highlights?: Highlight[];
  demo?: DiacriticDemo;
  transcript?: Transcript;
  diagram?: Diagram;
  results?: ResultTable;
  images?: { src: string; alt: string; width: number; height: number }[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "arabic-speech-diacritization",
    title: "Arabic speech diacritization",
    year: "2026",
    kind: "Research",
    summary:
      "The winning system at the KSAA-2026 shared task: restore full diacritics on Arabic text using the speech that produced it.",
    context:
      "KSAA-2026 Shared Task, Task 2. Published at OSACT7, co-located with LREC 2026 in Palma de Mallorca. Team Thaka, with Meshal Alamr and Dr Abdullah Aldahlawi.",
    sections: [
      {
        heading: "The problem",
        body: "Arabic is written without the short vowels that fix pronunciation and meaning. Text-only models have to guess between readings that the orthography cannot separate, and the guessing gets worse in dialect. The audio holds the answer, so the task pairs each undiacritized transcript with the recording of it. The constraint is the interesting part: 2,327 training samples, no external data allowed.",
      },
      {
        heading: "The approach",
        body: "We fine-tuned CATT-Whisper, a character-level model that adds a frozen Whisper speech encoder to a pretrained CATT text encoder. With that little data, the architecture was not where the gains were. We spent the effort on regularization instead: R-Drop consistency between two dropout-masked forward passes, Focal Loss with label smoothing, and a high weight decay found by Optuna over 30 trials. Speech-embedding dropout keeps the model honest when the audio is unhelpful.",
      },
      {
        heading: "Inference",
        body: "Dropout stays on at test time. Each of four checkpoints runs 50 stochastic passes, and we average softmax probabilities over all 200 before taking the argmax. Post-processing inserts diacritics positionally and enforces three invariants: stripping the output recovers the input, the diacritic count matches the prediction, and every letter position is consumed.",
      },
      {
        heading: "What it showed",
        body: "On the development set, the regularized training recipe moved WER from 30.43 to 27.18, and MC Dropout ensembling took it to 26.02. Training regularization gave us larger gains than any architectural change we tried, which suggests that in low-resource settings the optimization strategy can matter more than the model.",
      },
    ],
    stack: [
      "PyTorch",
      "CATT-Whisper",
      "Whisper",
      "Optuna",
      "R-Drop",
      "Focal Loss",
      "MC Dropout",
    ],
    highlights: [
      {
        value: "1st",
        label: "of all participants",
        note: "KSAA-2026 Task 2 leaderboard",
      },
      {
        value: "23.26%",
        label: "WER, primary metric",
        note: "With case endings, no-diacritic positions included",
      },
      {
        value: "2,327",
        label: "training samples",
        note: "No external data permitted",
      },
    ],
    demo: {
      plain: "العربية تكتب بلا حركات، والنطق يعيدها",
      diacritized: "الْعَرَبِيَّةُ تُكْتَبُ بِلَا حَرَكَاتٍ، وَالنُّطْقُ يُعِيدُهَا",
      translation:
        "Arabic is written without diacritics, and speech brings them back.",
      caption:
        "The task in one sentence, shown here as an illustration rather than model output. Task 2 asks a system to move between these two states, choosing one of 15 diacritic classes for every letter.",
    },
    diagram: {
      caption: "Training and inference, as described in the paper.",
      description:
        "Speech goes through a frozen Whisper encoder and a linear projection into 150 prefix positions, which are added to the character tokens entering the CATT encoder. Training runs each input twice under different dropout masks and combines Focal Loss with an R-Drop KL penalty. At inference, four checkpoints each run 50 stochastic passes and the 200 softmax distributions are averaged before the argmax.",
      stages: [
        {
          label: "Speech and undiacritized text",
          detail: "Utterances averaging about 7 seconds",
        },
        {
          label: "Whisper encoder, frozen",
          detail: "1,500 frames mean-pooled to 150 tokens",
        },
        {
          label: "Prefix addition",
          detail: "Projected speech added to 150 prefix positions",
        },
        {
          label: "CATT encoder",
          detail: "6 layers, 512 dim, 15 diacritic classes per letter",
        },
        {
          label: "Averaged softmax",
          detail: "4 checkpoints, 50 MC Dropout passes each",
        },
        { label: "Diacritized text", detail: "Positional insertion, invariants enforced" },
      ],
    },
    results: {
      caption: "Test set, ranked by WER with case endings.",
      note: "Table 2 of the paper. Lower is better. Our submission appears under the team's leaderboard name.",
      columns: ["System", "DER", "WER", "SER"],
      rows: [
        { cells: ["Ours", "6.87", "23.26", "66.16"], highlight: true },
        { cells: ["Second place", "7.04", "24.39", "71.65"] },
        { cells: ["Third place", "7.51", "25.34", "73.48"] },
        { cells: ["Baseline, fine-tuned text and ASR", "9.91", "31.84", "82.93"] },
        { cells: ["Baseline, text only", "17.66", "49.85", "91.77"] },
      ],
    },
    links: [
      { label: "Paper, ACL Anthology", href: "https://aclanthology.org/2026.osact-1.29/" },
      { label: "arXiv", href: "https://arxiv.org/abs/2605.25928" },
      { label: "Shared task", href: "https://arai.ksaa.gov.sa/sharedTask2026/" },
    ],
  },

  {
    slug: "sanad",
    title: "Sanad",
    titleArabic: "سند",
    year: "2026",
    kind: "System",
    summary:
      "A bilingual RAG system where retrieval is a decision the agent makes, and every factual answer carries the file it came from.",
    context:
      "Capstone for the Developing Generative AI Solutions program at SDAIA Academy, July 2026.",
    sections: [
      {
        heading: "The problem",
        body: "A pipeline that retrieves on every turn wastes context on questions that do not need it, and still has nothing to say when the documents fall short. The failure users actually notice is an answer that sounds right and cannot be checked.",
      },
      {
        heading: "The system",
        body: "Sanad is named after the chain of transmission that establishes where a report came from, and it runs on one rule: no answer without a source. Documents are parsed, chunked, embedded and stored in ChromaDB. A ReAct agent then decides when to call retrieve_documents and with which query, re-queries when the hits are weak, and cites the file inline. When the knowledge base cannot answer, it reaches for web search, URL fetch, or a YouTube transcript instead of guessing.",
      },
      {
        heading: "Engineering",
        body: "Tools live in a dependency-injected registry with one instance per agent, so a tool can be tested in isolation and no global state leaks between runs. The LLM client speaks the OpenAI-compatible protocol, which means Ollama, vLLM, OpenRouter or a hosted API behind one base URL and model name. Two interfaces share the same core: a streaming web chat over SSE and a Rich terminal UI. The repository ships a pyproject, Docker setup, Makefile, CI, and 30 tests.",
      },
      {
        heading: "Bilingual by construction",
        body: "Prompts, tool descriptions, and both interfaces work in Arabic and English, including right-to-left layout in the web chat. The agent's retrieve, reason and cite trace is visible while it runs, so the path to an answer is inspectable rather than implied.",
      },
    ],
    stack: [
      "Python",
      "ChromaDB",
      "sentence-transformers",
      "FastAPI",
      "SSE",
      "docling",
      "SQLite",
      "Docker",
      "pytest",
    ],
    diagram: {
      caption: "The retrieve, reason and cite loop.",
      description:
        "A question enters the ReAct agent, which parses its own output for tool calls against a dependency-injected registry. The registry exposes document retrieval over ChromaDB embeddings plus web search, URL fetch and YouTube transcript tools. Tool results return into the loop, which can retrieve again before producing a cited answer.",
      stages: [
        { label: "Question", detail: "Arabic or English" },
        { label: "ReAct agent", detail: "Decides whether to retrieve, and with what query" },
        {
          label: "Tool registry",
          detail: "Injected per agent, no globals",
          items: ["retrieve_documents", "web_search", "web_fetch", "youtube_transcript"],
        },
        { label: "ChromaDB", detail: "Persistent collection of embedded chunks" },
        { label: "Cited answer", detail: "Source file named inline" },
      ],
      loop: "Tool results return to the agent, which can retrieve again before it answers.",
    },
    images: [
      {
        src: "/media/sanad-chat-en.png",
        alt: "The Sanad web chat answering a question, with the retrieval trace and the source file cited in the response.",
        width: 1800,
        height: 1182,
      },
      {
        src: "/media/sanad-chat-ar.png",
        alt: "The same interface answering in Arabic with a right-to-left layout.",
        width: 1800,
        height: 1182,
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/Hassn11q/sanad-capstone" },
      {
        label: "Architecture notes",
        href: "https://github.com/Hassn11q/sanad-capstone/blob/main/docs/ARCHITECTURE.md",
      },
    ],
  },

  {
    slug: "arabic-review-stream",
    title: "Arabic review sentiment, in the stream",
    year: "2024",
    kind: "System",
    summary:
      "Kafka to CAMeL-BERT to Postgres: Arabic reviews classified as they arrive, with the results readable while the stream is still running.",
    context: "Personal project, built as a containerized multi-service pipeline.",
    sections: [
      {
        heading: "The problem",
        body: "Batch sentiment scoring answers yesterday's question. If reviews are arriving continuously, the classification and the dashboard have to sit inside the stream, not after it.",
      },
      {
        heading: "The system",
        body: "A producer publishes Arabic reviews to a Kafka topic. A consumer classifies each one with CAMeL-BERT, a model trained for Arabic rather than a multilingual compromise, and writes the row to PostgreSQL. A Streamlit dashboard reads from Postgres and shows the latest reviews and the sentiment breakdown, with a Cohere model through LangChain summarizing patterns across larger sets.",
      },
      {
        heading: "Engineering",
        body: "Five services under one docker-compose file: producer, consumer, Postgres with its schema, and the dashboard, each with its own image and dependency set. Startup ordering is handled with wait-for-it rather than assumed, so the services come up in the right order wherever it runs.",
      },
    ],
    stack: [
      "Apache Kafka",
      "CAMeL-BERT",
      "Hugging Face Transformers",
      "PostgreSQL",
      "Streamlit",
      "LangChain",
      "Docker Compose",
    ],
    diagram: {
      caption: "Services and the path a single review takes.",
      description:
        "A producer service publishes Arabic reviews to a Kafka topic. A consumer service reads the topic, classifies sentiment with CAMeL-BERT, and writes the labelled row into PostgreSQL. A Streamlit service reads Postgres and renders the live breakdown, calling a Cohere model through LangChain to summarize larger sets.",
      stages: [
        { label: "Producer", detail: "Publishes reviews to the topic" },
        { label: "Kafka topic", detail: "Buffers the stream" },
        { label: "Consumer", detail: "CAMeL-BERT classification per message" },
        { label: "PostgreSQL", detail: "Review, label, timestamp" },
        { label: "Streamlit", detail: "Live breakdown and summaries" },
      ],
    },
    images: [
      {
        src: "/media/reviews-flow.png",
        alt: "The pipeline diagram from the repository: producer, Kafka topic, consumer with the sentiment model, PostgreSQL, and the dashboard.",
        width: 1489,
        height: 311,
      },
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Hassn11q/RealTime-Arabic-Review-Analysis",
      },
    ],
  },

  {
    slug: "mustami",
    title: "Mustami",
    titleArabic: "مستمع",
    year: "2024",
    kind: "Prototype",
    summary:
      "A spoken Arabic ordering agent: listen, transcribe, answer from the menu, speak back, and keep the turn going until the caller says goodbye.",
    context: "Capstone for the SDAIA T5 Data Science Bootcamp at Tuwaiq Academy.",
    sections: [
      {
        heading: "The problem",
        body: "A restaurant order over the phone is a short, bounded conversation with a hard requirement: the assistant has to answer from the actual menu, in Modern Standard Arabic, fast enough that the caller does not start repeating themselves.",
      },
      {
        heading: "The loop",
        body: "Audio is captured from the microphone and transcribed locally with faster-whisper in int8, which keeps the model on CPU and off an API. The transcript goes to a LlamaIndex chat engine backed by Qdrant, so answers about dishes and prices come from the menu rather than the model's memory. Cohere's command-r-plus generates the reply under a system prompt that fixes the flow: ask for name and number, take the order, confirm the total, close. The reply is spoken with the ElevenLabs multilingual voice, and the loop repeats until the caller says goodbye.",
      },
      {
        heading: "What latency forced",
        body: "Every design choice was latency. Local transcription instead of a round trip, a chat memory buffer instead of resending the transcript, and a prompt that caps answers at ten words so the caller is never left waiting through a monologue.",
      },
    ],
    stack: [
      "faster-whisper",
      "LlamaIndex",
      "Qdrant",
      "Cohere command-r-plus",
      "ElevenLabs",
      "PyAudio",
    ],
    diagram: {
      caption: "One conversational turn.",
      description:
        "Microphone audio is transcribed by faster-whisper running locally in int8. The transcript enters a LlamaIndex chat engine with memory, which retrieves menu passages from Qdrant and prompts Cohere command-r-plus. The reply is synthesized by ElevenLabs and played back, and the loop returns to listening.",
      stages: [
        { label: "Microphone", detail: "PyAudio capture" },
        { label: "faster-whisper", detail: "Local transcription, int8 on CPU" },
        {
          label: "Chat engine with memory",
          detail: "Menu retrieved from Qdrant, answered by command-r-plus",
        },
        { label: "ElevenLabs", detail: "Arabic speech synthesis" },
      ],
      loop: "Playback returns to listening until the caller says goodbye.",
    },
    transcript: {
      turns: [
        { role: "agent", text: "مرحبا، أنا مستمع، مساعد الطلب الذكي" },
        { role: "agent", text: "ما هو اسمك ورقم الاتصال؟" },
        { role: "agent", text: "ما هي طلباتك بالتفصيل؟" },
        { role: "agent", text: "شكراً. التكلفة الإجمالية هي ___ ريال." },
        { role: "caller", text: "مع السلامة" },
      ],
      note: "The flow the system prompt fixes, and the phrase that ends the loop. Answers are capped at ten words.",
    },
    links: [
      {
        label: "Repository",
        href: "https://github.com/Hassn11q/sdaia-t5-bootcamp-capstone",
      },
    ],
  },
];
